import {
  createLogger,
  type LogDashConfigRootDef,
  LogLevel,
  LogSegment,
  LogTransports,
} from "./main.ts";

const logger = createLogger(
  {
    development: {
      transports: {
        [LogTransports.STDOUT]: {
          enabled: true,
          colors: {
            [LogLevel.INFO]: {
              [LogSegment.LEVEL]: { backgroundColor: "green", color: "white" },
            },
          },
        },
      },
    },
    production: {
      forceInline: true,
      transports: {
        [LogTransports.STDOUT]: {
          enabled: false,
        },
        [LogTransports.FILE]: {
          enabled: true,
          splitMethod: "date",
          schedule: "0 0 * * *",
        },
      },
    },
  } satisfies LogDashConfigRootDef,
);

console.log("Logger initialized:", logger.development.transports);
