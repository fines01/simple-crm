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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  emailSignUp() {
    // If anonyous user: generate credential and link account
    let currentUser = this.authService.getAuthUser();
    if(currentUser && currentUser.isAnonymous) this.authService.linkAnonymousAccount(this.userEmail, this.userPassword, this.userName);
    else this.authService.signUp(this.userEmail, this.userPassword, this.userName)
      .then( ()=> {
        this.router.navigate(['dashboard']);
      });
  }

  // calling googleAuth Api from authService
  googleSignIn() {
    this.authService.googleAuth()
      .then( ()=> this.router.navigate(['dashboard']) );
  }

}
