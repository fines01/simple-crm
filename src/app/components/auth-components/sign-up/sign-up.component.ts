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
    this.authService.signUp(this.userEmail, this.userPassword, this.userName)
      .then( ()=> {
        // Rm when
        this.router.navigate(['dashboard']); // if email verification is required: redirect to 'home/verify-email'
      });
  }

  // calling googleAuth Api from authService
  googleSignIn() {
    this.authService.googleAuth();
  }

}
