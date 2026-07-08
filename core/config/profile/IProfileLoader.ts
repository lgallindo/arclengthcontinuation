// ProfileHandlers manage the loading of a config, allowing us to abstract over different ways of getting to a ArclengthContinuationConfig

import { ConfigResult } from "@arclength-continuation/config-yaml";
import { ArclengthContinuationConfig } from "../../index.js";
import { ProfileDescription } from "../ProfileLifecycleManager.js";

// After we have the ArclengthContinuationConfig, the ConfigHandler takes care of everything else (loading models, lifecycle, etc.)
export interface IProfileLoader {
  description: ProfileDescription;
  doLoadConfig(): Promise<ConfigResult<ArclengthContinuationConfig>>;
  setIsActive(isActive: boolean): void;
}
