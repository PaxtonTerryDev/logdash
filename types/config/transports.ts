import { LogSegment } from "../../log.ts";
import { LogTransports } from "../../transports.ts";
import type * as CSS from "csstype";

interface LogDashTransportsConfig {
  [LogTransports.STDOUT]: StdoutConfig;
  [LogTransports.FILE]: FileTransportConfig;
  [LogTransports.JSON]: JSONTransportConfig;
}

interface TransportConfig {
  enabled: true;
}

interface StdoutConfig extends TransportConfig {
  colors: {
    enabled?: boolean;
    segments?: Record<keyof LogSegment, CSS.Properties>;
  };
}

interface FileTransportConfig extends TransportConfig {}

interface JSONTransportConfig extends TransportConfig {}
