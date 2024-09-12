export interface LoggerRecord {
  date: Date;
  message: string;
}

export interface LoggerStateInterface {
  records: LoggerRecord[];
};
