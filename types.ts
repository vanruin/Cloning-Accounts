
export enum LogType {
  OK = 'ok',
  CP = 'cp',
  ERROR = 'error',
  INFO = 'info',
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: LogType;
}

export type CloningMethod = 'old_one' | 'old_tow' | 'old_tree';
