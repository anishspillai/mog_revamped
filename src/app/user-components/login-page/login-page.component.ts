import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  constructor(private authService: AuthService) {
  }
  displayLoginButton = true

  login(email: string, password: string) {
    this.authService.signIn('anishspillai@gmail.com', 'anishspillai')
  }

}
