import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("CLI help uses the helix command name", () => {
  const result = spawnSync("node", ["src/cli/main.js", "--help"], {
    cwd: path.resolve(__dirname, ".."),
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /Usage: helix /);
});
