import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

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
  ) { }

  ngOnInit(): void {
  }

  //call signIn Api from authService

  usernameSignIn() {
    this.authService.signIn(this.userName, this.userPassword);
  }

  googleSignIn() {
    this.authService.googleAuth();
  }

  //anonymous log in for demo purposes
  guestSignIn() {

  }

}
