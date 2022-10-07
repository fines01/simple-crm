import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces/user.interface';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any; // save logged in user data

  constructor(
    private fireService: FirestoreService,
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
    // Saving user data in localstorage when logged in and setting up null when logged out
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

  async signIn(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password)
      .then( (result)=> console.log('success: email sign up', result)) // this.setUserData(result.user)
      .catch((error) =>  console.log('%c'+error.message, 'color: yellow; background-color: black')); // TODO make error messages
  }

  // Sign up with email/password
  async signUp(email: string, password: string, username: string) {
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          if (result) console.log(result, result.user, result.user?.displayName);
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
        this.router.navigate(['dashboard']);
      })
      .catch( (error) => console.log('%c'+error.message, 'color: yellow; background-color: black'));
  }

  async anonymousSignIn() {
    await this.afAuth.signInAnonymously()
      .then( (result)=> {
        this.setUserData(result.user);
        this.router.navigate(['dashboard']);
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

  // in production: additionally check if email is verified and only then let a user sign in.
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    // return user !== null && user.emailVerified !== false ? true : false;
    return (user !== null) || (auth.getAuth().currentUser?.isAnonymous) ? true : false; // for now I won't check for verified emails
  }

  // Sign in with Google // todo test
  async googleAuth() {
    await this.authLogin(new auth.GoogleAuthProvider())
      .then((result: any) => {
        console.log(result.user); 
        // ToDo check if additional user & data already exists: isAdmin, userTasks
        this.setUserData(result.user)
        if (this.getAuthUser()?.isAnonymous) {
          let credential = auth.GoogleAuthProvider.credential(result.user.getAuthResponse().id_token); // todo test
          this.linkAccountWithCredential(result.user, credential);
        }
        this.router.navigate(['dashboard']);
      });
  }

  // Auth logic to run auth providers
  async authLogin(provider: any) {
    await this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        // ToDo check if additional user & data already exists: isAdmin, userTasks
        this.setUserData(result.user);
      })
      .catch((error) => {
        console.log('%c'+error, 'color: yellow; background-color: black');
      });
  }

  updateUser(user: any, username?: string, profilePic?: string) {
    auth.updateProfile(user, {
      displayName: username ? username : user.displayName,
      photoURL: profilePic ? profilePic : user.photoURL
    })
  }

  /* Setting up user data in the Firestore database users collection when signing up | signing in with social auth providers */
  setUserData(user: any) {
    // create user object (json) --> TODO decide: maybe also make a User class (pro: consistency)
    let userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      isAdmin: user.isAdmin ? user.isAdmin : true, 
      userTasks: user.userTasks ? user.userTasks : [],
    };
    return this.fireService.createOrUpdate(userData, user.uid, 'users');
  }

  async deleteUser(user: any) {
    await this.fireService.delete(user.uid, 'users')
      .then( () => {
        // delete user account
        user.delete();
      })
      .catch( (err)=>console.log(err));
  }

  async signOut() {
    let user = auth.getAuth().currentUser;
    if (user?.isAnonymous) return this.deleteUser(user);
    await this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['home/sign-in']);
    });
  }
  
}
