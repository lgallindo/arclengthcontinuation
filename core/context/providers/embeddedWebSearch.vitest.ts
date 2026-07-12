import { expect, test, vi } from "vitest";
import { fetchEmbeddedSearchResults } from "./embeddedWebSearch";

test("fetchEmbeddedSearchResults uses DuckDuckGo JSON API", async () => {
  const fetchFn = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      Heading: "Rust",
      AbstractText: "Rust is a programming language.",
      AbstractURL: "https://rust-lang.org",
      RelatedTopics: [],
    }),
  });

  const results = await fetchEmbeddedSearchResults("rust lang", 3, fetchFn);
  expect(results).toHaveLength(1);
  expect(results[0].content).toContain("programming language");
  expect(fetchFn).toHaveBeenCalledWith(
    expect.stringContaining("api.duckduckgo.com"),
    expect.any(Object),
  );
});
