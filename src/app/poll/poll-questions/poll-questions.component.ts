import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProfessionalQualificationEnum } from './model/professional-qualification.enum';
import { ObjectUtils } from '../../shared/utils/object.utils';
import { AutoComplete } from 'primeng/components/autocomplete/autocomplete';
import { NKPD } from './model/nkpd.entity';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { switchMap, map } from 'rxjs/operators';
import { PollService } from '../../shared/services/poll.service';
import { VacantPositionsEnum } from './model/vacant-positions.enum';
import { YesNoEnum } from '../../shared/enum/yes-no.enum';
import { EducationalTrainingEnum } from './model/educational-training.enum';
import { ProfessionalEducationComplianceEnum } from './model/proff-education-complience.enum';
import { ModifyNKPDListEnum } from './model/modify-nkpd-list.enum';

@Component({
  selector: 'app-poll-questions',
  templateUrl: './poll-questions.component.html',
  styles: []
})
export class PollQuestionsComponent implements OnInit, AfterViewInit {
  @Input()
  set inputForm(inputFormArg: FormGroup) {
    inputFormArg.addControl('qualification1', new FormControl('PredominantHighSchool', Validators.required));
    inputFormArg.addControl('secEduPos2', new FormControl());
    inputFormArg.addControl('highEduPos3', new FormControl('', Validators.required));
    inputFormArg.addControl('secEduPosOccupiedByHighEdu4', new FormControl());
    inputFormArg.addControl('highEduPosOccupiedBySecEdu4', new FormControl());
    inputFormArg.addControl('haveVacantPos5', new FormControl('YesWithSecEdu'));
    inputFormArg.addControl('vacantPosSecEduCount6', new FormControl());
    inputFormArg.addControl('vacantPosSecEduCodes6', new FormArray([new FormGroup({
      nkpd: new FormControl(),
      count: new FormControl()
    })]));
    inputFormArg.addControl('vacantPosHighEduCount7', new FormControl());
    inputFormArg.addControl('vacantPosHighEduCodes7', new FormArray([new FormGroup({
      nkpd: new FormControl(),
      count: new FormControl()
    })]));
    inputFormArg.addControl('secEduInFiveYearsCount8', new FormControl());
    inputFormArg.addControl('secEduPosInFiveYearsCodes8', new FormArray([new FormGroup({
      nkpd: new FormControl(),
      count: new FormControl()
    })]));
    inputFormArg.addControl('highEduInFiveYearsCount9', new FormControl());
    inputFormArg.addControl('highEduPosInFiveYearsCodes9', new FormArray([new FormGroup({
      nkpd: new FormControl(),
      count: new FormControl()
    })]));
    inputFormArg.addControl('haveContactsWithEduInstitutions10', new FormControl('Yes'));
    inputFormArg.addControl('participationInExaminationCommittees11', new FormControl(0));
    inputFormArg.addControl('curriculumDevelopmentInSecEdu11', new FormControl(0));
    inputFormArg.addControl('haveInternship11', new FormControl(0));
    inputFormArg.addControl('eduStandartDevelopment11', new FormControl(0));
    inputFormArg.addControl('participationInOtherInitiatives11', new FormControl(0));
    inputFormArg.addControl('secEduParticipationMajors11', new FormControl());
    inputFormArg.addControl('highEduParticipationMajors12', new FormControl());
    inputFormArg.addControl('participateDualEduMajors13', new FormControl());
    inputFormArg.addControl('dualEduCountPerYear14', new FormControl());
    inputFormArg.addControl('ableDualEduMajors14', new FormControl());
    inputFormArg.addControl('acceptInovations15', new FormControl('Yes'));
    inputFormArg.addControl('secEduTheory16', new FormControl('Excellent'));
    inputFormArg.addControl('secEduPractive16', new FormControl('Excellent'));
    inputFormArg.addControl('highEduTheory17', new FormControl('Excellent'));
    inputFormArg.addControl('highEduPractice17', new FormControl('Excellent'));
    inputFormArg.addControl('profEduCompliance18', new FormControl('HighLevelOfCompliance'));
    inputFormArg.addControl('modifyNKPDList19', new FormControl('YesAddStrategicAndPriorityProfessions'));
    inputFormArg.addControl('notes', new FormControl());

    this.form = inputFormArg;
  }

  @ViewChild('secEduNKPDAutoComplete')
  secEduNKPDAutoComplete: AutoComplete;

  @ViewChild('highEduNKPDAutoComplete')
  highEduNKPDAutoComplete: AutoComplete;

  public form: FormGroup;

  public suggestedHighEduNKPDs$: Observable<NKPD[]>;
  public suggestedSecEduNKPDs$: Observable<NKPD[]>;

  public professionalQualifications = ObjectUtils.strEnumToSelectItem(ProfessionalQualificationEnum);
  public vacantPositions = ObjectUtils.strEnumToSelectItem(VacantPositionsEnum);
  public yesNoEnum = ObjectUtils.strEnumToSelectItem(YesNoEnum);
  public educationalTrainingEnum = ObjectUtils.strEnumToSelectItem(EducationalTrainingEnum);
  public proffEducationComplienceEnum = ObjectUtils.strEnumToSelectItem(ProfessionalEducationComplianceEnum);
  public modifyNKPDListEnum = ObjectUtils.strEnumToSelectItem(ModifyNKPDListEnum);

  constructor(private pollService: PollService) {

  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.suggestedSecEduNKPDs$ = this.secEduNKPDAutoComplete.completeMethod
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.searchKID(search))
      );

    this.suggestedHighEduNKPDs$ = this.highEduNKPDAutoComplete.completeMethod
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => this.searchKID(search))
      );
  }

  private searchKID({ query }): Observable<any[]> {
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
