import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() openDrawer = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  emitOpenDrawerEvent(): void {
    this.openDrawer.emit();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }

  logOut() {
    this.authService.signOut()
      .then( ()=> {
        this.router.navigate(['home/sign-in']); // RM when: set route guards
      } );

  }

}
