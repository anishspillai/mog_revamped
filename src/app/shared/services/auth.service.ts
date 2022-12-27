import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

//https://www.positronx.io/full-angular-firebase-authentication-system/

export class AuthService {

  userData: User// Save logged in user data

  constructor(
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public afAuth: AngularFireAuth // Inject Firebase auth service

  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    let anish = localStorage.getItem('anish')
    if (!anish) {
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          localStorage.setItem('anish', user.uid)
          //this.setUserData(user)
        }
      });
    }
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth
        .signInWithEmailAndPassword(email, password);
      this.setUserData(result.user);
      this.afAuth.authState.subscribe((user) => {
        if (user) {
          this.router.navigate(['dashboard']);
        }
      });
    } catch (error) {
      window.alert(JSON.stringify(error));
    }
  }

  setUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };

    this.userData = userData

  }


  getUserId(): string {
    return localStorage.getItem('anish') as string
  }

  isLoggedIn() {
    return localStorage.getItem('anish') !== undefined;
  }
}