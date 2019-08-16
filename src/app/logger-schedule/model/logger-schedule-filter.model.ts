import * as moment from 'moment';
import { LoggingGroupType } from './dto/get-logging-schedule.query';
import { ScheduleState } from './logger-schedule.model';

export class LoggerScheduleFitler {
    scheduleDay: string;
    sportId: string;
    leagueId: string;
    phaseIds: LoggingGroupType[];
    timezoneId: string;
    scheduleState: ScheduleState;
    skip: number;
    take: number;

    public uqh: string = null;

    public static get Default() : LoggerScheduleFitler {
        return <LoggerScheduleFitler>{
            scheduleDay: moment().format('YYYY-MM-DD'),
            timezoneId: "5b89299696013ebdd2c3c102", // EST
            sportId: null,
            leagueId: null,
            skip: 0,
            take: 50,
            phaseIds: [LoggingGroupType.ActiveP1]
        }
    }
}
