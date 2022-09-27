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
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './client-components/clients/clients.component';
import { MatCardModule } from '@angular/material/card';
import { ClientDetailComponent } from './client-components/client-detail/client-detail.component';
import { DialogAddClientComponent } from './client-components/dialog-add-client/dialog-add-client.component';
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
import { DialogEditClientComponent } from './client-components/dialog-edit-client/dialog-edit-client.component';
import { DialogEditAddressComponent } from './client-components/dialog-edit-address/dialog-edit-address.component';
import { DialogDeleteClientComponent } from './client-components/dialog-delete-client/dialog-delete-client.component';
import { EmployeesComponent } from './employee-components/employees/employees.component';
import { DialogAddEmployeeComponent } from './employee-components/dialog-add-employee/dialog-add-employee.component';
import { EmployeeDetailComponent } from './employee-components/employee-detail/employee-detail.component';
import { DialogEditEmployeeComponent } from './employee-components/dialog-edit-employee/dialog-edit-employee.component';
import { DialogEditEmployeeAddressComponent } from './employee-components/dialog-edit-employee-address/dialog-edit-employee-address.component';
import { DialogDeleteEmployeeComponent } from './employee-components/dialog-delete-employee/dialog-delete-employee.component';
import { ProjectsComponent } from './project-components/projects/projects.component';
import { DialogAddProjectComponent } from './project-components/dialog-add-project/dialog-add-project.component';
import { DialogEditProjectComponent } from './project-components/dialog-edit-project/dialog-edit-project.component';
import { ProjectDetailComponent } from './project-components/project-detail/project-detail.component';
import { DialogDeleteProjectComponent } from './project-components/dialog-delete-project/dialog-delete-project.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogEditProjectEmployeesComponent } from './project-components/dialog-edit-project-employees/dialog-edit-project-employees.component';
import { SignInComponent } from './auth-components/sign-in/sign-in.component';
import { SignUpComponent } from './auth-components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './auth-components/verify-email/verify-email.component';
import { AuthService } from './services/auth.service';
import { ResetPasswordComponent } from './auth-components/reset-password/reset-password.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';



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
    SidenavComponent
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
    
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
