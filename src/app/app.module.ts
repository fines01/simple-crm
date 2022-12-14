import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/client-components/clients/clients.component';
import { MatCardModule } from '@angular/material/card';
import { ClientDetailComponent } from './components/client-components/client-detail/client-detail.component';
import { DialogAddClientComponent } from './components/client-components/dialog-add-client/dialog-add-client.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule}  from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogEditClientComponent } from './components/client-components/dialog-edit-client/dialog-edit-client.component';
import { DialogEditAddressComponent } from './components/client-components/dialog-edit-address/dialog-edit-address.component';
import { DialogDeleteClientComponent } from './components/client-components/dialog-delete-client/dialog-delete-client.component';
import { EmployeesComponent } from './components/employee-components/employees/employees.component';
import { DialogAddEmployeeComponent } from './components/employee-components/dialog-add-employee/dialog-add-employee.component';
import { EmployeeDetailComponent } from './components/employee-components/employee-detail/employee-detail.component';
import { DialogEditEmployeeComponent } from './components/employee-components/dialog-edit-employee/dialog-edit-employee.component';
import { DialogEditEmployeeAddressComponent } from './components/employee-components/dialog-edit-employee-address/dialog-edit-employee-address.component';
import { DialogDeleteEmployeeComponent } from './components/employee-components/dialog-delete-employee/dialog-delete-employee.component';
import { ProjectsComponent } from './components/project-components/projects/projects.component';
import { DialogAddProjectComponent } from './components/project-components/dialog-add-project/dialog-add-project.component';
import { DialogEditProjectComponent } from './components/project-components/dialog-edit-project/dialog-edit-project.component';
import { ProjectDetailComponent } from './components/project-components/project-detail/project-detail.component';
import { DialogDeleteProjectComponent } from './components/project-components/dialog-delete-project/dialog-delete-project.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogEditProjectEmployeesComponent } from './components/project-components/dialog-edit-project-employees/dialog-edit-project-employees.component';
import { SignInComponent } from './components/auth-components/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth-components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/auth-components/verify-email/verify-email.component';
import { AuthService } from './services/auth.service';
import { ResetPasswordComponent } from './components/auth-components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { UserTasksComponent } from './components/task-components/user-tasks/user-tasks.component';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';
import { DialogAddTaskComponent } from './components/task-components/dialog-add-task/dialog-add-task.component';
// import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule}  from '@angular/material/radio';
import { DialogEditTaskComponent } from './components/task-components/dialog-edit-task/dialog-edit-task.component';
import { TaskCardComponent } from './components/task-components/task-card/task-card.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DialogEditUserComponent } from './components/user-components/dialog-edit-user/dialog-edit-user.component';
import { ClockComponent } from './components/clock/clock.component';
import { DialogEditUserAvatarComponent } from './components/user-components/dialog-edit-user-avatar/dialog-edit-user-avatar.component';
import { DialogDeleteUserComponent } from './components/user-components/dialog-delete-user/dialog-delete-user.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MessagesComponent } from './components/user-components/messages/messages.component';




@NgModule({
  declarations: [
    AppComponent,
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
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
    HomeComponent,
    ToolbarComponent,
    SidenavComponent,
    UserTasksComponent,
    ConfirmPasswordDirective,
    DialogAddTaskComponent,
    DialogEditTaskComponent,
    TaskCardComponent,
    DialogEditUserComponent,
    ClockComponent,
    DialogEditUserAvatarComponent,
    DialogDeleteUserComponent,
    CalendarComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    // MatCheckboxModule,
    MatRadioModule,
    MatProgressBarModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    MatButtonToggleModule,
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
