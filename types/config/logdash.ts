import { defaultTransportConfig, LogDashTransportsConfig } from "./transports.ts";

export type EnvSpecifier = string;

export type LogDashConfigRootDef = Record<EnvSpecifier, LogDashConfig>;

export type DefaultLogDashConfigRootDef = Record<
  EnvSpecifier,
  Required<LogDashConfig>
>;

interface SeparatorConfig {
  enabled?: boolean;
  value?: string;
}

const defaultSeparatorConfig: Required<SeparatorConfig> = {
  enabled: true,
  value: "\n"
}

export interface LogDashConfig {
  separator?: SeparatorConfig;
 transports?: LogDashTransportsConfig;
}

const defaultCfg: Required<LogDashConfig> = {
  separator: defaultSeparatorConfig,
  transports: defaultTransportConfig,
};

export const defaultRootCfg: DefaultLogDashConfigRootDef = {
  development: defaultCfg,
  staging: defaultCfg,
  production: defaultCfg,
};


