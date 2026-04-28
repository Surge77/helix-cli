import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";

import { resolveSafePath } from "../src/utils/path-safety.js";

test("resolveSafePath keeps nested relative paths inside the base directory", () => {
  const baseDir = path.resolve("workspace", "helix");
  const resolved = resolveSafePath(baseDir, "generated-app/src/index.js", "file path");
  assert.equal(resolved, path.resolve(baseDir, "generated-app", "src", "index.js"));
});

test("resolveSafePath rejects absolute file paths", () => {
  assert.throws(
    () => resolveSafePath("C:/workspace/helix", "C:/Windows/System32/drivers/etc/hosts", "file path"),
    /must be relative/i
  );
});

test("resolveSafePath rejects traversal outside the base directory", () => {
  assert.throws(
    () => resolveSafePath("C:/workspace/helix", "../secrets.txt", "file path"),
    /escapes the output directory/i
  );
});
