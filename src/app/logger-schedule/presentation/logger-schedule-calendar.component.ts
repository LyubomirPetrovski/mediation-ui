import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, HostListener, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { SlotNumberKind, SlotNumber } from '../model/slot-numbers.model';
import { ScheduleTimeSlot, LoggerScheduleModel, ChangeStatus, ScheduleModel, ScheduleState } from '../model/logger-schedule.model';
import * as moment from 'moment';
import { ContextMenu } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/components/common/menuitem';
import { LazyLoadEvent } from 'primeng/primeng';
import { ColumnMetadata } from '../model/column-metadata.model';
import { Paging } from 'src/app/shared/models/paging.model';
import { Table } from 'primeng/table';

@Component({
  selector: 'sn-logger-schedule-calendar',
  templateUrl: './logger-schedule-calendar.component.html',
  styleUrls: ['./logger-schedule-calendar.component.scss']
})
export class LoggerScheduleCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  public columns: ColumnMetadata[];
  public contextMenuItems: MenuItem[] = [];
  public shiftChanges: ScheduleTimeSlot[] = [];
  
  public get hasShiftChanges() {
    return this.shiftChanges.length > 0;
  }

  // private selecting: boolean;
  private firstSelectedSlot: ScheduleTimeSlot;
  private selectedSlots: ScheduleTimeSlot[] = [];  

  SlotNumberKind: typeof SlotNumberKind = SlotNumberKind;

  /* Full daily list of logger availability, shifts and not set time slots */
  public loggers: LoggerScheduleModel[] = [];

  /* Available or OnShift time slots  */
  // private _loggersDailySchedule: LoggerScheduleModel[];
  @Input()
  public set schedule(value: ScheduleModel) {
    if (value) {
      switch (value.scheduleState) {
        case ScheduleState.Append: {
          this.loadSchedule(value.loggers);

          break;
        }
        case ScheduleState.Reload: {
          this.loggers = [];
          this.shiftChanges = []
          this.loadSchedule(value.loggers);

          break;
        }
      }
      // this.shiftChanges = [];
      // this._loggersDailySchedule = value;
      
    }
  }

  @Input() slotNumbers: SlotNumber[]
  //@Input() disabled: boolean;
  @Input() paging: Paging = new Paging();
  @Input() loggersCount: number;

  @Output() submitChanges = new EventEmitter<ScheduleTimeSlot[]>();
  @Output() scroll = new EventEmitter();
  
  @ViewChild('contextMenu') public contextMenu: ContextMenu;
  @ViewChild('calendar') public calendar: Table;

  // @HostListener('click', ['$event']) 
  // public onSlotClickEvent(event: MouseEvent) {
  //   this.onSlotClick(event);
  // }

  // @HostListener('mouseup', ['$event'])
  // public onSlotMouseupEvent(event: MouseEvent) {
  //   this.onSlotMouseUp(event);
  // }

  constructor(private elRef: ElementRef) { }

  public onSlotClick(e) {
    event.stopPropagation();
    event.preventDefault();    

    var slotComponent = (e.target as HTMLElement).parentElement;
    if (slotComponent.tagName !== 'SN-SCHEDULE-SLOT') return;

    var td = slotComponent.parentElement;
    var tr = td.parentElement;

    if (tr.tagName !== "TR" && td.tagName !== "TD") return;

    const slotRowIndex = (tr as any).rowIndex;
    const slotColIndex = (td as any).cellIndex - 2; //remove first two columns as we only care about schedule-slot components

    // this.onSlotMouseDown(this.loggers[slotRowIndex].timeSlots[slotColIndex]);
    this.onSlotMouseDown(slotRowIndex, slotColIndex);
  }

  public onSlotMouseUp(e) {
    event.stopPropagation();
    event.preventDefault();    

    var slotComponent = (e.target as HTMLElement).parentElement;
    if (slotComponent.tagName !== 'SN-SCHEDULE-SLOT') return;

    var td = slotComponent.parentElement;
    var tr = td.parentElement;

    if (tr.tagName !== "TR" || td.tagName !== "TD" || !e.ctrlKey) return;

    const slotRowIndex = (tr as any).rowIndex;
    const slotColIndex = (td as any).cellIndex - 2; //remove first two columns as we only care about schedule-slot components

    this.handleSlotMouseUp(slotRowIndex, slotColIndex);
  }

  ngOnInit() {
    this.initColumns();
  }

  ngAfterViewInit() {
    this.elRef.nativeElement.addEventListener('click', this.onSlotClick.bind(this), false);
    this.elRef.nativeElement.addEventListener('mouseup', this.onSlotMouseUp.bind(this), false);
  }

  ngOnDestroy() {
    this.elRef.nativeElement.removeEventListener('click', this.onSlotClick);
    this.elRef.nativeElement.removeEventListener('mouseup', this.onSlotMouseUp);
  }

  public getSlotClass(slot: ScheduleTimeSlot) {
    if (slot.selected) {
      return 'selected';
    }

    if (slot.onShift) {
      return 'onShift';
    }

    if (slot.available) {
      return 'available';
    }    

    return 'notSet';
  }
  
  public onSubmitChanges() {
    this.submitChanges.emit(this.shiftChanges);
    this.shiftChanges = [];
  }

  public loadDataOnScroll(event: LazyLoadEvent) {
    this.scroll.emit({ skip: this.loggers.length, take: event.rows });
  }

  public onSlotMouseDown(slotRowIndex, slotColIndex) {
    this.clearSelection();

    //---------
    const oldSlot = this.loggers[slotRowIndex].timeSlots[slotColIndex];

    var changedSlot = Object.assign({}, oldSlot, { selected: true });
    this.firstSelectedSlot = changedSlot;

    this.loggers[slotRowIndex].timeSlots[slotColIndex] = changedSlot;
    //---------

    //slot.selected = true;

    this.selectedSlots.push(changedSlot);

    console.log('onSlotMouseDown finished');
  }

  public onSlotMouseOver(slot: ScheduleTimeSlot) {
    // if (!this.selecting) return;

    slot.selected = true;
    this.selectedSlots.push(slot);
  }

  public handleSlotMouseUp(slotRowIndex, slotColIndex) {
    const endSlot = this.loggers[slotRowIndex].timeSlots[slotColIndex];

    var firstSelectedSlotIndex = this.loggers[slotRowIndex].timeSlots.indexOf(this.firstSelectedSlot);
    var lastSelectedSlotIndex = this.loggers[slotRowIndex].timeSlots.indexOf(endSlot);
    
    const loggerSlots = this.loggers[slotRowIndex].timeSlots;

    if (lastSelectedSlotIndex > firstSelectedSlotIndex) {
      this.selectSlots(loggerSlots, firstSelectedSlotIndex, lastSelectedSlotIndex);
    } else {
      this.selectSlots(loggerSlots, lastSelectedSlotIndex, firstSelectedSlotIndex);
    }
  }

  private selectSlots(loggerSlots, startIndex, endIndex) {
    for (var i = startIndex; i <= endIndex; i++) {
      this.selectSlot(loggerSlots, i);
    }
  }

  private selectSlot(loggerSlots, slotIndex) {
    const oldSlot = loggerSlots[slotIndex];
    if (!oldSlot.selected) {
      var changedSlot = Object.assign({}, oldSlot, { selected: true });
      loggerSlots[slotIndex] = changedSlot;

      this.selectedSlots.push(changedSlot);
    }    
  }

  private deselectSlot(loggerSlots, slotIndex) {
    const oldSlot = loggerSlots[slotIndex];
    if (oldSlot.selected) {
      var changedSlot = Object.assign({}, oldSlot, { selected: false });
      loggerSlots[slotIndex] = changedSlot;

      this.selectedSlots.splice(slotIndex, 0);
    }   
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
    this.contextMenuItems = [];

    if (!slot.onShift) {
      this.contextMenuItems.push(
        {
          label: 'Assign Shift (No Game) - P1',
          command: (event: Event) => { this.handleAssignShiftNoGame(); }
        }
      )
    }

    if (this.selectedSlots.some(slot => slot.onShift)) {
      this.contextMenuItems.push({
        label: 'Unassign Shift - P1',
        command: (event: Event) => { this.handleUnassignShift(); }
      })
    }

    //TODO uncomment when loading games functionality is ready
    // {
    //   label: 'Assign Selected Game - P1',
    //   command: (event: Event) => { this.handleAssignSelectedGame(); }
    // },
    // {
    //   label: 'Assign Default Shift - P1',
    //   command: (event: Event) => { this.handleAssignDefaultShift(); }
    // }

    
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
    this.selectedSlots.forEach(s => {
      var loggerSlots = this.loggers.find(l => l.logger.id === s.loggerId).timeSlots;
      this.deselectSlot(loggerSlots, loggerSlots.indexOf(s));
    });
    this.selectedSlots = [];
  }

  private isOddRowIndex(rowIndex: number) {
    return !!(rowIndex % 2);
  }

  //TODO: generate columns automatically but not hard-coding them
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

  /* Generates a list of empty time slots for a day per logger */
  private initDailySlots(loggerId: string): ScheduleTimeSlot[] {
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
        selected: false,
        loggerId: loggerId,
        changeStatus: ChangeStatus.Unmodified,
        gameRef: null
      };
      dailySlots.push(slot);

      start = halfHourOffset;
    }
    while (start < end)

    return dailySlots;
  }

  private loadSchedule(loggerScheduleRows: LoggerScheduleModel[]) {
    // this.loggers = [];

    loggerScheduleRows.forEach(loggerRow => {
      /* List of empty half-hour slots that will be updated with loggerScheduleData comming from server */
      var dailySlots = this.initDailySlots(loggerRow.logger.id);

      // update daily slots with loaded slots from server
      loggerRow.timeSlots.forEach(slot => {
        dailySlots[dailySlots.findIndex(s => s.id === slot.id)] = slot;
      });

      var logger = <LoggerScheduleModel>{
        logger: loggerRow.logger,
        maxGames: loggerRow.maxGames,
        timeSlots: dailySlots
      }

      this.loggers.push(logger);
    })

    console.log(`loggers ${this.loggers.length}`);
  }  
}
