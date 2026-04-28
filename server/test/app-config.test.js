import test from "node:test";
import assert from "node:assert/strict";

import { createAppConfig } from "../src/config/app.config.js";

test("createAppConfig returns normalized defaults", () => {
  const config = createAppConfig({});

  assert.equal(config.port, 3005);
  assert.equal(config.serverUrl, "http://localhost:3005");
  assert.equal(config.webUrl, "http://localhost:3000");
  assert.equal(config.isProduction, false);
});

test("createAppConfig trims trailing slashes and respects provided env", () => {
  const config = createAppConfig({
    NODE_ENV: "production",
    PORT: "4100",
    SERVER_URL: "https://api.example.com/",
    WEB_URL: "https://app.example.com/",
  });

  assert.equal(config.port, 4100);
  assert.equal(config.serverUrl, "https://api.example.com");
  assert.equal(config.webUrl, "https://app.example.com");
  assert.equal(config.isProduction, true);
});
