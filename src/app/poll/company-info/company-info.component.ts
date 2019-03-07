import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/selectitem';
import { CompanyInfoService } from './company-info.service';
import { AutoComplete } from 'primeng/components/autocomplete/autocomplete';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { ObjectUtils } from '../../shared/utils/object.utils';
import { EmployedCount } from './model/employed-count.enum';
import { KID } from './model/company-KID.entity';


@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styles: []
})
export class CompanyInfoComponent implements OnInit, AfterViewInit {
  @Input()
  set inputForm(inputFormArg: FormGroup) {
    inputFormArg.addControl('companyName', new FormControl('', Validators.required));
    inputFormArg.addControl('companyAddress', new FormControl('', Validators.required));
    inputFormArg.addControl('companyEIK', new FormControl('', Validators.required));
    inputFormArg.addControl('companyPhone', new FormControl('', Validators.required));
    inputFormArg.addControl('companyEmail', new FormControl('', Validators.required));
    inputFormArg.addControl('companyKID', new FormControl());
    inputFormArg.addControl('companySize', new FormControl('Micro'));

    this.form = inputFormArg;
  }

  @ViewChild(AutoComplete)
  kidAutoComplete: AutoComplete;

  public companySize: SelectItem[];
  public suggestedKIDs$: Observable<KID[]>;

  public form: FormGroup;

  public employedCount = ObjectUtils.strEnumToSelectItem(EmployedCount);

  constructor(
    private companyInfoService: CompanyInfoService
  ) {
  }

  public ngOnInit() {

  }

  public ngAfterViewInit() {
    this.suggestedKIDs$ = this.kidAutoComplete.completeMethod
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.searchKID(search))
      );
  }

  private searchKID({ query }): Observable<any[]> {
    return this.companyInfoService.searchKIDByText(query)
      .pipe(
        map(res => res.map((nkpd) => ({
          id: nkpd.id,
          displayName: nkpd.code + ' ' + nkpd.name
        })))
        // tap(console.log)
      );
  }
}
