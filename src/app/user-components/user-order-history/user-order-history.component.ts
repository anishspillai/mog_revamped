import { DatePipe, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { mergeMap, of } from 'rxjs';
import { OrderHistoryModel } from 'src/app/shared/model/order-history-model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebasedbService } from 'src/app/shared/services/firebasedb.service';

@Component({
  selector: 'app-user-order-history',
  templateUrl: './user-order-history.component.html',
  styleUrls: ['./user-order-history.component.scss'],
  providers: [DatePipe]

})
export class UserOrderHistoryComponent implements OnInit {

  constructor(private readonly authService: AuthService, private readonly db: FirebasedbService, private readonly datePipe: DatePipe,
  ) {
  }

  pageBeingLoaded = false
  orderHistory: OrderHistoryModel[] = []


  ngOnInit() {

    const user: string = this.authService.getUserId()

    if (user) {
      this.pageBeingLoaded = true;
      this.db.getOrderHistory(user).pipe(mergeMap((value: any[]) => {
        value.forEach(childSnapshot => {

          let keyOfOrder = ""

          const orderHistoryComponent: OrderHistoryModel = new OrderHistoryModel()

          keyOfOrder = childSnapshot.payload.val().orderPlacementTime

          orderHistoryComponent.orderKey = keyOfOrder

          //orderHistoryComponent.orderedTimestamp = this.datePipe.transform(new Date(parseInt(childSnapshot.payload.val().orderPlacementTime)),
           // 'MMM d, y, h:mm:ss a')

          orderHistoryComponent.orderHistory = childSnapshot.payload.val().order

          orderHistoryComponent.deliveryStatus = childSnapshot.payload.val().deliveryStatus
          //})

          this.orderHistory.push(orderHistoryComponent)

        })
        return of('')
      }
      )).subscribe(() => {
        this.pageBeingLoaded = false;
        this.orderHistory.reverse()
      })
    }

  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }
}
