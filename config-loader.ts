import { ConfigValidationError } from "./errors.ts";
import { LogTransports } from "./transports.ts";
import {
  defaultRootCfg,
  type LogDashConfigRootDef,
} from "./types/config/logdash.ts";
import { join } from "jsr:@std/path";

export class JSONConfigLoader<T> {
  public load(cfgPath: string, validator?: (cfg: T) => void): T {
    const buf = Deno.readFileSync(cfgPath);
    const str = new TextDecoder().decode(buf);
    const cfg = JSON.parse(str);

    if (validator) {
      try {
        validator(cfg);
      } catch (error) {
        throw new ConfigValidationError(
          "Provided config failed validation",
          error as Error,
        );
      }
    }
    return cfg as T;
  }
}

function deepMerge<T extends Record<string, unknown>>(
  target: T,
  source: Partial<T>,
): T {
  const result = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (
      sourceValue && typeof sourceValue === "object" &&
      !Array.isArray(sourceValue) &&
      targetValue && typeof targetValue === "object" &&
      !Array.isArray(targetValue)
    ) {
      result[key] = deepMerge(
        targetValue as Record<string, unknown>,
        sourceValue as Record<string, unknown>,
      ) as T[Extract<keyof T, string>];
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue as T[Extract<keyof T, string>];
    }
  }

  return result;
}

export async function loadConfig(
  configPath?: string,
): Promise<LogDashConfigRootDef> {
  const configFile = configPath || join(Deno.cwd(), "logdash.config.ts");

  try {
    const module = await import(configFile);
    const userConfig = module.default as Partial<LogDashConfigRootDef>;

    return deepMerge(defaultRootCfg, userConfig);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cannot resolve")) {
      return defaultRootCfg;
    }
    throw error;
  }
}
