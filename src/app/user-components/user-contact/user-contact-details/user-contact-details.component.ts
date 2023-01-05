import { Component, Input } from '@angular/core';
import { UserContactDetails } from 'src/app/shared/model/user-contact-details';


@Component({
  selector: 'app-user-contact-details',
  templateUrl: './user-contact-details.component.html',
  styleUrls: ['./user-contact-details.component.scss']
})
export class UserContactDetailsComponent {
  @Input() userContactDetails: UserContactDetails;
}
