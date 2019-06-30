import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';
import {SpinnerModule} from 'primeng/components/spinner/spinner';
import {CheckboxModule} from 'primeng/components/checkbox/checkbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {CaptchaModule} from 'primeng/captcha';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';

import { AppComponent } from './app.component';
import { CompanyInfoComponent } from './poll/company-info/company-info.component';
import { AppSettingsService } from './shared/services/app-settings.service';
import { CompanyInfoService } from './poll/company-info/company-info.service';
import { PollComponent } from './poll/poll.component';
import { EnumPipe } from './shared/pipes/enum.pipe';
import { PollService } from './poll/poll.service';
import { NkpdCountComponent } from './poll/nkpd-count/nkpd-count.component';
import { NkpdCountListComponent } from './poll/nkpd-count-list/nkpd-count-list.component';
import { HomeComponent } from './home/home.component';
import { PollQuestionsComponent } from './poll/poll-questions/poll-questions.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/services/auth.service';
import { StorageService } from './shared/services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    CompanyInfoComponent,
    PollComponent,

    // Pipes
    EnumPipe,

    NkpdCountComponent,
    NkpdCountListComponent,
    HomeComponent,
    PollQuestionsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    LayoutModule,

    // PrimeNG
    PanelModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    AutoCompleteModule,
    SpinnerModule,
    CheckboxModule,
    InputTextareaModule,
    CaptchaModule
  ],
  providers: [
    AppSettingsService,
    CompanyInfoService,
    PollService,
    AuthService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
