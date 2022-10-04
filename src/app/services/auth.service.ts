import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces/user.interface';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { onAuthStateChanged } from '@angular/fire/auth';
// import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any; // save logged in user data

  constructor(
    public afs: AngularFirestore, // Inject Firestore service (TODO: u FirestoreService)
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.setUserData(result.user);
        })
        .catch((error) => {
          console.log('%c'+error.message, 'color: yellow; background-color: black');
        });
  }

  // Sign up with email/password
  signUp(email: string, password: string, username: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          if (result) console.log(result, result.user, result.user?.displayName);
          /* Call the SendVerificaitonMail() function when new user sign 
          up and returns promise */
          this.sendVerificationMail();
          this.setUserData(result.user);
          this.updateUser(result.user, username)
        })
        .catch((error) => {
          console.log('%c'+error.message, 'color: yellow; background-color: black');
        });
  }

  linkAnonymousAccount(email: string, password: string, username: string) {
    let credential = auth.EmailAuthProvider.credential(email,password);
    let user = this.getAuthUser()
    if (user) this.linkAccountWithCredential(user, credential, username);
  }

  linkAccountWithCredential(user:auth.User, credential:auth.EmailAuthCredential | auth.OAuthCredential, username?:string) {
    auth.linkWithCredential(user, credential)
      .then( (usercred)=> {
        if (username) this.updateUser(usercred.user, username);
        console.log("Anonymous account successfully upgraded", user, usercred.user);
      })
      .catch( (error) => console.log('%c'+error.message, 'color: yellow; background-color: black'));
  }

  anonymousSignIn() {
    return this.afAuth.signInAnonymously()
      .then( (result)=> {
        this.setUserData(result.user);
        console.log(result.user);
      })
      .catch ( (error)=> console.log('%c'+error, 'color: yellow; background-color: black'));
  }

  // Send email verfificaiton when new user signs up
  sendVerificationMail() {
    return this.afAuth.currentUser
      .then((user: any) => {
        user.sendEmailVerification();
        this.router.navigate(['verify-email']);
      })
     .catch( (error) => console.log('%c'+error, 'color: yellow; background-color: black'));
  }

  // Reset forgotten password
  resetPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          console.log('Password reset email sent, please check your inbox.');
      })
        .catch((error) => console.log('%c'+error, 'color: yellow; background-color: black'));
  }

  getAuthUser() {
    return auth.getAuth().currentUser
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    // return user !== null && user.emailVerified !== false ? true : false;
    return (user !== null) || (auth.getAuth().currentUser?.isAnonymous) ? true : false; // for now I won't check for verified emails (change in production etc.)
  }

  // Sign in with Google // todo test
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider())
      .then((res: any) => {
        if (this.getAuthUser()?.isAnonymous) {
          let credential = auth.GoogleAuthProvider.credential(res.user.getAuthResponse().id_token); // todo test
          this.linkAccountWithCredential(res.user, credential);
        }
      });
  }

  // Auth logic to run auth providers
  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.setUserData(result.user);
      })
      .catch((error) => {
        console.log('%c'+error, 'color: yellow; background-color: black');
      });
  }

  updateUser(user: any, username?: string, profilePic?: string) {
    //const authUsr = auth.getAuth().currentUser;
    auth.updateProfile(user, {
      displayName: username ? username : user.displayName,
      photoURL: profilePic ? profilePic : user.photoURL
    })
  }

  /* Setting up user data in users collection in Firestore database when signing in | sign up with email/password, 
  and when signing in with social auth provider using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    // create user object (json) --> TODO decide: maybe also make a User class (pro: consistency)
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAdmin: user.isAdmin ? user.isAdmin : true, 
      userTasks: user.userTasks ? user.userTasks : [],
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  deleteUser(user: any) {
    // first delete from users collection
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    return userRef.delete()
      .then( () => {
        // delete user account
        user.delete();
      })
      .catch( (err)=>console.log(err));

  }

  // Sign out // TODO rememberMe functionality
  signOut() {
    let user = auth.getAuth().currentUser;
    if (user?.isAnonymous) return this.deleteUser(user); //delete except usr wants to be remembered?

    return this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
    });
  }
  
}
