import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPwEmail!: string;

  constructor(private  authService: AuthService) { }

  ngOnInit(): void {
  }

  // calling resetPassword from authService Api
  resetPassword() {
    this.authService.resetPassword(this.resetPwEmail);
  }

}
