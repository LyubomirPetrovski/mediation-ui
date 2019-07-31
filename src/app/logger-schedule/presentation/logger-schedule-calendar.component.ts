import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SlotNumberKind, SlotNumber } from '../model/slot-numbers.model';
import { ScheduleTimeSlot, LoggerScheduleModel, ChangeStatus } from '../model/logger-schedule.model';
import { ColumnMetadata } from '../model/column-metadata.model';
import * as moment from 'moment';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'sn-logger-schedule-calendar',
  templateUrl: './logger-schedule-calendar.component.html',
  styleUrls: ['./logger-schedule-calendar.component.scss']
})
export class LoggerScheduleCalendarComponent implements OnInit {
  public columns: ColumnMetadata[];
  /*  */
  public loggers: LoggerScheduleModel[] = [];

  public contextMenuItems: MenuItem[] = [];

  private selecting: boolean;
  private selectedSlots: ScheduleTimeSlot[] = [];
  private shiftChanges: ScheduleTimeSlot[] = [];

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
  @ViewChild('contextMenu') public contextMenu: ContextMenu;

  constructor() { }

  ngOnInit() {
    this.initColumns();
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

  public handleRowRightClick(slot: ScheduleTimeSlot, mouseEvent: MouseEvent) {
    const found = this.selectedSlots.indexOf(slot);
    if (found < 0) {
      this.clearSelection();
      slot.selected = true;
      this.selectedSlots = [slot];
    }
    this.initContextMenu(slot);
    this.contextMenu.show(mouseEvent);
  }

  private initContextMenu(slot: ScheduleTimeSlot) {
    this.contextMenuItems = [
      {
        label: 'Assign Selected Game - P1',
        command: (event: Event) => { this.handleAssignSelectedGame(); }
      },
      {
        label: 'Assign Shift (No Game) - P1',
        command: (event: Event) => { this.handleAssignShiftNoGame(); }
      },
      {
        label: 'Assign Default Shift - P1',
        command: (event: Event) => { this.handleAssignDefaultShift(); }
      }
    ];

    if (this.selectedSlots.some(slot => slot.onShift)) {
      this.contextMenuItems.push({
        label: 'Unassign Shift - P1',
        command: (event: Event) => { this.handleUnassignShift(); }
      })
    }
  }

  private handleAssignSelectedGame() {

  }

  private handleAssignShiftNoGame() {
    this.selectedSlots.forEach(slot => {
      if (!slot.onShift) {
        slot.onShift = true;

        /*
          if slot to assign is part of shiftChanges and its ChangeStatus=Unassigned, meaning shift has been unassigned but not submited, then just remove it from shiftChanges and don't send it to server
          if slot to assign is not part of shiftChanges, then mark shift as Assigned and send it to server on submit
        */
        const existingIndex = this.shiftChanges.indexOf(slot);
        if (existingIndex > -1) {
          if (slot.changeStatus == ChangeStatus.Unassigned) {
            this.shiftChanges.splice(existingIndex, 1);
          }
        } else {
          slot.changeStatus = ChangeStatus.Assigned;

          this.shiftChanges.push(slot);
        }
      }
    });

    this.clearSelection();

    console.log(this.shiftChanges);
  }

  private handleAssignDefaultShift() {

  }

  private handleUnassignShift() {
    this.selectedSlots.forEach(slot => {
      if (slot.onShift) {
        slot.onShift = false;

        /* 
          if slot to unassugn is part of shiftChanges, meaning shift has been assigned but not submited, then just remove it from shiftChanges and don't send it to server
          if slot to unassign is not part of shiftChanges, then mark shift as Unassigned and send it to server on submit, so server will delete it
        */
        const existingIndex = this.shiftChanges.indexOf(slot);
        if (existingIndex > -1) {
          this.shiftChanges.splice(existingIndex, 1);
        } else {
          slot.changeStatus = ChangeStatus.Unassigned;
          this.shiftChanges.push(slot);
        }        
      }
    });

    this.clearSelection();

    console.log(this.shiftChanges);
  }

  private clearSelection() {
    this.selectedSlots.forEach(s => s.selected = false);
    this.selectedSlots = [];
  }


  private isOddRowIndex(rowIndex: number) {
    return !!(rowIndex % 2);
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

  private initDailySlots(): ScheduleTimeSlot[] {
    var dailySlots = [];

    var start = moment('12:00 AM', 'hh:mm A');
    var end = moment(start).add(1, 'day');

    do {
      var halfHourOffset = moment(start).add(30, 'minutes')

      var slot = <ScheduleTimeSlot>{
        id: start.format('HHmm'),
        from: { hour: start.hour(), minute: start.minute() } ,
        to: { hour: halfHourOffset.hour(), minute: halfHourOffset.minute() },
        available: false,
        onShift: false,
        selected: false
      };
      dailySlots.push(slot);

      start = halfHourOffset;
    }
    while (start < end)

    return dailySlots;
  }

  private loadSchedule() {
    this._loggerScheduleData.forEach(ll => {
      /* List of empty half-hour slots that will be updated with loggerScheduleData comming from server */
      // var dailySlots = JSON.parse(JSON.stringify(this.dailySlots));
      var dailySlots = this.initDailySlots();

      // update daily slots with loaded slots from server
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
