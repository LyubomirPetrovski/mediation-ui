import { Component, OnInit, Input } from '@angular/core';
import { SlotNumberKind, SlotNumber } from '../model/slot-numbers.model';
import { ScheduleTimeSlot, LoggerScheduleModel } from '../model/logger-schedule.model';
import { ColumnMetadata } from '../model/column-metadata.model';
import * as moment from 'moment';

@Component({
  selector: 'sn-logger-schedule-calendar',
  templateUrl: './logger-schedule-calendar.component.html',
  styleUrls: ['./logger-schedule-calendar.component.scss']
})
export class LoggerScheduleCalendarComponent implements OnInit {
  public columns: ColumnMetadata[];
  public dailySlots: ScheduleTimeSlot[] = [];
  public loggers: LoggerScheduleModel[] = [];

  // Should come from server
  // public numbers: SlotNumber[];
  // public loadedLoggers: LoggerSchedule[];  

  private selecting: boolean;
  private selectedSlots: ScheduleTimeSlot[] = [];

  SlotNumberKind: typeof SlotNumberKind = SlotNumberKind;

  private _loggerScheduleData: LoggerScheduleModel[];
  @Input()
  public set loggerScheduleData(value: LoggerScheduleModel[]) {
    if (value) {
      this._loggerScheduleData = value;
      this.loadSchedule();
    }
  }
  @Input() slotNumbersData: SlotNumber[]
  @Input() disabled: boolean;

  constructor() { }

  ngOnInit() {
    // this.initTestNumberRecords();
    // this.initTestLoggerSchedules();

    this.initColumns();
    this.initSlots();
    // this.loadSchedule();    
  }

  public handleMouseDown(slot: ScheduleTimeSlot) {
    this.clearSelection();

    this.selecting = true;
    slot.selected = true;
    this.selectedSlots.push(slot);
  }

  public handleMouseEnter(slot: ScheduleTimeSlot) {
    if (!this.selecting) return;

    slot.selected = true;
    this.selectedSlots.push(slot);
  }

  public handleMouseUp(slot: ScheduleTimeSlot) {
    this.selecting = false;
  }

  private isOddRowIndex(rowIndex: number) {
    return !!(rowIndex % 2);
  }

  private clearSelection() {
    this.selectedSlots.forEach(s => s.selected = false);
    this.selectedSlots = [];
  }


  private initColumns() {
    this.columns = [
      { field: 'maxGames', header: 'Max Games' },
      { field: '1200AM', header: '12:00 AM' },
      { field: '1230AM', header: '12:30 AM' },
      { field: '100AM', header: '1:00 AM' },
      { field: '130AM', header: '1:30 AM' },
      { field: '200AM', header: '2:00 AM' },
      { field: '230AM', header: '2:30 AM' },
      { field: '300AM', header: '3:00 AM' },
      { field: '330AM', header: '3:30 AM' },
      { field: '400AM', header: '4:00 AM' },
      { field: '430AM', header: '4:30 AM' },
      { field: '500AM', header: '5:00 AM' },
      { field: '530AM', header: '5:30 AM' },
      { field: '600AM', header: '6:00 AM' },
      { field: '630AM', header: '6:30 AM' },
      { field: '700AM', header: '7:00 AM' },
      { field: '730AM', header: '7:30 AM' },
      { field: '800AM', header: '8:00 AM' },
      { field: '830AM', header: '8:30 AM' },
      { field: '900AM', header: '9:00 AM' },
      { field: '930AM', header: '9:30 AM' },
      { field: '1000AM', header: '10:00 AM' },
      { field: '1030AM', header: '10:30 AM' },
      { field: '1100AM', header: '11:00 AM' },
      { field: '1130AM', header: '11:30 AM' },
      { field: '1200PM', header: '12:00 PM' },
      { field: '1230PM', header: '12:30 PM' },
      { field: '100PM', header: '1:00 PM' },
      { field: '130PM', header: '1:30 PM' },
      { field: '200PM', header: '2:00 PM' },
      { field: '230PM', header: '2:30 PM' },
      { field: '300PM', header: '3:00 PM' },
      { field: '330PM', header: '3:30 PM' },
      { field: '400PM', header: '4:00 PM' },
      { field: '430PM', header: '4:30 PM' },
      { field: '500PM', header: '5:00 PM' },
      { field: '530PM', header: '5:30 PM' },
      { field: '600PM', header: '6:00 PM' },
      { field: '630PM', header: '6:30 PM' },
      { field: '700PM', header: '7:00 PM' },
      { field: '730PM', header: '7:30 PM' },
      { field: '800PM', header: '8:00 PM' },
      { field: '830PM', header: '8:30 PM' },
      { field: '900PM', header: '9:00 PM' },
      { field: '930PM', header: '9:30 PM' },
      { field: '1000PM', header: '10:00 PM' },
      { field: '1030PM', header: '10:30 PM' },
      { field: '1100PM', header: '11:00 PM' },
      { field: '1130PM', header: '11:30 PM' }
    ]
  }

  private initSlots() {
    var start = moment('12:00 AM', 'hh:mm A');
    var end = moment(start).add(1, 'day');

    do {
      var halfHourOffset = moment(start).add(30, 'minutes')

      var slot = <ScheduleTimeSlot>{
        id: start.format('hhmmA'),
        from: { hour: start.hour(), minute: start.minute() } ,
        to: { hour: halfHourOffset.hour(), minute: halfHourOffset.minute() },
        available: false,
        onShift: false,
        selected: false
      };
      this.dailySlots.push(slot);

      start = halfHourOffset;
    }
    while (start < end)
  }

  private loadSchedule() {
    this._loggerScheduleData.forEach(ll => {
      // makes a copy of dailySlots for the specified logger
      var dailySlots = [...this.dailySlots];

      // integrate loaded slots into daily slots
      ll.timeSlots.forEach(slot => {
        dailySlots[dailySlots.findIndex(s => s.id === slot.id)] = slot;
      });

      var logger = <LoggerScheduleModel>{
        logger: ll.logger,
        maxGames: ll.maxGames,
        timeSlots: dailySlots
      }

      this.loggers.push(logger);
    })
  }  
}
