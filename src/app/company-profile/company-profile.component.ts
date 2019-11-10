import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CompanyService } from '../shared/services/company.service';
import { CompanyFullData, CompanyAddress, CompanyContact } from './model/company.dto';
import { DocumentRef } from '../shared/entities/document-ref.entity';
import { first } from 'rxjs/operators';
import { Company } from './model/company.entity';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styles: []
})
export class CompanyProfileComponent implements OnInit {
  public form: FormGroup;
  public companyId: string;
  public company: CompanyFullData;

  constructor(
    private route: ActivatedRoute,
    private builder: FormBuilder,
    private companyService: CompanyService,
    private messageService: MessageService
  ) { 
    this.form = this.builder.group({});
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.companyId = params.get('companyId');

      this.companyService.getCompanyById(this.companyId).subscribe(c => {
        this.company = c;
      });      
    });
  }

  public onSubmit(model) {
    if (this.form.valid) {
      const company = <Company>{
        id: this.companyId,
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
      },
      (ex) => {
        const errorMsg = `Source: ${ex.error.source}\nMessage: ${ex.error.message}`;
        this.messageService.add({severity: 'success', summary: 'Грешка', detail: `${errorMsg}`});
      });
    }
  }
}
