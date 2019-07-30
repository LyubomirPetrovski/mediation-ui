import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sn-logger-schedule-filter',
  templateUrl: './logger-schedule-filter.component.html',
  styles: []
})
export class LoggerScheduleFilterComponent implements OnInit {
  public phasesOptions;
  public sportOptions;
  public leagueOptions;
  public day;

  constructor() { 
    // load from server
    this.phasesOptions = [
      { value: 'phaseId', label: 'Active - P1'},
      { value: 'phaseId', label: 'Active - P2'}
    ]

    this.sportOptions = [
      { value: 'sportId', label: 'Basketball' },
      { value: 'sportId', label: 'Baseball' },
    ]

    this.leagueOptions = [
      { value: 'leagueId', label: 'MLB' },
      { value: 'leagueId', label: 'Test League' }
    ]
  }

  ngOnInit() {
  }

}
