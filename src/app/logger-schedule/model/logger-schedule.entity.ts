import { SlotNumber } from './slot-numbers.model';
import { MonikerRef } from 'src/app/shared/entities/moniker-ref.entity';
import { DocumentRef } from 'src/app/shared/entities/document-ref.entity';

export interface LoggerScheduleEntity {
    numbers: SlotNumber[];
    loggers: LoggerSchedule[];
}

export interface LoggerSchedule {
    loggerName: string;

    maxGames: number;
    slots: ScheduleTimeSlot[];
}

export interface ScheduleTimeSlot {
    from: Time;
    to: Time
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

export interface Time {
    hour: number;
    minute: number;
}
