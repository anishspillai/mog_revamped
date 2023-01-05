import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { mergeMap, of } from 'rxjs';
import { OrderHistoryModel } from 'src/app/shared/model/order-history-model';
import { User } from "firebase/auth";
import { FirebasedbService } from 'src/app/shared/services/firebasedb.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.scss'],
  providers: [DatePipe]

})
export class UserOrderHistoryComponent {
  isAwaitingPageLoad = false
  user: User;
  error: any
  orderHistory: OrderHistoryModel[]

  constructor(private readonly db: FirebasedbService,
    private readonly datePipe: DatePipe,
    private auth: AngularFireAuth
  ) {
    this.isAwaitingPageLoad = true
    this.auth.authState.subscribe({
      next: (user) => {
        if (user) {
          this.user = user as User
          this.getOrderHistory(user.uid)
        } else {
          this.isAwaitingPageLoad = false
        }
      },
      error: (e) => {
        this.isAwaitingPageLoad = false
        this.error = e
      }
    });

  }

  getOrderHistory(uuid: string) {
    this.orderHistory = []
    try {
      this.db.getOrderHistory(uuid).pipe(mergeMap((value: any[]) => {
        value.forEach(childSnapshot => {

          let keyOfOrder = ""

          const orderHistoryComponent: OrderHistoryModel = new OrderHistoryModel()

          keyOfOrder = childSnapshot.payload.val().orderPlacementTime

          orderHistoryComponent.orderKey = keyOfOrder
          
          orderHistoryComponent.orderedTimestamp = this.datePipe.transform(new Date(parseInt(childSnapshot.payload.val().orderPlacementTime)), 'MMM d, y, h:mm:ss a') || ''

          orderHistoryComponent.orderHistory = childSnapshot.payload.val().order

          orderHistoryComponent.deliveryStatus = childSnapshot.payload.val().deliveryStatus

          this.orderHistory.push(orderHistoryComponent)

        })
        return of('')
      }
      )).subscribe(() => {
        this.orderHistory.reverse()
        this.isAwaitingPageLoad = false
      })
    }
    catch (error) {
      this.isAwaitingPageLoad = false
    }
  }
}

