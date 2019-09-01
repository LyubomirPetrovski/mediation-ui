import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { NKPD } from 'src/app/poll/poll-questions/model/nkpd.entity';
import { Company } from 'src/app/company-profile/model/company.entity';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends ApiService {
  public getCompanyById(companyId: string): Observable<Company[]> {
    return null;
  }
}
