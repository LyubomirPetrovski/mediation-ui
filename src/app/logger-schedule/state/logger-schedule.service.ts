import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { LoggerScheduleEntity } from "../model/logger-schedule.entity";

@Injectable({
    providedIn: 'root'
  })
  export class LoggerScheduleService {
    public getDailySchedule(): Observable<LoggerScheduleEntity> {
        return of(this.getTestResult());
    }

    private getTestResult(): LoggerScheduleEntity {
        return {
              numbers: [],
              loggers: [
                {
                  loggerName: "Ljubomir Jerinic",
                  maxGames: 8,
                  slots: [
                    {
                      from: { hour: 12, minute: 0 },
                      to: { hour: 12, minute: 30 },
                      available: true,
                      shift: null
                    },
                    {
                      from: { hour: 12, minute: 30 },
                      to: { hour: 1, minute: 0 },
                      available: false,
                      shift: {
                        id: null,
                        game: {
                          id: "5d3ec04f385ca16f44ab4dfb",
                          name: "Virginia Military Institute@Western Carolina University",
                          abbr: null,
                          iid: 0,
                          sportRef: null,
                          leagueRef: null,                      
                        }
                      }
                    },
                    {
                      from: { hour: 1, minute: 0 },
                      to: { hour: 1, minute: 30 },
                      available: false,
                      shift: {
                        id: null,
                        game: {
                          id: "5d3ec04f385ca16f44ab4dfb",
                          name: "Virginia Military Institute@Western Carolina University",
                          abbr: null,
                          iid: 0,
                          sportRef: null,
                          leagueRef: null,                      
                        }
                      }
                    },
                    {
                      from: { hour: 1, minute: 30 },
                      to: { hour: 2, minute: 0 },
                      available: false,
                      shift: {
                        id: null,
                        game: {
                          id: "5d3ec04f385ca16f44ab4dfb",
                          name: "Virginia Military Institute@Western Carolina University",
                          abbr: null,
                          iid: 0,
                          sportRef: null,
                          leagueRef: null,                      
                        }
                      }
                    },
                    {
                      from: { hour: 2, minute: 0 },
                      to: { hour: 2, minute: 30 },
                      available: false,
                      shift: {
                        id: null,
                        game: {
                          id: "5d3ec04f385ca16f44ab4dfb",
                          name: "Virginia Military Institute@Western Carolina University",
                          abbr: null,
                          iid: 0,
                          sportRef: null,
                          leagueRef: null,                      
                        }
                      }
                    },
                    {
                      from: { hour: 2, minute: 30 },
                      to: { hour: 3, minute: 0 },
                      available: false,
                      shift: {
                        id: null,
                        game: {
                          id: "5d3ec04f385ca16f44ab4dfb",
                          name: "Virginia Military Institute@Western Carolina University",
                          abbr: null,
                          iid: 0,
                          sportRef: null,
                          leagueRef: null,                      
                        }
                      }
                    },
                    {
                      from: { hour: 3, minute: 0 },
                      to: { hour: 3, minute: 30 },
                      available: false,
                      shift: {
                        id: null,
                        game: {
                          id: "5d3ec04f385ca16f44ab4dfb",
                          name: "Virginia Military Institute@Western Carolina University",
                          abbr: null,
                          iid: 0,
                          sportRef: null,
                          leagueRef: null,                      
                        }
                      }
                    },
                    {
                      from: { hour: 3, minute: 30 },
                      to: { hour: 4, minute: 0 },
                      available: false,
                      shift: {
                        id: null,
                        game: {
                          id: "5d3ec04f385ca16f44ab4dfb",
                          name: "Virginia Military Institute@Western Carolina University",
                          abbr: null,
                          iid: 0,
                          sportRef: null,
                          leagueRef: null,                      
                        }
                      }
                    },
                    {
                      from: { hour: 4, minute: 0 },
                      to: { hour: 4, minute: 30 },
                      available: false,
                      shift: {
                        id: null,
                        game: {
                          id: "5d3ec04f385ca16f44ab4dfb",
                          name: "Virginia Military Institute@Western Carolina University",
                          abbr: null,
                          iid: 0,
                          sportRef: null,
                          leagueRef: null,                      
                        }
                      }
                    }            
                  ]
                },
                {
                  loggerName: "Perica Jovanovic",
                  maxGames: 7,
                  slots: [
                    {
                      from: { hour: 12, minute: 0 },
                      to: { hour: 12, minute: 30 },
                      available: false,
                        shift: {
                          id: null,
                          game: {
                            id: "5d3ec04f385ca16f44ab4dfb",
                            name: "Virginia Military Institute@Western Carolina University",
                            abbr: null,
                            iid: 0,
                            sportRef: null,
                            leagueRef: null,                      
                          }
                        }
                    },
                    {
                      from: { hour: 12, minute: 30 },
                      to: { hour: 1, minute: 0 },
                      available: false,
                        shift: {
                          id: null,
                          game: {
                            id: "5d3ec04f385ca16f44ab4dfb",
                            name: "Virginia Military Institute@Western Carolina University",
                            abbr: null,
                            iid: 0,
                            sportRef: null,
                            leagueRef: null,                      
                          }
                        }
                    }
                  ]
                }          
              ]
          }
      }
  }