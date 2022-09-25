import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  testMail = 'tess@test.ch';
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  // calling sendVerificationMail() method via the authService Api 
  requestVerificationMail() {
    this.authService.sendVerificationMail();
  }

  checkUserData() {
    if (this.authService.userData) return this.authService.userData;
    return false;
  }

}
