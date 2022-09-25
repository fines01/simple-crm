import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SignInComponent } from './auth-components/sign-in/sign-in.component';
import { SignUpComponent } from './auth-components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './auth-components/verify-email/verify-email.component';
import { ResetPasswordComponent } from './auth-components/reset-password/reset-password.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
