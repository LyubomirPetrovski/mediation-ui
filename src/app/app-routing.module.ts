import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PollComponent } from './poll/poll.component';
import { LoginComponent } from './login/login.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { RegisterCompanyComponent } from './register-company/register-company.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  { path: 'poll', component: PollComponent },
  { path: 'company/:companyId', component: CompanyProfileComponent },
  // { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'register', component: RegisterCompanyComponent },
  { path: '', component: HomeComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
