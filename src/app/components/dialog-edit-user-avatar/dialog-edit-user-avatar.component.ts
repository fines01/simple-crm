import { Component, DoCheck, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-user-avatar',
  templateUrl: './dialog-edit-user-avatar.component.html',
  styleUrls: ['./dialog-edit-user-avatar.component.scss']
})
export class DialogEditUserAvatarComponent implements OnInit, DoCheck {

  profilePicURL!: string | null;
  picColor: string = 'white';

  // avatarURLs: string[] = [
  //   './assets/img/undraw_female_avatar_white.svg',
  //   './assets/img/undraw_male_avatar_white.svg',
  //   './assets/img/undraw_female_avatar_green.svg',
  //   './assets/img/undraw_male_avatar_green.svg',
  //   './assets/img/undraw_female_avatar_purple.svg',
  //   './assets/img/undraw_male_avatar_purple.svg',
  //   './assets/img/undraw_female_avatar_black.svg',
  //   './assets/img/undraw_male_avatar_black.svg',
  // ]
  
  avatarURLs: string[] = [
    `./assets/img/undraw_female_avatar_white.svg`,
    `./assets/img/undraw_male_avatar_white.svg`,
  ];

  // colorOptions = ['white', 'green', 'purple', 'black'];
  colorOptions = [
    {name: 'white', code: '#ffffff'},
    {name: 'green', code: '#69f0ae'},
    {name: 'purple', code: '#7b1fa2'},
    {name: 'black', code: '#000000'}
  ]

  constructor(private dialogRef: MatDialogRef<DialogEditUserAvatarComponent>) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
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
  }

  chooseAvatar(index?: number) {
    if (index || index === 0) console.log(index, this.avatarURLs[index]);
    if (index || index === 0) this.profilePicURL = this.avatarURLs[index];
    else this.profilePicURL = null;
  }

  saveProfilePic() {
    this.dialogRef.close(this.profilePicURL);
  }

}
