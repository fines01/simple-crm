import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  userName!: string;
  userEmail!: string;
  userPassword!: string;
  emailSignInSubmitted = false;
  // errorMessage!: string | null;
  errorMessage!: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  checkInputsEmpty(){
    return !this.userEmail || !this.userPassword || this.userEmail.length == 0 || this.userPassword.length == 0;
  }

  checkPWRequired() {
    if (this.userEmail && this.userEmail.length > 0) return true;
    return false;
  }

  //call signIn Api from authService
  // problem: errors don't get properly caught when using AngularFireAuth? using firebase.auth diretly instead
  // see issue https://github.com/firebase/firebase-js-sdk/issues/1881
  emailSignIn() {
    this.emailSignInSubmitted = true;
    this.errorMessage = undefined;
    this.authService.signIn(this.userEmail, this.userPassword)
      .then( ()=> this.emailSignInSubmitted = true)
      .catch( (error) => this.errorMessage = this.handleError(error));
  }

  handleError(error: any): string{
    let  userDataErrorCodes :string[] = ['auth/user-not-found', 'auth/user-disabled','auth/invalid-email','auth/wrong-password'];
    console.log(error.code, '\n', error.message);
    for (let errCode of userDataErrorCodes) {
      if (error.code === errCode) {
        return 'Username or password is incorrect!'; // 'Wrong login credentials!'
      }
    }
    return 'Oops, something went wrong. Please try again later';
  }

  googleSignIn() {
    this.authService.googleAuth();
  }

  //anonymous log in for guest users
  guestSignIn() {
    this.emailSignInSubmitted = false;
    this.authService.anonymousSignIn();
  }

}
