import {
  ArclengthContinuation,
  ArclengthContinuationClient,
} from "@arclength-continuation/sdk";
import chalk from "chalk";

import { env } from "./env.js";

/**
 * Initialize the ArclengthContinuation SDK with the given parameters
 * @param apiKey - API key to use for authentication
 * @param assistantSlug - Slug of the assistant to use
 * @param organizationId - Optional organization ID
 * @returns Promise resolving to the ArclengthContinuation SDK instance
 */
export async function initializeArclengthContinuationSDK(
  apiKey: string | undefined,
  assistantSlug: string,
  organizationId?: string,
): Promise<ArclengthContinuationClient> {
  if (!apiKey) {
    console.error(
      chalk.red("Error: No API key provided for ArclengthContinuation SDK"),
    );
    throw new Error("No API key provided for ArclengthContinuation SDK");
  }

  try {
    return await ArclengthContinuation.from({
      apiKey,
      assistant: assistantSlug,
      organizationId,
      baseURL: env.apiBase,
    });
  } catch (error) {
    console.error(
      chalk.red("Error initializing ArclengthContinuation SDK:"),
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
}
