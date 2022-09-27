import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  userName = '';

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
    this.userName = this.getUserName(); //
    return this.authService.isLoggedIn;
  }

  logOut() {
    this.authService.signOut()
      .then( ()=> {
        this.router.navigate(['home/sign-in']); // RM when: set route guards
      } );
  }

  getUserName() {
    const user = this.authService.getAuthUser();
    return user?.displayName ? user.displayName : '';
  }

}
