import { Component, OnInit } from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  //call signIn Api from authService
  emailSignIn() {
    this.emailSignInSubmitted = true;
    this.authService.signIn(this.userEmail, this.userPassword)
      .then( ()=> {
        // RM when
        this.router.navigate(['dashboard']); //TODO: check success!!!
      });

  }

  googleSignIn() {
    this.authService.googleAuth();
  }

  //anonymous log in for demo purposes
  guestSignIn() {
    this.emailSignInSubmitted = false;
    this.authService.anonymousSignIn()
      .then( ()=> {
        this.router.navigate(['dashboard']);
        }
      );
  }

}
