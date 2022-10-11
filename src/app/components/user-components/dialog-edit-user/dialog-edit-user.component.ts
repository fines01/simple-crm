import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '@angular/fire/auth';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { DialogEditUserAvatarComponent } from '../dialog-edit-user-avatar/dialog-edit-user-avatar.component';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  authUser!: any;
  user!: User;
  loading = false;
  userName!: string;
  userEmail!: string;
  photoURL!: string;

  constructor( 
    private dialogRef: MatDialogRef<DialogEditUserComponent>,
    private authService: AuthService,
    private fireService: FirestoreService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    ) { }

  ngOnInit(): void {
    if (this.authUser && this.authUser.displayName) this.userName = this.authUser.displayName;
    if (this.authUser && this.authUser.email) this.userEmail = this.authUser.email;
    //(this.user && this.user.photoURL) ? this.photoURL = this.user.photoURL : this.photoURL = 'https://picsum.photos/1200/200?grayscale';

    this.fireService.getByID(this.authUser.uid, 'users').subscribe((user: any)=>{
      if (user) this.user = user; 
      (this.user && this.user.photoURL) ? this.photoURL = this.user.photoURL : this.photoURL = 'https://picsum.photos/1200/200?grayscale';
    })
  }

  saveEdit() {
    this.loading = true;
    this.authService.updateUser(this.authUser, this.userName, this?.photoURL)
      .then( ()=> {
        if (this.userEmail) this.authService.updateUserEmail(this.authUser, this.userEmail)
          .catch((error)=> console.log(error));
        this.fireService.update(this.getUpdateData(), this.authUser.uid, 'users')
          .catch((error) => console.log(error));
      })
      .catch( (error) => console.log(error))
      .finally( ()=> {
          this.loading = false;
          this.closeDialog();
      });
  }

  getUpdateData() {
    if (this.userEmail) return {displayName: this.userName, email: this.userEmail}
    else return {displayName: this.userName}
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openEditProfilePicture() {
    let editDialog: MatDialogRef<DialogEditUserAvatarComponent> = this.dialog.open(DialogEditUserAvatarComponent);
    editDialog.componentInstance.user = this.user;
  }

  openDeleteUser() {
    let deleteDialog: MatDialogRef<DialogDeleteUserComponent> = this.dialog.open(DialogDeleteUserComponent);
    deleteDialog.componentInstance.user = this.user;
  }

}
