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
        
      },
    },
  } satisfies LogDashConfigRootDef,
);

export default logger;
