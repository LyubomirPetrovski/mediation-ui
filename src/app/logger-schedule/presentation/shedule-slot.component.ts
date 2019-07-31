import { Component, OnInit, Input } from '@angular/core';
import { ScheduleTimeSlot } from '../model/logger-schedule.model';

@Component({
  selector: 'sn-shedule-slot',
  templateUrl: './shedule-slot.component.html',
  styleUrls: ['./shedule-slot.component.scss']
})
export class SheduleSlotComponent implements OnInit {
  @Input() public slot: ScheduleTimeSlot;

  constructor() { }

  ngOnInit() {
  }

  public getSlotClass() {
    if (this.slot.selected) {
      return 'selected';
    }

    if (this.slot.onShift) {
      return 'onShift';
    }

    if (this.slot.available) {
      return 'available';
    }    

    return 'notSet';
  }
}
