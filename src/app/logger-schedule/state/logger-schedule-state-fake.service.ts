import { Injectable } from "@angular/core";

import { LoggerScheduleService } from "./logger-schedule.service";

import { first } from "rxjs/operators";
import { LoggerSchedule } from "../model/logger-schedule.entity";
import { LoggerScheduleModel, ScheduleTimeSlot, ScheduleModel } from "../model/logger-schedule.model";
import { MonikerRef } from "src/app/shared/entities/moniker-ref.entity";
import { BehaviorSubject, Subject } from "rxjs";
import * as moment from "moment"
import { LoggerScheduleFitler } from "../model/logger-schedule-filter.model";

@Injectable({
    providedIn: 'root'
  })
export class LoggerScheduleStateService {
    private dailyScheduleSubject = new BehaviorSubject<ScheduleModel>(null);
    private loggersCountSubject = new BehaviorSubject<number>(0);
    private submittedSubject = new Subject();
    
    public get dailySchedule$() {
        return this.dailyScheduleSubject.asObservable();
    }

    public get loggersCount$() {
      return this.loggersCountSubject.asObservable();
    }

    public get submitted$() {
      return this.submittedSubject.asObservable();
    }

    constructor(
        private loggerScheduleService: LoggerScheduleService
    ) {}

    public getDailySchedulePaged(filter: LoggerScheduleFitler) {
        this.loggerScheduleService.getDailySchedulePaged(filter).pipe(
            first()
        ).subscribe(res => {
          const scheduleList = this.toViewModel(res.result[0].loggers);
          const numbersList = res.result[0].numbers.sort((a,b) => { return a.numberKind - b.numberKind });
    
          this.dailyScheduleSubject.next(<ScheduleModel>{
            scheduleState: filter.scheduleState,
            loggers: scheduleList
          });
          // this.slotNumberSubject.next(numbersList);
          this.loggersCountSubject.next(res.totalRecords);
        })
    }

    private toViewModel(entityList: LoggerSchedule[]): LoggerScheduleModel[] {
      if (entityList == null) { return null; }
  
      return entityList.map(ent => <LoggerScheduleModel>{
        logger: ent.loggerRef,
        maxGames: ent.maxGames,
        timeSlots: ent.slots.map(slot => <ScheduleTimeSlot>{
          id: moment(`${slot.from.hour}:${slot.from.minute}`, "HHmm").format("HHmm"),
          from: slot.from,
          to: slot.to,
          available: slot.available,
          onShift: !!slot.shift,
          gameRef: <MonikerRef>{
            id: slot.shift && slot.shift.game && slot.shift.game.id || null,
            name: slot.shift && slot.shift.game && slot.shift.game.name || null
          },
          loggerId: ent.loggerRef.id,
          shiftId: slot.shift && slot.shift.id || null
        })
      });
    }
}