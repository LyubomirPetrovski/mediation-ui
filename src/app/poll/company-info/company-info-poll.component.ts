import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/selectitem';
import { AutoComplete } from 'primeng/components/autocomplete/autocomplete';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { ObjectUtils } from '../../shared/utils/object.utils';
import { EmployedCount } from './model/employed-count.enum';
import { KID } from './model/company-KID.entity';
import { City } from './model/city.entity';
import { NomService } from './company-info.service';
import { CompanyFullData } from 'src/app/company-profile/model/company.dto';

function eikValidator(c: FormControl) {
  return isValidEIK(c.value) ? null: { 'eikValidator': { value: c.value } }
}

function isValidEIK(v) {
    var matches;
    if (!(matches = v.match(/^(BG)?((\d{9})(\d{4})?)$/)))
      return false;
  
    //1*а1+2*а2+3*а3+4*а4+5*а5+6*а6+7*а7+8*а8;
    var a = matches[3];
    var a9 = a[0]*1 + a[1]*2 + a[2]*3 + a[3]*4 + a[4]*5 + a[5]*6 + a[6]*7 + a[7]*8;
    a9 = a9 % 11;
  
    if (a9 == 10)
    {
    //3*а1+4*а2+5*а3+6*а4+7*а5+8*а6+9*а7+10*а8
      a9 = a[0]*3 + a[1]*4 + a[2]*5 + a[3]*6 + a[4]*7 + a[5]*8 + a[6]*9 + a[7]*10;
      a9 = a9 % 11;
    }
  
    a9 = a9 == 10 ? 0 : a9;
  
    if (a9 != a[8])
      return false;
    if (!matches[4])
      return true;
  
    //2*а9 + 7*а10 + 3*а11 +5*а12
    a = matches[4];
    var a13 = a9*2 + a[0]*7 + a[1]*3 + a[2]*5;
    a13 = a13 % 11;
  
    //4*а9+9*а10+5*а11+7*а12
    if (a13 == 10)
    {
      a13 = a9*4 + a[0]*9 + a[1]*5 + a[2]*7;
      a13 = a13 % 11;
    }
  
    a13 = a13 == 10 ? 0 : a13;
  
    return (a13 == a[3]);
}

@Component({
  selector: 'app-company-info-poll',
  templateUrl: './company-info-poll.component.html',
  styles: []
})
export class CompanyInfoPollComponent implements OnInit, AfterViewInit {
  @Input()
  set inputForm(inputFormArg: FormGroup) {
    inputFormArg.addControl('companyName', new FormControl('', Validators.required));
    inputFormArg.addControl('companyEIK', new FormControl('', [Validators.required, eikValidator]));
    inputFormArg.addControl('companyCity', new FormControl('', Validators.required));
    inputFormArg.addControl('municipalityName', new FormControl('', Validators.required));
    inputFormArg.addControl('regionName', new FormControl('', Validators.required));
    inputFormArg.addControl('companyAddress', new FormControl('', Validators.required));
    inputFormArg.addControl('contactPerson', new FormControl('', Validators.required));
    inputFormArg.addControl('contactPhone', new FormControl('', Validators.required));
    inputFormArg.addControl('contactEmail', new FormControl('', Validators.required));
    inputFormArg.addControl('companyKID', new FormControl());
    inputFormArg.addControl('companySize', new FormControl('Micro'));

    this.form = inputFormArg;
  }

  @Input()
  set company(value: CompanyFullData) {
    if (value) {
      this.populateData(value);
    }
  }

  @ViewChild('kidAutoComplete') kidAutoComplete: AutoComplete;
  @ViewChild('cityAutoComplete') cityAutoComplete: AutoComplete;

  public form: FormGroup;
  public companySize: SelectItem[];
  public suggestedKIDs$: Observable<KID[]>;
  public suggestedCities$: Observable<City[]>
  public employedCount = ObjectUtils.strEnumToSelectItem(EmployedCount);

  constructor(private nomService: NomService) { }

  public ngOnInit() {
  }

  public onSelectCity(selectedCity: City) {
    this.form.controls.municipalityName.setValue(selectedCity.municipality.name);
    this.form.controls.regionName.setValue(selectedCity.region.name);
  }

  public ngAfterViewInit() {
    this.suggestedKIDs$ = this.kidAutoComplete.completeMethod
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.searchKID(search))
      );

    this.suggestedCities$ = this.cityAutoComplete.completeMethod
        .pipe(
          debounceTime(400),
          distinctUntilChanged(),
          switchMap(search => this.searchCity(search))
        );
  }

  private searchKID({ query }): Observable<any[]> {
    return this.nomService.searchKIDByText(query)
      .pipe(
        map(res => res.map((kid) => ({
          id: kid.id,
          displayName: kid.code + ' ' + kid.name
        })))
        // tap(console.log)
      );
  }

  private searchCity({ query }): Observable<any[]> {
    return this.nomService.searchCityByText(query);
  }

  private populateData(c: CompanyFullData) {
    if (c) {
      this.form.patchValue({
        companyName: c.name,
        companyEIK: c.bulstat,
        companyCity: c.city,
        municipalityName: c.city.municipality.name,
        regionName: c.city.region.name,
        companyAddress: c.address.address,
        contactPerson: c.contact.contactPerson,
        contactPhone: c.contact.phone,
        contactEmail: c.contact.eMail,
        companyKID: c.kid,
        companySize: c.companySize
      });
    }
  }
}
