import { runSetupFlow, markOnboardingComplete } from "../onboarding.js";

export async function setup(): Promise<void> {
  await runSetupFlow();
  await markOnboardingComplete();
}
