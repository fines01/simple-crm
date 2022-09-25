import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { UserareaRoutingModule } from './userarea-routing.module';
import { UserareaComponent } from './userarea.component';
import { EmployeeDetailComponent } from './employee-components/employee-detail/employee-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './client-components/clients/clients.component';
import { ClientDetailComponent } from './client-components/client-detail/client-detail.component';
import { DialogAddClientComponent } from './client-components/dialog-add-client/dialog-add-client.component';
import { DialogEditClientComponent } from './client-components/dialog-edit-client/dialog-edit-client.component';
import { DialogEditAddressComponent } from './client-components/dialog-edit-address/dialog-edit-address.component';
import { DialogDeleteClientComponent } from './client-components/dialog-delete-client/dialog-delete-client.component';
import { EmployeesComponent } from './employee-components/employees/employees.component';
import { DialogAddEmployeeComponent } from './employee-components/dialog-add-employee/dialog-add-employee.component';
import { DialogEditEmployeeComponent } from './employee-components/dialog-edit-employee/dialog-edit-employee.component';
import { DialogEditEmployeeAddressComponent } from './employee-components/dialog-edit-employee-address/dialog-edit-employee-address.component';
import { DialogDeleteEmployeeComponent } from './employee-components/dialog-delete-employee/dialog-delete-employee.component';
import { ProjectsComponent } from './project-components/projects/projects.component';
import { DialogAddProjectComponent } from './project-components/dialog-add-project/dialog-add-project.component';
import { DialogEditProjectComponent } from './project-components/dialog-edit-project/dialog-edit-project.component';
import { ProjectDetailComponent } from './project-components/project-detail/project-detail.component';
import { DialogDeleteProjectComponent } from './project-components/dialog-delete-project/dialog-delete-project.component';
import { DialogEditProjectEmployeesComponent } from './project-components/dialog-edit-project-employees/dialog-edit-project-employees.component';



@NgModule({
  declarations: [
    UserareaComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailComponent,
    DialogAddClientComponent,
    DialogEditClientComponent,
    DialogEditAddressComponent,
    DialogDeleteClientComponent,
    EmployeesComponent,
    DialogAddEmployeeComponent,
    EmployeeDetailComponent,
    DialogEditEmployeeComponent,
    DialogEditEmployeeAddressComponent,
    DialogDeleteEmployeeComponent,
    ProjectsComponent,
    DialogAddProjectComponent,
    DialogEditProjectComponent,
    ProjectDetailComponent,
    DialogDeleteProjectComponent,
    DialogEditProjectEmployeesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserareaRoutingModule,
  ]
})
export class UserareaModule { }
