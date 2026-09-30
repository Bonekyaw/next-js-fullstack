const DEFAULT_REDIRECT_URL = "/";

export function sanitizeCallbackUrl(
  callbackUrl: string | null | undefined,
  fallback = DEFAULT_REDIRECT_URL,
) {
  if (!callbackUrl || typeof callbackUrl !== "string") {
    return fallback;
  }

  const trimmedUrl = callbackUrl.trim();

  if (!trimmedUrl.startsWith("/") || trimmedUrl.startsWith("//")) {
    return fallback;
  }

  if (trimmedUrl.includes("\\") || trimmedUrl.includes("@")) {
    return fallback;
  }

  try {
    const url = new URL(trimmedUrl, "http://localhost:3000");
    if (url.origin !== "http://localhost:3000") {
      return fallback;
    }
    return url.pathname + url.search + url.hash; // http://localhost:3000/path?query#hash => /path?query#hash
  } catch {
    return fallback;
  }
}
