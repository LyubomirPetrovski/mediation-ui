import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CompanyFullData } from 'src/app/company-profile/model/company.dto';
import { Company } from 'src/app/company-profile/model/company.entity';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends ApiService {
  public getCompanyById(companyId: string): Observable<CompanyFullData> {
    return this.get<CompanyFullData>(`api/company/${companyId}`);
  }

  public save(company: Company) {
    if (company) {
      if (company.id) {
        return this.put(`api/company`, company);
      }
      else
      {
        return this.post(`api/company`, company);
      }
    }
    return
  }
}
