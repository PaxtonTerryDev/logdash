import { ConfigValidationError } from "./errors.ts";
import { LogTransports } from "./transports.ts";

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
