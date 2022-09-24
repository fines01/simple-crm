import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  userEmail!: string;
  userPassword!: string;
  userPasswordConfirmation!: string;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  emailSignUp() {
    this.authService.signUp(this.userEmail, this.userPassword)
  }

  googleSignUp() {
    this.authService.googleAuth();
  }

}
