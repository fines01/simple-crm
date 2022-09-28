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
import { AuthGuard } from './auth.guard';
import { UserTasksComponent } from './user-tasks/user-tasks.component';

const routes: Routes = [
  // {path: '404', component: NotFoundComponent} // TODO maybe make 404 page
  {path: 'home', component: HomeComponent},
  {path: 'home/sign-in', component: SignInComponent},
  {path: 'home/sign-up', component: SignUpComponent},
  {path: 'home/reset-password', component: ResetPasswordComponent},
  {path: 'home/verify-email', component: VerifyEmailComponent},
  // auth
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}, // TODO: change link in navbar
  {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard]},
  {path: 'client/:id', component: ClientDetailComponent, canActivate: [AuthGuard]},
  {path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: 'employee/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard]},
  {path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard]},
  {path: 'project/:id', component: ProjectDetailComponent, canActivate: [AuthGuard]},
  {path: 'tasks', component: UserTasksComponent, canActivate: [AuthGuard]},

  {path:'**', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
