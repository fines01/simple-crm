import { Component, DoCheck, Input, OnInit, SimpleChanges } from '@angular/core';
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
export class DialogEditUserComponent implements OnInit, DoCheck {

  authUser!: any;
  user!: User;
  loading = false;
  userName!: string;
  userEmail!: string;
  userPassword!: string;
  photoURL!: string;
  emailChanged = false;
  authErrorMessage!: string | undefined;

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

  ngOnChanges(changes: SimpleChanges): void {
  }
  
  ngDoCheck(): void {
    if (this.userEmail && this.userEmail !== this.authUser.email) this.emailChanged = true;
    else if (!this.userEmail || this.userEmail === this.authUser.email) this.emailChanged = false;
  }

  saveEdit() {
    this.loading = true;
    this.authService.updateUser(this.authUser, this.userName, this?.photoURL) // remove photoURL
      .then( ()=> {
        if (this.userEmail && this.emailChanged) this.reAuthenticateAndUpdateEmail();
        else this.updateDatabase();
      })
      .catch( (error) => console.log('%c'+error,'color: yellow; background-color: indigo'))
      .finally(()=> this.loading = false);
  }

  reAuthenticateAndUpdateEmail() {
    this.authService.reAuthenticateUser(this.authUser.email, this.userPassword)
      .then( (res)=> this.updateEmail())
      .catch( (error) => this.authErrorMessage = this.handleAuthErrors(error)); // handle re-auth errors
  }

  updateEmail() {
    this.authService.updateUserEmail(this.authUser, this.userEmail)
      .then ( ()=> this.updateDatabase() )
      .catch((error)=> console.log('%c'+error,'color: yellow; background-color: indigo'));
  }

  updateDatabase() {
    this.fireService.update(this.getUpdateData(), this.authUser.uid, 'users')
      .then (()=> console.log('user updated: ', this.getUpdateData()))
      .catch((error) => console.log('%c'+error,'color: orange'))
      .finally( ()=> {
          this.closeDialog();
      });
  }

  handleAuthErrors(error: any) {
    console.log('%c'+error.code +'\n' + error.message, 'color: yellow; background-color: indigo');
    let  userDataErrorCodes :string[] = ['auth/user-not-found', 'auth/user-disabled','auth/invalid-email'];
    for (let errCode of userDataErrorCodes) {
      if (error.code === errCode) {
        return 'You are not allowed to perform this operation!';
      }
    }
    if (error = 'auth/wrong-password') return 'Wrong password!'
    if (error = 'auth/requires-recent-login') return 'Please verify the operation with your password';
    return 'Oops, something went wrong. Please try again later';
  }

  checkPWRequired() {
    if (this.userEmail && this.userEmail !== this.authUser.email) return true;
    return false;
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
