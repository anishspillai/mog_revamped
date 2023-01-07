import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/shared/services/alert.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  displayErrorMessage = false;
  errorMessage: string;

  displayLogin = true
  passwordResetEmailSent = false
  dispatchEmailPwReset = false

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private readonly alertService: AlertService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required, Validators.minLength(6),
          ]
        ],
        acceptTerms: [true, Validators.requiredTrue]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      const controls = this.form.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          console.log(name);
        }
      }
      return;
    }


    const userName = this.form.get('email')?.value
    const password = this.form.get('password')?.value

    if (this.displayLogin) {
      this.login(userName, password)
    } else {
      this.registerNewUser(userName, password)
    }

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  login(email: string, password: string) {
    this.authService.signIn(email, password)
      .then(() => {
        this.alertService.successAlert("Login is successfull for the email id " + email)
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        if (returnUrl) {
          window.location.href = returnUrl
        } else {
          this.router.navigate(['a/x']);
        }
      })
      .catch((serverLoginError) => {
        this.displayErrorMessage = true;
        this.errorMessage = serverLoginError.code
        const message: string = serverLoginError.message
        if (message.includes("auth/invalid-email")) {
          this.errorMessage = "The email id is not in the correct format."
        } else if (message.includes("auth/user-not-found")) {
          this.errorMessage = "The user with email id " + email + " is not found."
        } else if (message.includes("wrong-password")) {
          this.errorMessage = "The password for email id " + email + " is not wrong. Please provide correct password."
        } else {
          this.errorMessage = "Unexpected error occured. Please try again! " + serverLoginError.message
        }
      });
  }




  registerNewUser(email: string, password: string) {
    this.authService.registerNewUser(email, password)
      .then(() => {
        this.alertService.successAlert("Welcome " + email + ". Now you can place order.")
        this.router.navigate(['a/x']);
      })
      .catch((serverLoginError) => {
        this.displayErrorMessage = true;
        this.errorMessage = serverLoginError.code
        const message: string = serverLoginError.message
        if (message.includes("auth/invalid-email")) {
          this.errorMessage = "The email id is not in the correct format."
        } else if (message.includes("auth/user-not-found")) {
          this.errorMessage = "The user with email id " + email + " is not found."
        } else if (message.includes("email-already-in-use")) {
          this.errorMessage = "The email id " + email + " is already in use. Please reset the password if you forgot the password. There is link available for password reset."
        } else {
          this.errorMessage = "Unexpected error occured. Please try again! " + serverLoginError.message
        }
      });

  }

  resetPassword(email: string) {
    this.displayErrorMessage = false;
    this.submitted = false
    if (email.length > 0) {
      this.dispatchEmailPwReset = true
      this.authService.sendPasswordResetEmail(email)
        .then(() => {
          this.passwordResetEmailSent = true
          this.dispatchEmailPwReset = false
        })
        .catch((serverLoginError) => {
          this.dispatchEmailPwReset = false
          this.displayErrorMessage = true;
          this.errorMessage = serverLoginError.code
          const message: string = serverLoginError.message
          if (message.includes("auth/invalid-email")) {
            this.errorMessage = "The email id is not in the correct format."
          } else if (message.includes("auth/user-not-found")) {
            this.errorMessage = "The user with email id " + email + " is not found."
          } else if (message.includes("wrong-password")) {
            this.errorMessage = "The password for email id " + email + " is not wrong. Please provide correct password."
          } else {
            this.errorMessage = "Unexpected error occured. Please try again!"
          }
        });
    } else {
      this.displayErrorMessage = true;
      this.errorMessage = "Please provide valid input for email or password"
    }
  }

}
