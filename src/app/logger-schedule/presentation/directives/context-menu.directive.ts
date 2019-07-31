import { Directive, Input, HostListener } from "@angular/core";
import { ScheduleTimeSlot } from "../../model/logger-schedule.model";
import { LoggerScheduleCalendarComponent } from "../logger-schedule-calendar.component";

@Directive({
    selector: '[contextMenuSlot]'
})
export class ContextMenuSlotDirective {
    @Input() public contextMenuSlot: ScheduleTimeSlot;

    constructor(
        private scheduleComponent: LoggerScheduleCalendarComponent
    ) { }

    @HostListener('contextmenu', ['$event']) public onContextMenu(event: MouseEvent) {
        this.scheduleComponent.handleRowRightClick(this.contextMenuSlot, event);
        event.preventDefault();
    }
}