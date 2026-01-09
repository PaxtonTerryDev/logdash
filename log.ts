import { deepMerge } from "./lib/utils/deep-merge.ts";
import { defaultRootCfg, LogDashConfigRootDef } from "./types/config/logdash.ts";

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

interface Log<T> {
  id: string;
  level: LogLevel;
  timestamp: Date;
  identifiers: string[];
  message: string;
  metadata: T;
}

export class Logger {
  private config: LogDashConfigRootDef

  constructor(config?: Partial<LogDashConfigRootDef>) {
    this.config = this.createLoggerConfig(config)
  }

  private createLoggerConfig(config?: Partial<LogDashConfigRootDef>) {
    if (!config) return defaultRootCfg;
  return deepMerge(defaultRootCfg, config);
  }


}


