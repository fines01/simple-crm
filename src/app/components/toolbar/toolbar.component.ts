import { AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, DoCheck, OnChanges{

  @Input() currentRoute!: string;
  @Input() isHomepage!: boolean;
  @Input() usrIsAuth!: boolean; // better pass auth user !!
  @Input() user!: any;

  @Output() openDrawer = new EventEmitter();

  profilePic!: string;
  userName!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    // this.userName = (this.user && this.user.displayName) ? this.user.displayName : 'Guest';
    // this.profilePic = (this.user && this.user.photoURL) ? this.user.photoURL : 'https://picsum.photos/1200/200?grayscale';
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.userName = (this.user && this.user.displayName) ? this.user.displayName : 'Guest';
    this.profilePic = (this.user && this.user.photoURL) ? this.user.photoURL : 'https://picsum.photos/1200/200?grayscale';
  }

  emitOpenDrawerEvent(): void {
    this.openDrawer.emit();
  }

  // getUserName() {
  //   if (this.user && this.user.displayName) return this.user.displayName;
  //   return 'Guest';
  // }

  // getUserPhoto() {
  //   if (this.user && this.user.photoURL) return this.user.photoURL;
  //   return  'https://picsum.photos/1200/200?grayscale'
  // }

  logOut() {
    this.authService.signOut()
      .then( ()=> {
        this.router.navigate(['home/sign-in']);
      } );
  }

  openEditUser() {
    let authUser = this.authService.getAuthUser();
    if (authUser) {
      let editDialog: MatDialogRef<DialogEditUserComponent> = this.dialog.open(DialogEditUserComponent);
      editDialog.componentInstance.authUser = authUser;
      editDialog.afterClosed().subscribe( ()=>  this.router.navigate([this.currentRoute]));
    }
  }

}
