import dotenv from "dotenv";

dotenv.config({ quiet: true });

const DEFAULT_PORT = 3005;
const DEFAULT_WEB_URL = "http://localhost:3000";

function parsePort(value) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : DEFAULT_PORT;
}

function normalizeUrl(value, fallback) {
  try {
    return new URL(value ?? fallback).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

export function createAppConfig(env = process.env) {
  const port = parsePort(env.PORT);
  const serverUrl = normalizeUrl(env.SERVER_URL, `http://localhost:${port}`);
  const webUrl = normalizeUrl(env.WEB_URL, DEFAULT_WEB_URL);
  const nodeEnv = env.NODE_ENV ?? "development";
  const isProduction = nodeEnv === "production";

  return {
    port,
    serverUrl,
    webUrl,
    nodeEnv,
    isProduction,
    authLogLevel: env.AUTH_LOG_LEVEL ?? (isProduction ? "error" : "warn"),
    toolDebug: env.DEBUG_TOOLS === "true",
  };
}

export const appConfig = createAppConfig();
