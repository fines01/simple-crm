import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  member!: any; // class staffmember
  allMembers = [];

  constructor(

  ) { }

  ngOnInit(): void { }

  openDialog() { }


}
