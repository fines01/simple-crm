import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './client-components/clients/clients.component';
import { ClientDetailComponent } from './client-components/client-detail/client-detail.component';
import { EmployeesComponent } from './employee-components/employees/employees.component';
import { EmployeeDetailComponent } from './employee-components/employee-detail/employee-detail.component';
import { ProjectsComponent } from './project-components/projects/projects.component';
import { ProjectDetailComponent } from './project-components/project-detail/project-detail.component';

const routes: Routes = [
  // {path: '404', component: NotFoundComponent} // todo make 404
  {path: '', component: DashboardComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'client/:id', component: ClientDetailComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'employee/:id', component: EmployeeDetailComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'project/:id', component: ProjectDetailComponent},

  {path:'**', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
