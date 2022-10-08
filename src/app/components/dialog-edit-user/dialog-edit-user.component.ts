import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  authUser!: User;
  loading = false;
  userName!: string;
  userEmail!: string;
  profilePicURL!: string;

  constructor( 
    private dialogRef: MatDialogRef<DialogEditUserComponent>,
    private authService: AuthService,
    private fireService: FirestoreService,
    private location: Location,
    private router: Router,
    ) { }

  ngOnInit(): void {
    console.log(this.authUser)
    if (this.authUser && this.authUser.displayName) this.userName = this.authUser.displayName;
    if (this.authUser && this.authUser.email) this.userEmail = this.authUser.email;
  }

  saveEdit() { //todo prevent reload to homepage?? (maybe because of authguard)
    this.loading = true;
    this.authService.updateUser(this.authUser, this.userName, this?.profilePicURL)
      .then( ()=> {
        this.authService.updateUserEmail(this.authUser, this.userEmail)
          .catch((error)=> console.log(error));
        this.fireService.update({displayName: this.userName, email: this.userEmail}, this.authUser.uid, 'users')
          .catch((error) => console.log(error));
        })
        .catch( (error) => console.log(error))
        .finally( ()=> {
          this.closeDialog();
          this.loading = false;
          //this.location.back();
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
