import type { LogDashConfigRootDef } from "./types/config/logdash.ts";
import { LogLevel, LogSegment } from "./log.ts";

export default {
  development: {
    transports: {
      stdout: {
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
      stdout: {
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
