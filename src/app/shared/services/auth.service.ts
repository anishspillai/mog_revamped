import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';



@Injectable({
  providedIn: 'root',
})

//https://www.positronx.io/full-angular-firebase-authentication-system/

export class AuthService {

  userData: User// Save logged in user data
  user$: Observable<firebase.User | null>


  constructor(
    public router: Router,
    public afAuth: AngularFireAuth // Inject Firebase auth service


  ) {

    this.user$ = afAuth.authState;

    /**let anish = localStorage.getItem('anish')
    if (!anish) {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          localStorage.setItem('anish', user.uid)
          //this.setUserData(user)
        }
      });
    }*/
  }

  async signIn(email: string, password: string) {
    const result = await this.afAuth
      .signInWithEmailAndPassword(email, password);
  }



  async registerNewUser(email: string, password: string) {
    const result = await this.afAuth
      .createUserWithEmailAndPassword(email, password);
  }

  // https://www.techiediaries.com/angular-firebase/angular-9-firebase-authentication-email-google-and-password/
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    this.afAuth.signOut();
    //this.router.navigate(['grocery-list']);
  }
}