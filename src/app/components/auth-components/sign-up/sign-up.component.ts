import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service'; 
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {


  userEmail!: string;
  userName!: string;
  userPassword!: string;
  userPasswordConfirmation!: string;
  errorMessage!: string | undefined;
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private fireService: FirestoreService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let authUser = this.authService.getAuthUser();
    if (authUser && authUser.displayName) this.userName = authUser.displayName;
  }
  
  setUpExistingUserData(authUser: any) {
    this.userSubscription = this.fireService.getByID(authUser.uid, 'users')
      .subscribe( (userData: any)=>{
        if (userData)  {
          let user = userData;
          user.displayName = this.userName;
          user.email = this.userEmail;
          this.fireService.createOrUpdate(user, authUser.uid, 'users');
          //this.authService.setUserData(user)
        }
      });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  emailSignUp() {
    // If anonyous user: generate credential and link account
    let currentUser = this.authService.getAuthUser();
    if(currentUser && currentUser.isAnonymous) {
        this.authService.linkAnonymousAccount(this.userEmail, this.userPassword, this.userName);
        // update email, username in auth & db
        this.setUpExistingUserData(currentUser);// user already exists (as anonymous user): update user data in db
    }
    else this.authService.signUp(this.userEmail, this.userPassword, this.userName)
      .then((result: any) => {
          if (result) console.log(result, result.user, result.user?.displayName);
          this.authService.setUpAccount(result.user, this.userName);
        })
      .catch( (error) => this.errorMessage = this.handleError(error));;
  }

  handleError(error: any): string {
    console.log('%c'+ error.code + '\n' + error.message, 'color: yellow; background-color: black'); //
    if (error.code === 'auth/email-already-exists') return 'User with this email already exists';
    if (error.code === 'auth/invalid-email') return 'Please provide a valid Email Address';
    if (error.code === 'auth/invalid-password') return 'Password must have at least 6 characters';
    return 'Oops, something went wrong. Please try again later';
  }

  // call googleAuth Api from authService
  googleSignIn() {
    this.authService.googleAuth();
  }

}
