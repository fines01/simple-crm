import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './client-components/clients/clients.component';
import { ClientDetailComponent } from './client-components/client-detail/client-detail.component';
import { EmployeesComponent } from './employee-components/employees/employees.component';
import { EmployeeDetailComponent } from './employee-components/employee-detail/employee-detail.component';
import { ProjectsComponent } from './project-components/projects/projects.component';
import { ProjectDetailComponent } from './project-components/project-detail/project-detail.component';
import { SignInComponent } from './auth-components/sign-in/sign-in.component';
import { SignUpComponent } from './auth-components/sign-up/sign-up.component';
import { ResetPasswordComponent } from './auth-components/reset-password/reset-password.component';
import { VerifyEmailComponent } from './auth-components/verify-email/verify-email.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  // {path: '404', component: NotFoundComponent} // TODO maybe make 404 page
  {path: '', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent}, // TODO: change link in navbar
  {path: 'clients', component: ClientsComponent},
  {path: 'client/:id', component: ClientDetailComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'employee/:id', component: EmployeeDetailComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'project/:id', component: ProjectDetailComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'verify-email', component: VerifyEmailComponent},

  {path:'**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
