import { LogDashConfigRootDef } from "./types/config/logdash.ts";

export enum LogLevel {
  DEBUG = 0,
  TRACE = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  FATAL = 5,
}

export enum LogSegment {
  TIMESTAMP,
  LEVEL,
  PREFIX,
  MESSAGE,
  METADATA,
}

interface LogProps {
  level: LogLevel;
  timestamp?: Date;
  message: string;
  metadata: unknown;
}

export class Logger {
  config: LogDashConfigRootDef;

  constructor(config: LogDashConfigRootDef) {
    this.config = config;
  }
}


