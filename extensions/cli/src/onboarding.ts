import * as fs from "fs";
import * as path from "path";

import chalk from "chalk";
import { setConfigFilePermissions } from "core/util/paths.js";

import type { AuthConfig } from "./auth/workos.js";
import { getApiClient } from "./config.js";
import { loadConfiguration } from "./configLoader.js";
import { env } from "./env.js";
import { question, questionWithChoices } from "./util/prompt.js";
import {
  ProviderSetup,
  updateAnthropicModelInYaml,
  updateProviderModelInYaml,
} from "./util/yamlConfigUpdater.js";

const CONFIG_PATH = path.join(env.continueHome, "config.yaml");

export async function checkHasAcceptableModel(
  configPath: string,
): Promise<boolean> {
  try {
    if (!fs.existsSync(configPath)) {
      return false;
    }

    const content = fs.readFileSync(configPath, "utf8");
    return content.includes("claude");
  } catch {
    return false;
  }
}

export async function createOrUpdateConfig(apiKey: string): Promise<void> {
  const configDir = path.dirname(CONFIG_PATH);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  const existingContent = fs.existsSync(CONFIG_PATH)
    ? fs.readFileSync(CONFIG_PATH, "utf8")
    : "";

  const updatedContent = updateAnthropicModelInYaml(existingContent, apiKey);
  fs.writeFileSync(CONFIG_PATH, updatedContent);
  setConfigFilePermissions(CONFIG_PATH);
}

export async function createOrUpdateProviderConfig(
  setup: ProviderSetup,
): Promise<void> {
  const configDir = path.dirname(CONFIG_PATH);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  const existingContent = fs.existsSync(CONFIG_PATH)
    ? fs.readFileSync(CONFIG_PATH, "utf8")
    : "";

  const updatedContent = updateProviderModelInYaml(existingContent, setup);
  fs.writeFileSync(CONFIG_PATH, updatedContent);
  setConfigFilePermissions(CONFIG_PATH);
}

type ProviderChoice = {
  id: string;
  label: string;
  description: string;
  defaultModel: string;
  defaultApiBase?: string;
  requiresApiKey?: boolean;
  requiresProjectId?: boolean;
  supportsKeyFile?: boolean;
};

const PROVIDER_CHOICES: ProviderChoice[] = [
  {
    id: "ollama",
    label: "Ollama",
    description: "Local Ollama server, usually http://localhost:11434/",
    defaultModel: "llama3.1",
    defaultApiBase: "http://localhost:11434/",
  },
  {
    id: "lmstudio",
    label: "LM Studio",
    description: "Local LM Studio OpenAI-compatible server",
    defaultModel: "local-model",
    defaultApiBase: "http://localhost:1234/v1/",
  },
  {
    id: "llama.cpp",
    label: "llama.cpp",
    description: "llama-server completion endpoint",
    defaultModel: "local-model",
    defaultApiBase: "http://127.0.0.1:8080/",
  },
  {
    id: "vllm",
    label: "vLLM",
    description: "OpenAI-compatible vLLM server",
    defaultModel: "local-model",
    defaultApiBase: "http://localhost:8000/v1/",
  },
  {
    id: "gemini",
    label: "Gemini API",
    description: "Google Gemini API key",
    defaultModel: "gemini-2.5-flash",
    defaultApiBase: "https://generativelanguage.googleapis.com/v1beta/",
    requiresApiKey: true,
  },
  {
    id: "vertexai",
    label: "Vertex AI / Gemini Enterprise",
    description: "Google Cloud Vertex AI with project and region",
    defaultModel: "gemini-2.5-flash",
    requiresProjectId: true,
    supportsKeyFile: true,
  },
  {
    id: "openai",
    label: "OpenAI-compatible",
    description: "Any hosted or enterprise OpenAI-compatible endpoint",
    defaultModel: "gpt-4o-mini",
    defaultApiBase: "https://api.openai.com/v1/",
    requiresApiKey: true,
  },
  {
    id: "anthropic",
    label: "Anthropic",
    description: "Claude via Anthropic API",
    defaultModel: "claude-sonnet-4-6",
    requiresApiKey: true,
  },
];

function choiceMenu(): string {
  return PROVIDER_CHOICES.map(
    (provider, index) =>
      `  ${index + 1}. ${provider.label} - ${provider.description}`,
  ).join("\n");
}

async function promptForProviderSetup(): Promise<ProviderSetup> {
  console.log(
    chalk.yellow("Set up your LLM provider for ArclengthContinuation."),
  );
  console.log(
    chalk.gray(
      "Choose a local provider or a hosted API. You can rerun this with `cn setup`.\n",
    ),
  );
  console.log(choiceMenu());

  const choices = PROVIDER_CHOICES.map((_, index) => String(index + 1));
  const selected = await questionWithChoices(
    chalk.white("\nSelect a provider [1]: "),
    choices,
    "1",
    chalk.red(`Please choose one of: ${choices.join(", ")}`),
  );
  const provider = PROVIDER_CHOICES[Number(selected) - 1];

  const model =
    (await question(chalk.white(`Model name [${provider.defaultModel}]: `))) ||
    provider.defaultModel;

  const setup: ProviderSetup = {
    provider: provider.id,
    name: `${provider.label} ${model}`,
    model,
  };

  if (provider.defaultApiBase) {
    setup.apiBase =
      (await question(
        chalk.white(`API base [${provider.defaultApiBase}]: `),
      )) || provider.defaultApiBase;
  }

  if (provider.requiresApiKey) {
    setup.apiKey = await question(chalk.white("API key: "));
    if (!setup.apiKey) {
      throw new Error(`${provider.label} requires an API key.`);
    }
  }

  if (provider.requiresProjectId) {
    setup.projectId = await question(chalk.white("Google Cloud project ID: "));
    if (!setup.projectId) {
      throw new Error("Vertex AI requires a Google Cloud project ID.");
    }
    setup.region =
      (await question(chalk.white("Vertex region [us-central1]: "))) ||
      "us-central1";

    if (provider.supportsKeyFile) {
      const keyFile = await question(
        chalk.white(
          "Service account JSON path [leave blank to use Application Default Credentials]: ",
        ),
      );
      if (keyFile) {
        setup.keyFile = keyFile;
      }
    }
  }

  return setup;
}

export async function runSetupFlow(): Promise<void> {
  const setup = await promptForProviderSetup();
  await createOrUpdateProviderConfig(setup);

  console.log(
    chalk.green(`✓ Config file updated successfully at ${CONFIG_PATH}`),
  );
  console.log(
    chalk.gray(
      `  Provider: ${setup.provider}, model: ${setup.model}${
        setup.apiBase ? `, API base: ${setup.apiBase}` : ""
      }`,
    ),
  );
}

export async function runOnboardingFlow(
  configPath: string | undefined,
): Promise<boolean> {
  // Step 1: Check if --config flag is provided
  if (configPath !== undefined) {
    return false;
  }

  // Step 2: Check for CONTINUE_USE_BEDROCK environment variable first (before test env check)
  if (process.env.CONTINUE_USE_BEDROCK === "1") {
    console.log(
      chalk.blue("✓ Using AWS Bedrock (CONTINUE_USE_BEDROCK detected)"),
    );
    return true;
  }

  // Step 3: Check if we're in a test/CI environment - if so, skip interactive prompts
  const isTestEnv =
    process.env.NODE_ENV === "test" ||
    process.env.CI === "true" ||
    process.env.VITEST === "true" ||
    process.env.GITHUB_ACTIONS === "true" ||
    !process.stdin.isTTY;

  if (isTestEnv) {
    // In test/CI environment, check for ANTHROPIC_API_KEY first
    if (process.env.ANTHROPIC_API_KEY) {
      console.log(chalk.blue("✓ Using ANTHROPIC_API_KEY from environment"));
      await createOrUpdateConfig(process.env.ANTHROPIC_API_KEY);
      console.log(chalk.gray(`  Config saved to: ${CONFIG_PATH}`));
      return false;
    }

    // Otherwise return a minimal working configuration
    return false;
  }

  // Step 4: Prompt for provider setup
  await runSetupFlow();

  return true;
}

export async function isFirstTime(): Promise<boolean> {
  return !fs.existsSync(path.join(env.continueHome, ".onboarding_complete"));
}

export async function markOnboardingComplete(): Promise<void> {
  const flagPath = path.join(env.continueHome, ".onboarding_complete");
  const flagDir = path.dirname(flagPath);

  if (!fs.existsSync(flagDir)) {
    fs.mkdirSync(flagDir, { recursive: true });
  }

  fs.writeFileSync(flagPath, new Date().toISOString());
}

export async function initializeWithOnboarding(
  authConfig: AuthConfig,
  configPath: string | undefined,
) {
  const firstTime = await isFirstTime();

  if (configPath !== undefined) {
    // throw an early error is configPath is invalid or has errors
    try {
      await loadConfiguration(
        authConfig,
        configPath,
        getApiClient(undefined),
        [],
        false,
      );
    } catch (errorMessage) {
      throw new Error(
        `Failed to load config from "${configPath}": ${errorMessage}`,
      );
    }
  }

  if (!firstTime) return;

  const wasOnboarded = await runOnboardingFlow(configPath);
  if (wasOnboarded) {
    await markOnboardingComplete();
  }
}
