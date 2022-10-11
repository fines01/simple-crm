import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss']
})
export class DialogDeleteUserComponent implements OnInit {

  loading = false;
  showSuccessMsg = false;
  showErrorMsg = false;
  user!: any; // User

  dialogTitle = 'Delete User Account?';
  dialogMessage = 'Do you really want to delete your account: ';

  constructor(
    private dialogRef: MatDialogRef<DialogDeleteUserComponent>,
    private authService: AuthService,
    private matDialogs: MatDialog
    ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  closeEditDialog() {
    this.matDialogs.getDialogById('mat-dialog-0')?.close();
  }

  closeDelete() {
    this.closeEditDialog();
    setTimeout(()=> {
      this.closeDialog()
    },2500);
  }

  setSuccessDialog() {
    this.dialogTitle = 'Success!';
    this.dialogMessage = 'Account deleted: ' + this.user.displayName;
    this.showSuccessMsg = true;
  }

  setErrorDialog() {
    this.dialogTitle = 'ooops!';
    this.dialogMessage = 'Something went wrong. Deletion failed.'
    this.showErrorMsg = true;
  }

  deleteUserAccount() {
    this.loading = true;
    let authUser = this.authService.getAuthUser();
    console.log(authUser);
    if (authUser) this.authService.deleteUser(authUser)
      .then(()=>{
        this.setSuccessDialog();
        //this.matDialogs.closeAll();
        this.loading = false;
      })
      .catch( (error)=> {
        console.log('error deleting user: ', error);
        this.setErrorDialog();
      })
      .finally(()=> this.closeDelete());
  }

}
