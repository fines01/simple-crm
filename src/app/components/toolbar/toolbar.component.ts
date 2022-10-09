import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  //userName = '';
  @Input() currentRoute!: string;
  @Input() isHomepage!: boolean;
  @Input() usrIsAuth!: boolean;
  @Output() openDrawer = new EventEmitter();

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    //this.userName = this.getUserName();
  }
  
  emitOpenDrawerEvent(): void {
    this.openDrawer.emit();
  }

  logOut() {
    this.authService.signOut()
      .then( ()=> {
        this.router.navigate(['home/sign-in']);
      } );
  }

  getUserName() {
    const user = this.authService.getAuthUser();
    return user?.displayName ? user.displayName : 'Guest';
  }

  openEditUser() {
    let authUser = this.authService.getAuthUser();
    if (authUser) {
      let editDialog: MatDialogRef<DialogEditUserComponent> = this.dialog.open(DialogEditUserComponent);
      editDialog.componentInstance.authUser = authUser;
      //editDialog.componentInstance.currentRoute = this.currentRoute;
      editDialog.afterClosed().subscribe( ()=>  this.router.navigate([this.currentRoute]));
    }
  }

}
