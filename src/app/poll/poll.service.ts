import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NKPD } from './poll-questions/model/nkpd.entity';
import { ApiService } from '../shared/services/api.service';
import { HttpParams } from '@angular/common/http';
import { Poll } from './model/poll.entity';

@Injectable()
export class PollService extends ApiService {
    public searchNKPDByText(queryText: string): Observable<NKPD[]> {
        const params = new HttpParams()
            .set('queryText', queryText.replace(' ', '-'));

        return this.get<NKPD[]>('api/nom/nkpd/search', params);
    }

    public savePoll(poll: Poll): Observable<Poll> {
        return this.post<Poll>('api/poll', poll);
    }
}
