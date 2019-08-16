import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { KID } from 'src/app/poll/company-info/model/company-KID.entity';
import { City } from 'src/app/poll/company-info/model/city.entity';

@Injectable()
export class NomService extends ApiService {
    public searchKIDByText(queryText: string): Observable<KID[]> {
        const params = new HttpParams()
            .set('queryText', queryText.replace(' ', '-'));

        return this.get<KID[]>('api/nom/kid/search', params);
    }

    public searchCityByText(queryText: string): Observable<City[]> {
        const params = new HttpParams()
            .set('queryText', queryText.replace(' ', '-'));

        return this.get<City[]>('api/nom/city/search', params);
    }
}
