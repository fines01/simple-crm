import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './client-components/clients/clients.component';
import { ClientDetailComponent } from './client-components/client-detail/client-detail.component';
import { EmployeesComponent } from './employee-components/employees/employees.component';
import { EmployeeDetailComponent } from './employee-components/employee-detail/employee-detail.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'client/:id', component: ClientDetailComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'employee/:id', component: EmployeeDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
