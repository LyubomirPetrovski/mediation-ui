import { MonikerRef } from "src/app/shared/entities/moniker-ref.entity";

export interface LoggerScheduleModel {
    logger: MonikerRef,
    maxGames: number,

    timeSlots: ScheduleTimeSlot[];
}

export interface ScheduleTimeSlot {
    /* In the form hh:mm AM/PM */
    id: string;

    from: Time,
    to: Time,

    available: boolean,
    onShift: boolean,
    selected: boolean,
    gameRef: MonikerRef
}

export interface Time {
    hour: number;
    minute: number;
}
