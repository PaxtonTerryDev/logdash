import { LogLevel, LogSegment } from "../../log.ts";
import { LogTransports } from "../../transports.ts";
import type * as CSS from "csstype";

export interface LogDashTransportsConfig {
  [LogTransports.STDOUT]?: StdoutTransportConfig;
  [LogTransports.FILE]?: FileTransportConfig;
  [LogTransports.JSON]?: JSONTransportConfig;
}

interface TransportConfig {
  enabled: boolean;
  levels?: Record<LogLevel, boolean>;
  segments?: Record<LogSegment, boolean>;
}

interface StdoutTransportConfig extends TransportConfig {
  colors?: Partial<
    Record<
      LogLevel,
      Partial<Record<LogSegment, CSS.Properties>>
    >
  >;
}

const defaultStdoutTransportConfig: Required<StdoutTransportConfig> = {
  enabled: true,
  colors: {
    [LogLevel.DEBUG]: {
      [LogSegment.TIMESTAMP]: {},
      [LogSegment.LEVEL]: { backgroundColor: "gray", color: "white" },
      [LogSegment.PREFIX]: { color: "gray" },
      [LogSegment.MESSAGE]: {},
      [LogSegment.METADATA]: {},
    },
    [LogLevel.TRACE]: {
      [LogSegment.TIMESTAMP]: {},
      [LogSegment.LEVEL]: { backgroundColor: "lightgray", color: "black" },
      [LogSegment.PREFIX]: { color: "lightgray" },
      [LogSegment.MESSAGE]: {},
      [LogSegment.METADATA]: {},
    },
    [LogLevel.INFO]: {
      [LogSegment.TIMESTAMP]: {},
      [LogSegment.LEVEL]: { backgroundColor: "blue", color: "white" },
      [LogSegment.PREFIX]: { color: "blue" },
      [LogSegment.MESSAGE]: {},
      [LogSegment.METADATA]: {},
    },
    [LogLevel.WARN]: {
      [LogSegment.TIMESTAMP]: {},
      [LogSegment.LEVEL]: { backgroundColor: "orange", color: "white" },
      [LogSegment.PREFIX]: { color: "orange" },
      [LogSegment.MESSAGE]: {},
      [LogSegment.METADATA]: {},
    },
    [LogLevel.ERROR]: {
      [LogSegment.TIMESTAMP]: {},
      [LogSegment.LEVEL]: { backgroundColor: "red", color: "white" },
      [LogSegment.PREFIX]: { color: "red" },
      [LogSegment.MESSAGE]: {},
      [LogSegment.METADATA]: {},
    },
    [LogLevel.FATAL]: {
      [LogSegment.TIMESTAMP]: {},
      [LogSegment.LEVEL]: { backgroundColor: "darkred", color: "white" },
      [LogSegment.PREFIX]: { color: "magenta" },
      [LogSegment.MESSAGE]: {},
      [LogSegment.METADATA]: {},
    },
  },
  levels: {
    [LogLevel.DEBUG]: true,
    [LogLevel.TRACE]: true,
    [LogLevel.INFO]: true,
    [LogLevel.WARN]: true,
    [LogLevel.ERROR]: true,
    [LogLevel.FATAL]: true,
  },
  segments: {
    [LogSegment.TIMESTAMP]: false,
    [LogSegment.LEVEL]: true,
    [LogSegment.PREFIX]: true,
    [LogSegment.MESSAGE]: true,
    [LogSegment.METADATA]: false,
  },
};

type FileSplitMethod = "date" | "size";

// TODO: There is probably a pretty slick way to pass in a lambda that sets up the storage directories.

interface FileTransportConfigBase extends TransportConfig {
  outdir?: string;
  splitMethod?: FileSplitMethod;
}

interface FileTransportConfigDateSplit extends FileTransportConfigBase {
  splitMethod: "date";
  /** Should be a valid cron string */
  schedule: string;
}

type SizeSplitNamingType = "uuid" | "increment";

interface FileTransportConfigSizeSplitBase extends FileTransportConfigBase {
  splitMethod: "size";
  /** Maximum size (Mb) of the file before splitting */
  size?: number;
}

interface FileTransportConfigSizeSplitUUID
  extends FileTransportConfigSizeSplitBase {
  naming: {
    type: "uuid";
  };
}

interface FileTransportConfigSizeSplitIncrement
  extends FileTransportConfigSizeSplitBase {
  naming: {
    type: "increment";
    baseFileName?: string;
  };
}

type FileTransportConfigSizeSplit =
  | FileTransportConfigSizeSplitUUID
  | FileTransportConfigSizeSplitIncrement;

type FileTransportConfig =
  | FileTransportConfigDateSplit
  | FileTransportConfigSizeSplit;

const defaultFileTransportConfig: Required<FileTransportConfig> = {
  enabled: false,
  segments: {
    [LogSegment.TIMESTAMP]: true,
    [LogSegment.LEVEL]: true,
    [LogSegment.PREFIX]: true,
    [LogSegment.MESSAGE]: true,
    [LogSegment.METADATA]: false,
  },
  levels: {
    [LogLevel.DEBUG]: true,
    [LogLevel.TRACE]: true,
    [LogLevel.INFO]: true,
    [LogLevel.WARN]: true,
    [LogLevel.ERROR]: true,
    [LogLevel.FATAL]: true,
  },
  outdir: "logs/",
  splitMethod: "date",
  schedule: "* * 1 * *",
};

interface JSONTransportConfig extends TransportConfig {
  endpoint: string;
  headers: [string, string][];
  body: [string, string][];
}

const defaultJSONTransportConfig: Required<JSONTransportConfig> = {
  enabled: false,
  segments: {
    [LogSegment.TIMESTAMP]: true,
    [LogSegment.LEVEL]: true,
    [LogSegment.PREFIX]: true,
    [LogSegment.MESSAGE]: true,
    [LogSegment.METADATA]: true,
  },
  levels: {
    [LogLevel.DEBUG]: true,
    [LogLevel.TRACE]: true,
    [LogLevel.INFO]: true,
    [LogLevel.WARN]: true,
    [LogLevel.ERROR]: true,
    [LogLevel.FATAL]: true,
  },
  endpoint: "",
  headers: [],
  body: [],
};

export const defaultTransportConfig: Required<LogDashTransportsConfig> = {
  [LogTransports.STDOUT]: defaultStdoutTransportConfig,
  [LogTransports.FILE]: defaultFileTransportConfig,
  [LogTransports.JSON]: defaultJSONTransportConfig,
};
