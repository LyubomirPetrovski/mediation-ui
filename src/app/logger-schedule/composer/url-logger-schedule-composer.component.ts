import { Component, OnInit, ViewChild } from '@angular/core';
import { LoggerScheduleStateService } from '../state/logger-schedule-state-fake.service';
import { LoggerScheduleFitler } from '../model/logger-schedule-filter.model';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs/internal/Subscription';
import { MathUtils } from 'src/app/shared/utils/math-utils';
import { ScheduleState } from '../model/logger-schedule.model';
import { LoggerScheduleCalendarComponent } from '../presentation/logger-schedule-calendar.component';
import { Paging } from 'src/app/shared/models/paging.model';
import { LazyLoadEvent } from 'primeng/primeng';

@Component({
  selector: 'app-url-logger-schedule-composer',
  templateUrl: './url-logger-schedule-composer.component.html',
  styles: []
})
export class UrlLoggerScheduleComposerComponent implements OnInit {
  public filter: LoggerScheduleFitler;
  public listPaging: Paging = new Paging();
  
  public get loggersDailySchedule$() {
    return this.state.dailySchedule$;
  }

  public get loggersCount$() {
    return this.state.loggersCount$;
  }

  @ViewChild('calendar') public calendar: LoggerScheduleCalendarComponent;

  private submittedSub: Subscription;

  constructor(
    private state: LoggerScheduleStateService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => {
        return <LoggerScheduleFitler>{
          scheduleDay: params.get('scheduleDay') || LoggerScheduleFitler.Default.scheduleDay,
          sportId: params.get('sportId'),
          leagueId: params.get('leagueId'),
          skip: +params.get('skip') || LoggerScheduleFitler.Default.skip,
          take: +params.get('take') || LoggerScheduleFitler.Default.take,
          timezoneId: params.get('timezoneId') || LoggerScheduleFitler.Default.timezoneId,
          phaseIds: params.get('phaseIds') || LoggerScheduleFitler.Default.phaseIds
        }
      })
    ).subscribe(filter => {
      this.filter = filter;

      //this.state.getDailySchedulePaged(this.filter);
    })

    this.submittedSub = this.state.submitted$.subscribe(() => this.refresh())
  }

  public onCalendarScroll({ skip, take }) {
    this.filter.skip = skip;
    this.filter.take = take;
    this.filter.scheduleState = ScheduleState.Append;

    this.state.getDailySchedulePaged(this.filter);
  }

  onFilterChange(event) {

  }

  onSubmitChanges(event) {
    
  }

  public refresh() {
    /* in order route.paramMap subscription to be triggered */
    this.filter.uqh = MathUtils.generateQueryRequestHash();
    this.filter.scheduleState = ScheduleState.Reload;

    // if (this.calendar.hasShiftChanges)
    // {
    //   this.confirmationService.confirm({
    //     key: 'refreshConfirm',
    //     message: 'You have changes that have not been subitted in the scheduler. Are you sure you want to refresh?',
    //     acceptLabel: 'Refresh',
    //     rejectLabel: 'Return to Scheduler',
    //     accept: () => this.state.getDailySchedulePaged(this.filter)    
    //   })
    // } else {
    //   this.state.getDailySchedulePaged(this.filter);
    // }
  }

}
