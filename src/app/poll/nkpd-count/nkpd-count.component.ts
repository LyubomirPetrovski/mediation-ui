import { Component, OnInit, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoComplete } from 'primeng/components/autocomplete/autocomplete';
import { NKPD } from '../poll-questions/model/nkpd.entity';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { PollService } from '../../shared/services/poll.service';

@Component({
  selector: 'app-nkpd-count',
  templateUrl: './nkpd-count.component.html',
  styles: []
})
export class NkpdCountComponent implements AfterViewInit {
  @Input() form: FormGroup;

  @ViewChild(AutoComplete) nkpdAutoComplete: AutoComplete;

  public suggestedNKPDs$ = new Observable<NKPD[]>();

  constructor(
    private pollService: PollService
  ) {

  }

  public ngAfterViewInit() {
    this.suggestedNKPDs$ = this.nkpdAutoComplete.completeMethod
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.searchNKPD(search))
      );
  }

  private searchNKPD({ query }): Observable<any[]> {
    return this.pollService.searchNKPDByText(query)
      .pipe(
        map(res => res.map((nkpd) => ({
          id: nkpd.id,
          displayName: nkpd.code + ' ' + nkpd.name
        })))
        // tap(console.log)
      );
  }
}
