type EnvSpecifier = string;

type LogDashConfigRootDef = Record<EnvSpecifier, LogDashConfig>;

type DefaultLogDashConfigRootDef = Record<
  EnvSpecifier,
  Required<LogDashConfig>
>;

interface LogDashConfig {
  forceInline?: boolean;
}

const defaultCfg: Required<LogDashConfig> = {
  forceInline: false,
};

const defaultRootCfg: DefaultLogDashConfigRootDef = {
  development: defaultCfg,
  staging: defaultCfg,
  production: defaultCfg,
};


