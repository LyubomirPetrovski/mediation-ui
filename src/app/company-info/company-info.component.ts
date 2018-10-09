import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/selectitem';
import { CompanySizeNom } from './model/company-size.entity';
import { CompanyInfoService } from './company-info.service';
import { KID } from 'src/app/company-info/model/company-KID.entity';
import { AutoComplete } from 'primeng/components/autocomplete/autocomplete';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, switchMap, first, tap, map, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styles: []
})
export class CompanyInfoComponent implements OnInit, AfterViewInit {
  @ViewChild(AutoComplete)
  kidAutoComplete: AutoComplete;


  public companySizes: SelectItem[];
  public suggestedKIDs$: Observable<KID[]>;

  public form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private companyInfoService: CompanyInfoService
  ) {
    this.form = this.builder.group({
      id: [''],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyEIK: ['', Validators.required],
      companyPhone: ['', Validators.required],
      companyEmail: ['', Validators.required],
      companyKID: [''],
      companySizes: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.companyInfoService.getCompanySizes()
      .subscribe((result: CompanySizeNom[]) => {
        this.companySizes = result
          .map(obj => ({
            label: obj.name,
            value: obj.id
          }));
      });
  }

  ngAfterViewInit() {
    this.suggestedKIDs$ = this.kidAutoComplete.completeMethod
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.searchKID(search))
      );
  }

  private searchKID({ query }): Observable<KID[]> {
    return this.companyInfoService.searchKIDByText(query)
      .pipe(
        map((res) => res.map((item) => Object.assign(item, { nameWithCode: item.code + ' ' + item.name }))),
        // tap(console.log)
      );
  }
}
