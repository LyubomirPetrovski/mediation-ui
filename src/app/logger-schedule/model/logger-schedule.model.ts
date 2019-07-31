import { MonikerRef } from "src/app/shared/entities/moniker-ref.entity";

export interface LoggerScheduleModel {
    logger: MonikerRef,
    maxGames: number,

    timeSlots: ScheduleTimeSlot[];
}

export interface ScheduleTimeSlot {
    /* In the form hh:mm AM/PM */
    id: string;

    from: Time12h,
    to: Time12h,

    available: boolean,
    onShift: boolean,
    selected: boolean,
    gameRef: MonikerRef,

    changeStatus: ChangeStatus
}

/* 12h Time Format */
export interface Time12h {
    hour: number;
    minute: number;
    /* AM/PM */
    meridiemAbbr: string;
}

export enum ChangeStatus {
    Unmodified = 0,
  
    Assigned,
    Unassigned,
    GameRemoved
}
