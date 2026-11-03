export async function authFetch(url: string, options?: RequestInit) {
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: options?.headers,
  });
}
