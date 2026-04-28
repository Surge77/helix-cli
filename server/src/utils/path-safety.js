import path from "node:path";

export function resolveSafePath(baseDir, targetPath, label = "path") {
  if (typeof targetPath !== "string" || targetPath.trim().length === 0) {
    throw new Error(`${label} must be a non-empty relative path`);
  }

  const trimmedPath = targetPath.trim();
  if (path.isAbsolute(trimmedPath)) {
    throw new Error(`${label} must be relative`);
  }

  const normalizedBaseDir = path.resolve(baseDir);
  const resolvedPath = path.resolve(normalizedBaseDir, trimmedPath);
  const relativePath = path.relative(normalizedBaseDir, resolvedPath);

  if (!relativePath || relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`${label} escapes the output directory`);
  }

  return resolvedPath;
}
