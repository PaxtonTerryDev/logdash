import { Log } from "./log.ts";
import { defaultRootCfg, type LogDashConfigRootDef } from "./types/config/logdash.ts";
import { join } from "jsr:@std/path";

function deepMerge<T extends Record<string, unknown>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = result[key];

    if (sourceValue && typeof sourceValue === "object" && !Array.isArray(sourceValue) &&
        targetValue && typeof targetValue === "object" && !Array.isArray(targetValue)) {
      result[key] = deepMerge(targetValue as Record<string, unknown>, sourceValue as Record<string, unknown>) as T[Extract<keyof T, string>];
    } else if (sourceValue !== undefined) {
      result[key] = sourceValue as T[Extract<keyof T, string>];
    }
  }

  return result;
}

export function createLogger(config?: Partial<LogDashConfigRootDef>): Log {
  if (!config) {
    return new Log(defaultRootCfg);
  }
  return new Log(deepMerge(defaultRootCfg, config));
}

export async function loadConfigFromFile(configPath?: string): Promise<Log> {
  const configFile = configPath || join(Deno.cwd(), "logdash.config.ts");

  try {
    const module = await import(configFile);
    const userConfig = module.default as Partial<LogDashConfigRootDef>;

    return createLogger(userConfig);
  } catch (error) {
    if (error instanceof Error && error.message.includes("Cannot resolve")) {
      return new Log(defaultRootCfg)
    }
    throw error;
  }
}
