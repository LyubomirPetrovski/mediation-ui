export interface GetLoggingScheduleQuery {
  timezoneId: string;
  day: string,
  sportId: string,
  leagueId: string,
  gameLoggingTypes: LoggingGroupType[],
  skip: number,
  take: number
}

export enum LoggingGroupType {
  Unknown = 0,

  ActiveP1,
  ActiveP2,
  TrainingP1,
  TrainingP2,
  Admin,
  PlayerMinutes,
  Retired,
  Test
}
  