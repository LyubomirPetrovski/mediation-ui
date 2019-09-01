import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PollComponent } from './poll/poll.component';
import { LoginComponent } from './login/login.component';
import { LoggerScheduleCalendarComponent } from './logger-schedule/presentation/logger-schedule-calendar.component';
import { UrlLoggerScheduleComposerComponent } from './logger-schedule/composer/url-logger-schedule-composer.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

const routes: Routes = [    
  { path: 'poll', component: PollComponent },
  { path: 'schedule', component: UrlLoggerScheduleComposerComponent },
  { path: 'company/:companyId', component: CompanyProfileComponent },
  //{ path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
