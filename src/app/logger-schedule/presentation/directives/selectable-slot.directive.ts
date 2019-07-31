import { Directive, Input, HostListener } from "@angular/core";
import { ScheduleTimeSlot } from "../../model/logger-schedule.model";
import { LoggerScheduleCalendarComponent } from "../logger-schedule-calendar.component";

@Directive({ selector: '[selectableSlot]'})
export class SelectableSlotDirective {
    @Input('selectableSlot') public selectableSlot: ScheduleTimeSlot;
    
    constructor(
        private scheduleComponent: LoggerScheduleCalendarComponent
    ) { }

    @HostListener('mousedown', ['$event'])
    public onMouseDown(event: MouseEvent) {
        if (!event.button) {
            this.scheduleComponent.handleMouseDown(this.selectableSlot);
            event.preventDefault();
        }
    }

    @HostListener('mouseenter', ['$event'])
    public onMouseEnter(event: Event) {
        this.scheduleComponent.handleMouseEnter(this.selectableSlot);
        event.preventDefault();
    }

    @HostListener('mouseup', ['$event'])
    public onMouseUp(event: Event) {
        this.scheduleComponent.handleMouseUp(this.selectableSlot);
        event.preventDefault();
    }
}