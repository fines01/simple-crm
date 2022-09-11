import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientsComponent } from './clients/clients.component';
import { StaffComponent } from './staff/staff.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'clients', component: ClientsComponent},
  {path: 'client/:id', component: ClientDetailComponent},
  {path: 'staff', component: StaffComponent},
  // {path: 'member/:id', component: StaffDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
