import { Injectable } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Observable } from 'rxjs';
import { KID } from 'src/app/company-info/model/company-KID.entity';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class CompanyInfoService extends ApiService {
    public getCompanySizes() {
        return this.get('api/nom/company-size');
    }

    public searchKIDByText(queryText: string): Observable<KID[]> {
        const params = new HttpParams()
            .set('queryText', queryText.replace(' ', '-'));

        return this.get<KID[]>('api/nom/kid/search', params);
    }
}
