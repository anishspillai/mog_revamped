import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserContactDetails } from 'src/app/shared/model/user-contact-details';
import { FirebasedbService } from 'src/app/shared/services/firebasedb.service';
import { User } from "firebase/auth";
import { AddresscheckService } from 'src/app/shared/services/addresscheck.service';


@Component({
  selector: 'app-user-contact-parent',
  templateUrl: './user-contact-parent.component.html',
  styleUrls: ['./user-contact-parent.component.scss']
})
export class UserContactParentComponent {

  userContactDetails: UserContactDetails;
  isAwaitingPageLoad = false
  user: User;
  error: any
  editUserDetails = false


  constructor(private auth: AngularFireAuth,
    private readonly addressChecker: AddresscheckService,
    private db: FirebasedbService) {

    this.isAwaitingPageLoad = true
    this.auth.authState.subscribe({
      next: (user) => {
        if (user) {
          this.user = user as User
          this.getUserDetails(user.uid)
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

  getUserDetails(uid: string) {
    this.db.getUserDetails(uid).subscribe({
      next: (value) => {
        try {
          this.userContactDetails = value as UserContactDetails
          this.isAwaitingPageLoad = false
          this.addressChecker.notify(value != null)
        } catch (error) {
          this.isAwaitingPageLoad = false
          this.error = error
        }
      },
      error: (e) => {
        this.isAwaitingPageLoad = false
        this.error = e
        this.addressChecker.notify(false)
      }
    })
  }
}
