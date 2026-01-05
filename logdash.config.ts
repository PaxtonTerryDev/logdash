import type { LogDashConfigRootDef } from "./types/config/logdash.ts";
import { LogLevel, LogSegment } from "./log.ts";
import { LogTransports } from "./transports.ts";

export default {
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
      file: {
        enabled: true,
        splitMethod: "date",
        schedule: "0 0 * * *",
      },
    },
  },
} satisfies LogDashConfigRootDef;
