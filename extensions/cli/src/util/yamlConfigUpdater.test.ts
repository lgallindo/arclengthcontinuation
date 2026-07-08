import { parse } from "yaml";

import {
  updateAnthropicModelInYaml,
  updateProviderModelInYaml,
} from "./yamlConfigUpdater.js";

describe("updateAnthropicModelInYaml", () => {
  const testApiKey = "sk-ant-test123456789";

  describe("empty or invalid input", () => {
    it("should create new config from empty string", () => {
      const result = updateAnthropicModelInYaml("", testApiKey);

      expect(result).toContain("name: Main Config");
      expect(result).toContain("version: 1.0.0");
      expect(result).toContain("schema: v1");
      expect(result).toContain("provider: anthropic");
      expect(result).toContain("model: claude-sonnet-4-6");
      expect(result).toContain("apiKey: sk-ant-test123456789");
      expect(result).not.toContain("uses:");
    });

    it("should create new config from invalid YAML", () => {
      const invalidYaml = "invalid: [yaml content";
      const result = updateAnthropicModelInYaml(invalidYaml, testApiKey);

      expect(result).toContain("name: Main Config");
      expect(result).toContain("model: claude-sonnet-4-6");
      expect(result).toContain("apiKey: sk-ant-test123456789");
      expect(result).not.toContain("uses:");
    });
  });

  describe("comment preservation", () => {
    it("should preserve comments when adding new model", () => {
      const yamlWithComments = `# My ArclengthContinuation config
name: Main Config
version: 1.0.0
schema: v1
# List of available models
models:
  - name: GPT-4
    provider: openai
    model: gpt-4
    apiKey: TEST-openai-test
`;

      const result = updateAnthropicModelInYaml(yamlWithComments, testApiKey);

      expect(result).toContain("# My ArclengthContinuation config");
      expect(result).toContain("# List of available models");
      expect(result).toContain("model: gpt-4");
      expect(result).toContain("model: claude-sonnet-4-6");
      expect(result).toContain("apiKey: sk-ant-test123456789");
    });

    it("should preserve comments when updating existing model", () => {
      const yamlWithComments = `# My ArclengthContinuation config
name: Main Config
version: 1.0.0
schema: v1
# List of available models
models:
  - name: Claude Sonnet 4.6
    provider: anthropic
    model: claude-sonnet-4-6
    apiKey: old-key
`;

      const result = updateAnthropicModelInYaml(yamlWithComments, testApiKey);

      expect(result).toContain("# My ArclengthContinuation config");
      expect(result).toContain("# List of available models");
      expect(result).toContain("model: claude-sonnet-4-6");
      expect(result).toContain("apiKey: sk-ant-test123456789");
      expect(result).not.toContain("old-key");
    });

    it("should replace legacy slug-based anthropic blocks", () => {
      const yamlWithSlug = `name: Main Config
version: 1.0.0
schema: v1
models:
  - uses: anthropic/claude-sonnet-4-6
    with:
      ANTHROPIC_API_KEY: old-key
`;

      const result = updateAnthropicModelInYaml(yamlWithSlug, testApiKey);

      expect(result).not.toContain("uses:");
      expect(result).not.toContain("old-key");
      expect(result).toContain("provider: anthropic");
      expect(result).toContain("model: claude-sonnet-4-6");
      expect(result).toContain("apiKey: sk-ant-test123456789");
    });
  });

  describe("model management", () => {
    it("should add new anthropic model when none exists", () => {
      const existingConfig = `name: Main Config
version: 1.0.0
schema: v1
models:
  - name: GPT-4
    provider: openai
    model: gpt-4
    apiKey: TEST-openai-test
`;

      const result = updateAnthropicModelInYaml(existingConfig, testApiKey);

      expect(result).toContain("model: gpt-4");
      expect(result).toContain("model: claude-sonnet-4-6");
      expect(result).toContain("apiKey: sk-ant-test123456789");
      expect(result).toContain("apiKey: TEST-openai-test");
    });

    it("should update existing anthropic model", () => {
      const existingConfig = `name: Main Config
version: 1.0.0
schema: v1
models:
  - name: Claude Sonnet 4.6
    provider: anthropic
    model: claude-sonnet-4-6
    apiKey: old-anthropic-key
  - name: GPT-4
    provider: openai
    model: gpt-4
    apiKey: TEST-openai-test
`;

      const result = updateAnthropicModelInYaml(existingConfig, testApiKey);

      expect(result).toContain("model: claude-sonnet-4-6");
      expect(result).toContain("model: gpt-4");
      expect(result).toContain("apiKey: sk-ant-test123456789");
      expect(result).toContain("apiKey: TEST-openai-test");
      expect(result).not.toContain("old-anthropic-key");

      // Should only have one Claude Sonnet model
      const sonnetMatches = result.match(/model: claude-sonnet-4-6/g);
      expect(sonnetMatches).toHaveLength(1);
    });

    it("should handle config with no models array", () => {
      const configWithoutModels = `name: Main Config
version: 1.0.0
schema: v1
`;

      const result = updateAnthropicModelInYaml(
        configWithoutModels,
        testApiKey,
      );

      expect(result).toContain("name: Main Config");
      expect(result).toContain("models:");
      expect(result).toContain("model: claude-sonnet-4-6");
      expect(result).toContain("apiKey: sk-ant-test123456789");
    });

    it("should handle config with empty models array", () => {
      const configWithEmptyModels = `name: Main Config
version: 1.0.0
schema: v1
models: []
`;

      const result = updateAnthropicModelInYaml(
        configWithEmptyModels,
        testApiKey,
      );

      expect(result).toContain("name: Main Config");
      expect(result).toContain("model: claude-sonnet-4-6");
      expect(result).toContain("apiKey: sk-ant-test123456789");
    });
  });

  describe("structure validation", () => {
    it("should produce valid YAML that can be parsed", () => {
      const input = `# Test config
name: Test
models:
  - name: Existing
    provider: openai
    model: existing-model
    apiKey: test
`;

      const result = updateAnthropicModelInYaml(input, testApiKey);

      // Should not throw when parsing
      expect(() => {
        parse(result);
      }).not.toThrow();
    });

    it("should maintain proper YAML structure", () => {
      const result = updateAnthropicModelInYaml("", testApiKey);

      expect(result).toMatch(/^name: /m);
      expect(result).toMatch(/^version: /m);
      expect(result).toMatch(/^schema: /m);
      expect(result).toMatch(/^models:/m);
      expect(result).toMatch(/^\s+- name: /m);
      expect(result).toMatch(/^\s+provider: anthropic/m);
      expect(result).toMatch(/^\s+apiKey: /m);
    });
  });

  describe("edge cases", () => {
    it("should handle malformed models array gracefully", () => {
      const malformedConfig = `name: Main Config
models: "not an array"
`;

      const result = updateAnthropicModelInYaml(malformedConfig, testApiKey);

      expect(result).toContain("model: claude-sonnet-4-6");
      expect(result).toContain("apiKey: sk-ant-test123456789");
    });

    it("should handle different API key formats", () => {
      const differentKeys = [
        "sk-ant-1234567890",
        "sk-ant-abcdefghijklmnop",
        "sk-ant-test-key-with-dashes",
      ];

      differentKeys.forEach((key) => {
        const result = updateAnthropicModelInYaml("", key);
        expect(result).toContain(`apiKey: ${key}`);
      });
    });
  });
});

describe("updateProviderModelInYaml", () => {
  it("should create local Ollama config without requiring an API key", () => {
    const result = updateProviderModelInYaml("", {
      provider: "ollama",
      name: "Ollama llama3.1",
      model: "llama3.1",
      apiBase: "http://localhost:11434/",
    });

    expect(result).toContain("name: Main Config");
    expect(result).toContain("provider: ollama");
    expect(result).toContain("model: llama3.1");
    expect(result).toContain("apiBase: http://localhost:11434/");
    expect(result).not.toContain("apiKey:");
  });

  it("should create LM Studio config with OpenAI-compatible API base", () => {
    const result = updateProviderModelInYaml("", {
      provider: "lmstudio",
      name: "LM Studio local-model",
      model: "local-model",
      apiBase: "http://localhost:1234/v1/",
    });

    expect(result).toContain("provider: lmstudio");
    expect(result).toContain("model: local-model");
    expect(result).toContain("apiBase: http://localhost:1234/v1/");
  });

  it("should preserve existing models when adding vLLM", () => {
    const existingConfig = `name: Main Config
version: 1.0.0
schema: v1
models:
  - name: Existing
    provider: anthropic
    model: claude-sonnet-4-6
    apiKey: sk-ant-existing
`;

    const result = updateProviderModelInYaml(existingConfig, {
      provider: "vllm",
      name: "vLLM served-model",
      model: "served-model",
      apiBase: "http://localhost:8000/v1/",
    });

    expect(result).toContain("provider: anthropic");
    expect(result).toContain("model: claude-sonnet-4-6");
    expect(result).toContain("provider: vllm");
    expect(result).toContain("model: served-model");
  });

  it("should create Vertex AI config with project, region, and optional key file", () => {
    const result = updateProviderModelInYaml("", {
      provider: "vertexai",
      name: "Vertex AI gemini-2.5-flash",
      model: "gemini-2.5-flash",
      projectId: "my-project",
      region: "us-central1",
      keyFile: "/secure/service-account.json",
    });

    expect(result).toContain("provider: vertexai");
    expect(result).toContain("model: gemini-2.5-flash");
    expect(result).toContain("projectId: my-project");
    expect(result).toContain("region: us-central1");
    expect(result).toContain("keyFile: /secure/service-account.json");
  });

  it("should update only the matching provider/model pair", () => {
    const existingConfig = `name: Main Config
version: 1.0.0
schema: v1
models:
  - name: Old Ollama
    provider: ollama
    model: llama3.1
    apiBase: http://old-host:11434/
  - name: Other Ollama
    provider: ollama
    model: qwen2.5-coder
    apiBase: http://localhost:11434/
`;

    const result = updateProviderModelInYaml(existingConfig, {
      provider: "ollama",
      name: "Ollama llama3.1",
      model: "llama3.1",
      apiBase: "http://localhost:11434/",
    });

    expect(result).not.toContain("http://old-host:11434/");
    expect(result).toContain("model: qwen2.5-coder");
    expect(result).toContain("model: llama3.1");
    expect(result).toContain("apiBase: http://localhost:11434/");
  });
});
