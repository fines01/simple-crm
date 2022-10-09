import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  userEmail!: string;
  userName!: string;
  userPassword!: string;
  userPasswordConfirmation!: string;
  errorMessage!: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  emailSignUp() {
    // If anonyous user: generate credential and link account
    let currentUser = this.authService.getAuthUser();
    if(currentUser && currentUser.isAnonymous) {
        this.authService.linkAnonymousAccount(this.userEmail, this.userPassword, this.userName); // TODO
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

  // calling googleAuth Api from authService
  googleSignIn() {
    this.authService.googleAuth();
  }

}
