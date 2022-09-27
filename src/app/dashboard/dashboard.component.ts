import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userData!: any;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    //this.userData = this.authService.userData;
  }

  getUserData() {
    this.userData = this.authService.userData;
    if (this.userData) return this.userData;
  }

  signOut() {
    this.authService.signOut()
  }

}
