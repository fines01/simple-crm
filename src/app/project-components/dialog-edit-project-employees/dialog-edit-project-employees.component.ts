import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-project-employees',
  templateUrl: './dialog-edit-project-employees.component.html',
  styleUrls: ['./dialog-edit-project-employees.component.scss']
})
export class DialogEditProjectEmployeesComponent implements OnInit {

  loading = false;
  employees!: any[];
  assignedEmployees!: any[];

  staff = new FormControl('');
  employeesExampleList: string[] = ['Employee 1', 'Employee 2', 'Employee 3', 'Pepperoni'];


  constructor() { }

  ngOnInit(): void {
  }

  closeDialog() {}

  // 1. save in employees_projects collection
  saveEdit() {}

}
