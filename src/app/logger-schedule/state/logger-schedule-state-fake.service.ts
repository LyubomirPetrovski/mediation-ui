import { Injectable } from "@angular/core";

import { LoggerScheduleService } from "./logger-schedule.service";

import { first } from "rxjs/operators";
import { LoggerSchedule } from "../model/logger-schedule.entity";
import { LoggerScheduleModel, ScheduleTimeSlot } from "../model/logger-schedule.model";
import { MonikerRef } from "src/app/shared/entities/moniker-ref.entity";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class LoggerScheduleStateService {
    private dailyScheduleSubject = new BehaviorSubject<LoggerScheduleModel[]>([]);
    
    public get dailySchedule$() {
        return this.dailyScheduleSubject.asObservable();
    }

    constructor(
        private loggerScheduleService: LoggerScheduleService
    ) {}

    public getDailySchedule() {
        this.loggerScheduleService.getDailySchedule().pipe(
            first()
        ).subscribe(res => {
            const modelList = this.toViewModel(res.loggers);

            this.dailyScheduleSubject.next(modelList);
            // this.slotNumberSubject.next(res.result.numbers);
            // TODO
            // this.loggersCountSubject.next(res.totalRecords);
        })
    }

    private toViewModel(entityList: LoggerSchedule[]): LoggerScheduleModel[] {
        if (entityList == null) { return null; }
    
        return entityList.map(ent => <LoggerScheduleModel>{
          logger: <MonikerRef>{
            name: ent.loggerName
          },
          maxGames: ent.maxGames,
          timeSlots: ent.slots.map(slot => <ScheduleTimeSlot>{
            from: slot.from,
            to: slot.to,
            available: slot.available,
            onShift: slot.shift !== null,
            gameRef: <MonikerRef>{
              id: slot.shift && slot.shift.game && slot.shift.game.id || null,
              name: slot.shift && slot.shift.game && slot.shift.game.name || null
            }
          })
        });
      }
}