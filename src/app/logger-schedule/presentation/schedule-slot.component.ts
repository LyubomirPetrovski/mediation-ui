import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { ScheduleTimeSlot } from '../model/logger-schedule.model';

@Component({
  selector: 'sn-schedule-slot',
  templateUrl: './schedule-slot.component.html',
  styleUrls: ['./schedule-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScheduleSlotComponent {
  @Input() public slot: ScheduleTimeSlot;

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

  // get runChangeDetection() {
  //   console.log('Checking the view');
  //   return true;
  // }
}
