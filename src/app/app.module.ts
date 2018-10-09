import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/components/panel/panel';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { AutoCompleteModule } from 'primeng/components/autocomplete/autocomplete';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { AppSettingsService } from './shared/services/app-settings.service';
import { CompanyInfoService } from './company-info/company-info.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    CompanyInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // PrimeNG
    PanelModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    AutoCompleteModule
  ],
  providers: [
    AppSettingsService,
    CompanyInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
