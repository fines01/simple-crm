import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-dialog-edit-user-avatar',
  templateUrl: './dialog-edit-user-avatar.component.html',
  styleUrls: ['./dialog-edit-user-avatar.component.scss']
})
export class DialogEditUserAvatarComponent implements OnInit {


  user!: User;
  profilePicURL!: string | null;
  picColor: string = 'white';

  avatarURLs: string[] = [
    `./assets/img/undraw_female_avatar_white.svg`,
    `./assets/img/undraw_male_avatar_white.svg`,
  ];

  colorOptions = [
    {name: 'white', code: '#ffffff'},
    {name: 'green', code: '#69f0ae'},
    {name: 'purple', code: '#7b1fa2'},
    {name: 'black', code: '#000000'}
  ]

  constructor(
    private dialogRef: MatDialogRef<DialogEditUserAvatarComponent>,
    private fireService: FirestoreService,
    ) { }

  ngOnInit(): void {
    this.profilePicURL = this.user.photoURL;
    this.avatarURLs = [
      `./assets/img/undraw_female_avatar_${this.picColor}.svg`,
      `./assets/img/undraw_male_avatar_${this.picColor}.svg`,
    ];
  }

  closeDialog() {
    this.dialogRef.close();
  }

  chooseColor(color: string) {
    this.picColor = color;
    this.avatarURLs = [
      `./assets/img/undraw_female_avatar_${this.picColor}.svg`,
      `./assets/img/undraw_male_avatar_${this.picColor}.svg`,
    ];
  }

  chooseAvatar(index?: number) {
    if (index || index === 0) this.profilePicURL = this.avatarURLs[index];
    else this.profilePicURL = null;
  }

  saveProfilePic() {
    if (this.profilePicURL || this.profilePicURL === null) this.fireService.update({photoURL: this.profilePicURL},this.user.uid,'users'); // null == undefined true, null === undefined false
    this.dialogRef.close();
  }

}
