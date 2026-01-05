export { createLogger, loadConfigFromFile } from "./config-loader.ts";
export type {
  LogDashConfig,
  LogDashConfigRootDef,
} from "./types/config/logdash.ts";
export type { LogDashTransportsConfig } from "./types/config/transports.ts";
export { LogLevel, LogSegment } from "./log.ts";
export { LogTransports } from "./transports.ts";
import log from './create-logger-example.ts'

console.log(log.config)
