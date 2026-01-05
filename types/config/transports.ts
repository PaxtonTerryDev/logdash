import { LogSegment } from "../../log.ts";
import { LogTransports } from "../../transports.ts";
import type * as CSS from "csstype";

export interface LogDashTransportsConfig {
  [LogTransports.STDOUT]?: StdoutConfig;
  [LogTransports.FILE]?: FileTransportConfig;
  [LogTransports.JSON]?: JSONTransportConfig;
}

interface TransportConfig {
  enabled: true;
  output?: Record<Partial<LogSegment>, boolean>;
}

interface StdoutConfig extends TransportConfig {
  colors: {
    enabled?: boolean;
    segments?: Record<Partial<LogSegment>, CSS.Properties>;
  };
}

const defaultStdoutConfig: Required<StdoutConfig> = {
  enabled: true,
  colors: {
    enabled: true,
    segments: {
      [LogSegment.TIMESTAMP]: {},
      [LogSegment.LEVEL]: {},
      [LogSegment.PREFIX]: {},
      [LogSegment.MESSAGE]: {},
      [LogSegment.METADATA]: {},
    },
  },
  output: {
    [LogSegment.TIMESTAMP]: false,
    [LogSegment.LEVEL]: true,
    [LogSegment.PREFIX]: true,
    [LogSegment.MESSAGE]: true,
    [LogSegment.METADATA]: false,
  },
};

interface FileTransportConfig extends TransportConfig {}

interface JSONTransportConfig extends TransportConfig {}

export const defaultTransportConfig: Required<LogDashTransportsConfig> = {};
