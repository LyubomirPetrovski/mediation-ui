import { Component, OnInit } from '@angular/core';
import { LoggerScheduleStateService } from '../state/logger-schedule-state-fake.service';

@Component({
  selector: 'app-url-logger-schedule-composer',
  templateUrl: './url-logger-schedule-composer.component.html',
  styles: []
})
export class UrlLoggerScheduleComposerComponent implements OnInit {
  
  public get loggerScheduleData$() {
    return this.state.dailySchedule$;
  }

  constructor(
    private state: LoggerScheduleStateService
  ) { }

  ngOnInit() {
    this.state.getDailySchedule()
  }

}
