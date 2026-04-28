function normalizeUrl(value: string | undefined, fallback: string) {
  try {
    return new URL(value ?? fallback).toString().replace(/\/$/, "")
  } catch {
    return fallback
  }
}

export const publicAppConfig = {
  serverUrl: normalizeUrl(process.env.NEXT_PUBLIC_SERVER_URL, "http://localhost:3005"),
  webUrl: normalizeUrl(process.env.NEXT_PUBLIC_WEB_URL, "http://localhost:3000"),
}
