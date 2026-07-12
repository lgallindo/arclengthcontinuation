// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (c) 2026 Lucas Gallindo

import { ContextItem, FetchFunction } from "../..";

const DEFAULT_MAX_RESULTS = 5;
const SEARXNG_ENV = "ARCLENGTH_SEARXNG_URL";

interface DdgTopic {
  Text?: string;
  FirstURL?: string;
  Topics?: DdgTopic[];
}

interface DdgResponse {
  Heading?: string;
  AbstractText?: string;
  AbstractURL?: string;
  RelatedTopics?: DdgTopic[];
}

function flattenDdgTopics(
  topics: DdgTopic[] | undefined,
  out: ContextItem[],
): void {
  if (!topics) {
    return;
  }
  for (const topic of topics) {
    if (topic.Topics?.length) {
      flattenDdgTopics(topic.Topics, out);
      continue;
    }
    if (topic.Text && topic.FirstURL) {
      out.push({
        name: topic.Text.split(" - ")[0] ?? topic.Text,
        description: topic.FirstURL,
        content: `${topic.Text}\n${topic.FirstURL}`,
      });
    }
  }
}

export async function fetchDuckDuckGoInstantAnswers(
  query: string,
  n: number,
  fetchFn: FetchFunction,
): Promise<ContextItem[]> {
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
  const resp = await fetchFn(url, { method: "GET" });
  if (!resp.ok) {
    throw new Error(`DuckDuckGo search failed: ${resp.status}`);
  }
  const data = (await resp.json()) as DdgResponse;
  const items: ContextItem[] = [];
  if (data.AbstractText) {
    items.push({
      name: data.Heading ?? "DuckDuckGo",
      description: data.AbstractURL ?? "",
      content: data.AbstractText,
    });
  }
  flattenDdgTopics(data.RelatedTopics, items);
  return items.slice(0, n);
}

export async function fetchSearxngResults(
  query: string,
  n: number,
  fetchFn: FetchFunction,
): Promise<ContextItem[]> {
  const base = (process.env[SEARXNG_ENV] ?? "http://localhost:8080").replace(
    /\/$/,
    "",
  );
  const url = `${base}/search?q=${encodeURIComponent(query)}&format=json`;
  const resp = await fetchFn(url, { method: "GET" });
  if (!resp.ok) {
    throw new Error(`SearXNG search failed (${base}): ${resp.status}`);
  }
  const data = (await resp.json()) as {
    results?: Array<{ title?: string; url?: string; content?: string }>;
  };
  return (data.results ?? []).slice(0, n).map((r, i) => ({
    name: r.title ?? `Result ${i + 1}`,
    description: r.url ?? "",
    content: r.content ?? r.url ?? "",
  }));
}

/**
 * Embedded search without Continue trial proxy or commercial API keys.
 * Order: DuckDuckGo instant answers, then optional SearXNG (ARCLENGTH_SEARXNG_URL).
 */
export async function fetchEmbeddedSearchResults(
  query: string,
  n: number,
  fetchFn: FetchFunction,
): Promise<ContextItem[]> {
  const limit = n || DEFAULT_MAX_RESULTS;
  const ddg = await fetchDuckDuckGoInstantAnswers(query, limit, fetchFn);
  if (ddg.length >= limit) {
    return ddg.slice(0, limit);
  }
  try {
    const searx = await fetchSearxngResults(query, limit - ddg.length, fetchFn);
    return [...ddg, ...searx].slice(0, limit);
  } catch {
    return ddg;
  }
}
