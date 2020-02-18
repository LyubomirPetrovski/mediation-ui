import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Company } from '../company-profile/model/company.entity';
import { CompanyAddress, CompanyContact } from '../company-profile/model/company.dto';
import { DocumentRef } from '../shared/entities/document-ref.entity';
import { CompanyService } from '../shared/services/company.service';
import { MessageService } from 'primeng/api';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styles: []
})
export class RegisterCompanyComponent implements OnInit {
  public form: FormGroup;
  public saved = false;

  constructor(
    private builder: FormBuilder,
    private companyService: CompanyService,
    private messageService: MessageService) {
    this.form = this.builder.group({});
  }

  ngOnInit() {
  }

  public onSubmit(model) {
    if (this.form.valid) {
      const company = <Company>{
        bulstat: model.companyEIK,
        name: model.companyName,
        address: <CompanyAddress>{
          cityId: model.companyCity.id,
          address: model.companyAddress
        },
        contact: <CompanyContact>{
          contactPerson: model.contactPerson,
          phone: model.contactPhone,
          eMail: model.contactEmail
        },
        kidRef: <DocumentRef>{
          id: model.companyKID.id
        },
        companySize: model.companySize
      };

      this.companyService.save(company).pipe(
        first()
      ).subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Успех', detail: 'Данните за компанията са запазени'});

        this.saved = true;
      },
      (ex) => {
        const errorMsg = `Source: ${ex.error.source}\nMessage: ${ex.error.message}`;
        this.messageService.add({severity: 'success', summary: 'Грешка', detail: `${errorMsg}`});
      });
    }
  }

}
