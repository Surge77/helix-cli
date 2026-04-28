import { google } from "@ai-sdk/google";
import chalk from "chalk";
import { appConfig } from "./app.config.js";

function debugLog(...args) {
  if (appConfig.toolDebug) {
    console.log(...args);
  }
}

export const availableTools = [
  {
    id: "google_search",
    name: "Google Search",
    description:
      "Access the latest information using Google search. Useful for current events, news, and real-time information.",
    getTool: () => google.tools.googleSearch({}),
    enabled: false,
  },
  {
    id: "code_execution",
    name: "Code Execution",
    description:
      "Generate and execute Python code to perform calculations, solve problems, or provide accurate information.",
    getTool: () => google.tools.codeExecution({}),
    enabled: false,
  },
  {
    id: "url_context",
    name: "URL Context",
    description:
      "Provide specific URLs that you want the model to analyze directly from the prompt. Supports up to 20 URLs per request.",
    getTool: () => google.tools.urlContext({}),
    enabled: false,
  },
];

export function getEnabledTools() {
  const tools = {};

  try {
    for (const toolConfig of availableTools) {
      if (toolConfig.enabled) {
        tools[toolConfig.id] = toolConfig.getTool();
      }
    }

    if (Object.keys(tools).length > 0) {
      debugLog(chalk.gray(`[DEBUG] Enabled tools: ${Object.keys(tools).join(", ")}`));
    } else {
      debugLog(chalk.yellow("[DEBUG] No tools enabled"));
    }

    return Object.keys(tools).length > 0 ? tools : undefined;
  } catch (error) {
    console.error(chalk.red("[ERROR] Failed to initialize tools:"), error.message);
    console.error(chalk.yellow("Make sure you have @ai-sdk/google version 2.0+ installed"));
    console.error(chalk.yellow("Run: npm install @ai-sdk/google@latest"));
    return undefined;
  }
}

export function toggleTool(toolId) {
  const tool = availableTools.find((item) => item.id === toolId);
  if (tool) {
    tool.enabled = !tool.enabled;
    debugLog(chalk.gray(`[DEBUG] Tool ${toolId} toggled to ${tool.enabled}`));
    return tool.enabled;
  }

  debugLog(chalk.red(`[DEBUG] Tool ${toolId} not found`));
  return false;
}

export function enableTools(toolIds) {
  debugLog(chalk.gray("[DEBUG] enableTools called with:"), toolIds);

  availableTools.forEach((tool) => {
    const wasEnabled = tool.enabled;
    tool.enabled = toolIds.includes(tool.id);

    if (tool.enabled !== wasEnabled) {
      debugLog(chalk.gray(`[DEBUG] ${tool.id}: ${wasEnabled} -> ${tool.enabled}`));
    }
  });

  const enabledCount = availableTools.filter((tool) => tool.enabled).length;
  debugLog(chalk.gray(`[DEBUG] Total tools enabled: ${enabledCount}/${availableTools.length}`));
}

export function getEnabledToolNames() {
  const names = availableTools.filter((tool) => tool.enabled).map((tool) => tool.name);
  debugLog(chalk.gray("[DEBUG] getEnabledToolNames returning:"), names);
  return names;
}

export function resetTools() {
  availableTools.forEach((tool) => {
    tool.enabled = false;
  });
  debugLog(chalk.gray("[DEBUG] All tools have been reset (disabled)"));
}
