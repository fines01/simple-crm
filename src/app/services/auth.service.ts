import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces/user.interface';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';
import { reauthenticateWithCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userData: any; // save logged in user data

  constructor(
    private fireService: FirestoreService,
    // TODO remove AngularFireAuth & use firebase.auth directly instead, issue with catching errors : https://stackoverflow.com/questions/67580158/cant-catch-exception-in-angularfireauth?newreg=480ae561405546b3a745894678efea55:
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
  ) {
    // Save user data in localstorage when logged in and setting up null when logged out
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
    return auth.signInWithEmailAndPassword(auth.getAuth(),email, password); 
      // .then( (result)=> console.log('success: email sign in', result)) // this.setUserData(result.user)
      // .catch((error) =>  console.log('%c'+error.message, 'color: yellow; background-color: black')); // TODO make error messages
  }

  // Sign up with email/password
  signUp(email: string, password: string, username: string) {
    return auth.createUserWithEmailAndPassword(auth.getAuth(), email, password);
  }

  setUpAccount(user: any, username: string) {
    this.updateUser(user, username)
      .then( ()=> {
        this.setUserData(user);
        this.sendVerificationMail();
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
        console.log("Anonymous account upgrade", user, usercred.user);
      })
      .catch( (error) => console.log('%c'+error.message, 'color: yellow; background-color: black'))
      .finally( ()=> this.router.navigate(['dashboard']) );
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
      })
     .catch( (error) => console.log('%c'+error, 'color: yellow; background-color: black'))
     .finally( ()=> {
      if (!this.getAuthUser()) this.router.navigate(['home/verify-email'])
    });
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
      })
      .finally( ()=> this.router.navigate(['dashboard']));
  }

  // Auth logic to run auth providers
  async authLogin(provider: any) {
    await this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        // ToDo check if additional user & data already exists: isAdmin, userTasks
        this.setUserData(result.user);
      })
      .catch((error) => console.log('%c'+error, 'color: yellow; background-color: black'))
      .finally(()=> this.router.navigate(['dashboard']));
  }

  updateUser(user: any, username?: string, profilePic?: string) {
    return auth.updateProfile(user, {
      displayName: username ? username : user.displayName,
      photoURL: profilePic ? profilePic : user.photoURL
    })
  }

  updateUserEmail( user: any, email: string) {
    return auth.updateEmail(user, email)
      .then( ()=> this.sendVerificationMail());
  }

  /* Sets up user data in the Firestore database users collection when signing up | signing in with social auth providers */
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

  deleteUser(authUser: any) {
    return this.fireService.delete(authUser.uid, 'users') // delete from users collection
      .then( () => {
        // delete user account from auth database
        //authUser.delete();
        auth.deleteUser(authUser);
      })
      .catch( (err)=>console.log(err));
  }

  // re-authenticate user before performing sensitive operations (changing password, changing primary email address, deleting account)
  // email auth providers
  reAuthenticateUser(email: string, password: string) {
    let authUser = this.getAuthUser();
    let credential = auth.EmailAuthProvider.credential(email,password);
    //let OAuthCredential
    if(authUser) return reauthenticateWithCredential(authUser, credential);
    else return this.signIn(email, password);
  }

  async signOut() {
    let authUser = auth.getAuth().currentUser;
    if (authUser?.isAnonymous) return this.deleteUser(authUser);
    await this.afAuth.signOut()
      .then(() => localStorage.removeItem('user'))
      .finally( ()=> this.router.navigate(['home/sign-in']));
  }
  
}
