import { Component } from '@angular/core';
import { UserContactDetails } from 'src/app/shared/model/user-contact-details';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirebasedbService } from 'src/app/shared/services/firebasedb.service';

@Component({
  selector: 'app-user-contact-details',
  templateUrl: './user-contact-details.component.html',
  styleUrls: ['./user-contact-details.component.scss']
})
export class UserContactDetailsComponent {

  userContactDetails: UserContactDetails;
  isAwaitingPageLoad = false

  constructor(private readonly db: FirebasedbService, private readonly authService: AuthService) {
    this.getUserDetails()
  }

  getUserDetails() {
    this.isAwaitingPageLoad = true
    this.db.getUserDetails(this.authService.getUserId()).subscribe(value => {
      this.userContactDetails = value as UserContactDetails
      this.isAwaitingPageLoad = false
    })
  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

}
