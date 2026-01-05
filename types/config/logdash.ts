import { defaultTransportConfig, LogDashTransportsConfig } from "./transports.ts";

export type EnvSpecifier = string;

export type LogDashConfigRootDef = Record<EnvSpecifier, LogDashConfig>;

type DefaultLogDashConfigRootDef = Record<
  EnvSpecifier,
  Required<LogDashConfig>
>;

export interface LogDashConfig {
 forceInline?: boolean;
 transports?: LogDashTransportsConfig;
}

const defaultCfg: Required<LogDashConfig> = {
  forceInline: false,
  transports: defaultTransportConfig,
};

export const defaultRootCfg: DefaultLogDashConfigRootDef = {
  development: defaultCfg,
  staging: defaultCfg,
  production: defaultCfg,
};


