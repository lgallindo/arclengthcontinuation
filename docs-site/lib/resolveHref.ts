/**
 * Resolve internal paths for the standalone docs app.
 *
 * On the docs subdomain, /docs/X becomes /X (we're already on docs.arclength-continuation.dev).
 * Cross-app links get absolute URLs.
 */
export function resolveHref(path: string): string {
  // Strip /docs prefix — we're already on the docs domain
  if (path.startsWith("/docs/")) return path.slice(5);
  if (path === "/docs") return "/";

  // Cross-app links → absolute URLs
  if (path.startsWith("/blog"))
    return `https://blog.arclength-continuation.dev${path.slice(5) || ""}`;
  if (path === "/login") return "https://arclength-continuation.dev/login";
  if (path === "/") return "https://arclength-continuation.dev";

  // Everything else stays as-is
  return path;
}
