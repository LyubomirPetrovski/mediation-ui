import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PollService } from './poll.service';
import { Poll } from './model/poll.entity';
import { first } from 'rxjs/operators';
import { DisplayProperty } from '../shared/class/display-property.class';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styles: []
})
export class PollComponent {
  public form: FormGroup;
  public saved = false;

  constructor(
    private builder: FormBuilder,
    private pollService: PollService
  ) {
    this.form = this.builder.group({});
  }

  public onSubmit(model) {
    if (this.form.valid) {
      // console.dir(JSON.stringify(model));

      const poll = <Poll>model;

      poll.companyCityId = model.companyCity.id;
      if (this.isEmpty(poll.vacantPosSecEduCodes6)) {
        poll.vacantPosSecEduCodes6 = null;
      }
      if (this.isEmpty(poll.vacantPosHighEduCodes7)) {
        poll.vacantPosHighEduCodes7 = null;
      }
      if (this.isEmpty(poll.secEduPosInFiveYearsCodes8)) {
        poll.secEduPosInFiveYearsCodes8 = null;
      }
      if (this.isEmpty(poll.highEduPosInFiveYearsCodes9)) {
        poll.highEduPosInFiveYearsCodes9 = null;
      }

      this.pollService.savePoll(poll).pipe(
        first()
      ).subscribe(() => {
        this.saved = true;
      });
    }
  }

  private isEmpty(arr: DisplayProperty[]): boolean {
    if (arr && arr.length === 1 && !arr[0].id) {
      return true;
    }

    return false;
  }

}
