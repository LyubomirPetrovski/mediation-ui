import { MonikerRef } from "src/app/shared/entities/moniker-ref.entity";

export interface ScheduleModel {
    scheduleState: ScheduleState,
    loggers: LoggerScheduleModel[]
}

export interface LoggerScheduleModel {
    logger: MonikerRef,
    maxGames: number,

    timeSlots: ScheduleTimeSlot[];
}

export interface ScheduleTimeSlot {
    /* In the form hhmm */
    id: string;
    /* Mongo id */
    shiftId: string;
    loggerId: string,
    gameRef: MonikerRef,

    from: Time24h,
    to: Time24h,

    available: boolean,
    onShift: boolean,
    selected: boolean,

    changeStatus: ChangeStatus
}

export interface Time24h {
    hour: number;
    minute: number;
}

export enum ChangeStatus {
    Unmodified = 0,
  
    Assigned,
    Unassigned,
    GameRemoved
}

export enum ScheduleState {
    Unknown,

    Append,
    Reload
}
