import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OpenPositionPOO } from 'src/app/admin/open-positions-report/model/open-position-poo.model';

@Injectable({
    providedIn: 'root'
})
export class ReportsService extends ApiService {
    public getOpenPositions(): Observable<OpenPositionPOO[]> {
        return this.get('api/reports/get-open-positions');
    }
}
