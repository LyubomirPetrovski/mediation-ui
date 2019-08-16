import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { LoggerScheduleEntity } from "../model/logger-schedule.entity";
import { ApiService } from "src/app/shared/services/api.service";
import { GetLoggingScheduleQuery } from "../model/dto/get-logging-schedule.query";
import { LoggerScheduleFitler } from "../model/logger-schedule-filter.model";

@Injectable({
    providedIn: 'root'
  })
  export class LoggerScheduleService {
    // public getDailyScheduleTest(): Observable<LoggerScheduleEntity> {
    //     return of(this.getTestResult());
    // }

    constructor(private apiService: ApiService) { }

    public getDailySchedulePaged(filter: LoggerScheduleFitler): Observable<PagedResponse<LoggerScheduleEntity>> {
      const query = <GetLoggingScheduleQuery>{
        timezoneId: filter.timezoneId,
        day: filter.scheduleDay,
        gameLoggingTypes: filter.phaseIds,
        sportId: filter.sportId,
        leagueId: filter.leagueId,
        skip: filter.skip,
        take: filter.take
      };
  
      return this.apiService.get(API_LOGGER_SCHEDULE_GET_SHIFTS_PAGED_URL, query);
  }

    // private getTestResult(): LoggerScheduleEntity {
    //     return {
    //           numbers: [],
    //           loggers: [
    //             {
    //               loggerName: "Ljubomir Jerinic",
    //               maxGames: 8,
    //               slots: [
    //                 {
    //                   from: { hour: 12, minute: 0 },
    //                   to: { hour: 12, minute: 30 },
    //                   available: true,
    //                   shift: null
    //                 },
    //                 {
    //                   from: { hour: 12, minute: 30 },
    //                   to: { hour: 1, minute: 0 },
    //                   available: false,
    //                   shift: {
    //                     id: null,
    //                     game: {
    //                       id: "5d3ec04f385ca16f44ab4dfb",
    //                       name: "Virginia Military Institute@Western Carolina University",
    //                       abbr: null,
    //                       iid: 0,
    //                       sportRef: null,
    //                       leagueRef: null,                      
    //                     }
    //                   }
    //                 },
    //                 {
    //                   from: { hour: 13, minute: 0 },
    //                   to: { hour: 13, minute: 30 },
    //                   available: false,
    //                   shift: {
    //                     id: null,
    //                     game: {
    //                       id: "5d3ec04f385ca16f44ab4dfb",
    //                       name: "Virginia Military Institute@Western Carolina University",
    //                       abbr: null,
    //                       iid: 0,
    //                       sportRef: null,
    //                       leagueRef: null,                      
    //                     }
    //                   }
    //                 },
    //                 {
    //                   from: { hour: 13, minute: 30 },
    //                   to: { hour: 14, minute: 0 },
    //                   available: false,
    //                   shift: {
    //                     id: null,
    //                     game: {
    //                       id: "5d3ec04f385ca16f44ab4dfb",
    //                       name: "Virginia Military Institute@Western Carolina University",
    //                       abbr: null,
    //                       iid: 0,
    //                       sportRef: null,
    //                       leagueRef: null,                      
    //                     }
    //                   }
    //                 },
    //                 {
    //                   from: { hour: 14, minute: 0 },
    //                   to: { hour: 14, minute: 30 },
    //                   available: false,
    //                   shift: {
    //                     id: null,
    //                     game: {
    //                       id: "5d3ec04f385ca16f44ab4dfb",
    //                       name: "Virginia Military Institute@Western Carolina University",
    //                       abbr: null,
    //                       iid: 0,
    //                       sportRef: null,
    //                       leagueRef: null,                      
    //                     }
    //                   }
    //                 },
    //                 {
    //                   from: { hour: 14, minute: 30 },
    //                   to: { hour: 15, minute: 0 },
    //                   available: false,
    //                   shift: {
    //                     id: null,
    //                     game: {
    //                       id: "5d3ec04f385ca16f44ab4dfb",
    //                       name: "Virginia Military Institute@Western Carolina University",
    //                       abbr: null,
    //                       iid: 0,
    //                       sportRef: null,
    //                       leagueRef: null,                      
    //                     }
    //                   }
    //                 },
    //                 {
    //                   from: { hour: 15, minute: 0 },
    //                   to: { hour: 15, minute: 30 },
    //                   available: false,
    //                   shift: {
    //                     id: null,
    //                     game: {
    //                       id: "5d3ec04f385ca16f44ab4dfb",
    //                       name: "Virginia Military Institute@Western Carolina University",
    //                       abbr: null,
    //                       iid: 0,
    //                       sportRef: null,
    //                       leagueRef: null,                      
    //                     }
    //                   }
    //                 },
    //                 {
    //                   from: { hour: 15, minute: 30 },
    //                   to: { hour: 16, minute: 0 },
    //                   available: false,
    //                   shift: {
    //                     id: null,
    //                     game: {
    //                       id: "5d3ec04f385ca16f44ab4dfb",
    //                       name: "Virginia Military Institute@Western Carolina University",
    //                       abbr: null,
    //                       iid: 0,
    //                       sportRef: null,
    //                       leagueRef: null,                      
    //                     }
    //                   }
    //                 },
    //                 {
    //                   from: { hour: 16, minute: 0 },
    //                   to: { hour: 16, minute: 30 },
    //                   available: false,
    //                   shift: {
    //                     id: null,
    //                     game: {
    //                       id: "5d3ec04f385ca16f44ab4dfb",
    //                       name: "Virginia Military Institute@Western Carolina University",
    //                       abbr: null,
    //                       iid: 0,
    //                       sportRef: null,
    //                       leagueRef: null,                      
    //                     }
    //                   }
    //                 }            
    //               ]
    //             },
    //             {
    //               loggerName: "Perica Jovanovic",
    //               maxGames: 7,
    //               slots: [
    //                 {
    //                   from: { hour: 12, minute: 0 },
    //                   to: { hour: 12, minute: 30 },
    //                   available: false,
    //                     shift: {
    //                       id: null,
    //                       game: {
    //                         id: "5d3ec04f385ca16f44ab4dfb",
    //                         name: "Virginia Military Institute@Western Carolina University",
    //                         abbr: null,
    //                         iid: 0,
    //                         sportRef: null,
    //                         leagueRef: null,                      
    //                       }
    //                     }
    //                 },
    //                 {
    //                   from: { hour: 12, minute: 30 },
    //                   to: { hour: 1, minute: 0 },
    //                   available: false,
    //                     shift: {
    //                       id: null,
    //                       game: {
    //                         id: "5d3ec04f385ca16f44ab4dfb",
    //                         name: "Virginia Military Institute@Western Carolina University",
    //                         abbr: null,
    //                         iid: 0,
    //                         sportRef: null,
    //                         leagueRef: null,                      
    //                       }
    //                     }
    //                 }
    //               ]
    //             }          
    //           ]
    //       }
    //   }
  }

  export const API_LOGGER_SCHEDULE_URL = '/operations/api/loggers-schedule';
  export const API_LOGGER_SCHEDULE_GET_SHIFTS_PAGED_URL = `${API_LOGGER_SCHEDULE_URL}/daily-unpaged`

  export interface ApiResponseBase {
    failed: boolean;
    errors: string[];
  }
  
  export interface PagedResponse<T> extends ApiResponseBase {
    result: T[];
    totalRecords: number;
  }