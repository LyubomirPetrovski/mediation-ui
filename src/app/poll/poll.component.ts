import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PollService } from '../shared/services/poll.service';
import { Poll, NKPDCount } from './model/poll.entity';
import { first } from 'rxjs/operators';
import { CaptchaService } from '../shared/services/captcha.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['poll.component.scss']
})
export class PollComponent {
  public form: FormGroup;
  public saved = false;
  public captchaValid = false;

  constructor(
    private builder: FormBuilder,
    private pollService: PollService,
    private captchaService: CaptchaService
  ) {
    this.form = this.builder.group({});
  }

  public onCaptchaResponse($event) {
    this.captchaService.verifyCatcha($event.response)
      .subscribe(result => this.captchaValid = result.success);
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

  private isEmpty(arr: NKPDCount[]): boolean {
    if (arr && arr.length === 1 && arr[0].nkpd === null) {
      return true;
    }

    return false;
  }

}
