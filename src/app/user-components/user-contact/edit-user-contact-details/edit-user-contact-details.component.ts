import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserContactDetails } from 'src/app/shared/model/user-contact-details';
import { AddresscheckService } from 'src/app/shared/services/addresscheck.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FirebasedbService } from 'src/app/shared/services/firebasedb.service';

@Component({
  selector: 'app-edit-user-contact-details',
  templateUrl: './edit-user-contact-details.component.html',
  styleUrls: ['./edit-user-contact-details.component.scss']
})
export class EditUserContactDetailsComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(),
    apartmentNo: new FormControl(),
    streetName: new FormControl(),
    postNumber: new FormControl(),
    telephoneNumber: new FormControl()
  })

  submitted = false

  @Input() userContactDetails: UserContactDetails
  @Input() userId: string
  @Output() keepEditUserDialogOpenEventEmitter = new EventEmitter<boolean>();


  constructor(private formBuilder: FormBuilder,
    public router: Router,
    private db: FirebasedbService,
    private alertService: AlertService) {
  }


  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: [this.userContactDetails ? this.userContactDetails.firstName : '', Validators.required],
        lastName: [this.userContactDetails ? this.userContactDetails.lastName : ''],
        apartmentNo: [this.userContactDetails ? this.userContactDetails.apartmentNo : '', Validators.required],
        streetName: [this.userContactDetails ? this.userContactDetails.streetName : '', Validators.required],
        postNumber: [
          this.userContactDetails ? this.userContactDetails.postNumber : '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.pattern("^[0-9]*$")
          ]
        ],
        telephoneNumber: [this.userContactDetails ? this.userContactDetails.telephoneNumber : '',
         [
          Validators.required,
          Validators.minLength(9),
          Validators.pattern("^[0-9]*$")
         ]
        ],
        //email: ['', [Validators.required, Validators.email]],
      }
    );
  }


  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  onSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid || !this.registerForm.touched) {
      return;
    }

    this.db.addUserDataToDb(this.userId, this.registerForm.value).then(() => {
      this.keepEditUserDialogOpenEventEmitter.emit(false);
      this.alertService.successAlert("Address added/ edited successfully")
    })
      .catch(error => {
        this.alertService.failurAlert("Error occured while updating data")
      });
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

  isOrderPage() {
    return this.router.url.includes("order")
  }
}
