import { SlotNumber } from './slot-numbers.model';
import { Time24h } from './logger-schedule.model';
import { MonikerRef } from 'src/app/shared/entities/moniker-ref.entity';
import { DocumentRef } from 'src/app/shared/entities/document-ref.entity';

export interface LoggerScheduleEntity {
    numbers: SlotNumber[];
    loggers: LoggerSchedule[];
}

export interface LoggerSchedule {
    loggerRef: MonikerRef;

    maxGames: number;
    slots: ScheduleTimeSlot[];
}

export interface ScheduleTimeSlot {
    from: Time24h;
    to: Time24h;
    available: boolean;
    shift: LoggerShiftRef;
}

export interface LoggerShiftRef {
    id: string;
    game: LoggingGameRef;
}

export interface LoggingGameRef extends MonikerRef {
    sportRef: DocumentRef;
    leagueRef: DocumentRef;
}
