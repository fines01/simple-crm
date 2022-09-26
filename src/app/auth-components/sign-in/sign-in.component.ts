import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  userName!: string;
  userEmail!: string; // TODO maybe sign in via email instead of username (or both)
  userPassword!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  //call signIn Api from authService

  emailSignIn() {
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
    this.authService.anonymousSignIn()
      .then( ()=> {
        this.router.navigate(['dashboard']);
        }
      );
  }

}
