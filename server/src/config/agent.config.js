import { promises as fs } from "fs";
import path from "path";
import chalk from "chalk";
import { generateObject } from "ai";
import { z } from "zod";
import { resolveSafePath } from "../utils/path-safety.js";

const ApplicationSchema = z.object({
  folderName: z.string().describe("Kebab-case folder name for the application"),
  description: z.string().describe("Brief description of what was created"),
  files: z
    .array(
      z.object({
        path: z.string().describe("Relative file path (e.g., src/App.jsx)"),
        content: z.string().describe("Complete file content"),
      })
    )
    .describe("All files needed for the application"),
  setupCommands: z
    .array(z.string())
    .describe("Bash commands to setup and run (e.g., npm install, npm run dev)"),
});

function printSystem(message) {
  console.log(message);
}

function displayFileTree(files, folderName) {
  printSystem(chalk.cyan("\nProject structure:"));
  printSystem(chalk.white(`${folderName}/`));

  const filesByDir = {};
  files.forEach((file) => {
    const parts = file.path.split("/");
    const dir = parts.length > 1 ? parts.slice(0, -1).join("/") : "";

    if (!filesByDir[dir]) {
      filesByDir[dir] = [];
    }
    filesByDir[dir].push(parts[parts.length - 1]);
  });

  Object.keys(filesByDir)
    .sort()
    .forEach((dir) => {
      if (dir) {
        printSystem(chalk.white(`|- ${dir}/`));
        filesByDir[dir].forEach((file) => {
          printSystem(chalk.white(`|  \\- ${file}`));
        });
      } else {
        filesByDir[dir].forEach((file) => {
          printSystem(chalk.white(`|- ${file}`));
        });
      }
    });
}

async function createApplicationFiles(baseDir, folderName, files) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(folderName)) {
    throw new Error("Folder name must be kebab-case");
  }

  const appDir = resolveSafePath(baseDir, folderName, "folder name");
  const existingDirEntries = await fs.readdir(appDir).catch(() => null);

  if (existingDirEntries && existingDirEntries.length > 0) {
    throw new Error(`Refusing to overwrite existing directory: ${folderName}`);
  }

  const plannedFiles = files.map((file) => ({
    ...file,
    resolvedPath: resolveSafePath(appDir, file.path, "file path"),
  }));

  for (const plannedFile of plannedFiles) {
    const exists = await fs
      .access(plannedFile.resolvedPath)
      .then(() => true)
      .catch(() => false);

    if (exists) {
      throw new Error(`Refusing to overwrite existing file: ${plannedFile.path}`);
    }
  }

  await fs.mkdir(appDir, { recursive: true });
  printSystem(chalk.cyan(`\nCreated directory: ${folderName}/`));

  for (const file of plannedFiles) {
    const fileDir = path.dirname(file.resolvedPath);
    await fs.mkdir(fileDir, { recursive: true });
    await fs.writeFile(file.resolvedPath, file.content, "utf8");
    printSystem(chalk.green(`  OK ${file.path}`));
  }

  return appDir;
}

export async function generateApplication(description, aiService, cwd = process.cwd()) {
  try {
    printSystem(chalk.cyan("\nAgent mode: generating your application...\n"));
    printSystem(chalk.gray(`Request: ${description}\n`));
    printSystem(chalk.magenta("Generating structured output...\n"));

    const result = await generateObject({
      model: aiService.model,
      schema: ApplicationSchema,
      prompt: `Create a complete, production-ready application for: ${description}

CRITICAL REQUIREMENTS:
1. Generate ALL files needed for the application to run
2. Include package.json with ALL dependencies and correct versions (if needed)
3. Include README.md with setup instructions
4. Include configuration files (.gitignore, etc.) if needed
5. Write clean, well-commented, production-ready code
6. Include error handling and input validation
7. Use modern JavaScript/TypeScript best practices
8. Make sure all imports and paths are correct
9. NO PLACEHOLDERS - everything must be complete and working
10. For simple HTML/CSS/JS projects, you can skip package.json if not needed

Provide:
- A meaningful kebab-case folder name
- All necessary files with complete content
- Setup commands (for example: cd folder, npm install, npm run dev OR just open index.html)
- Make it visually appealing and functional`,
    });

    const application = result.object;
    printSystem(chalk.green(`\nGenerated: ${application.folderName}\n`));
    printSystem(chalk.gray(`Description: ${application.description}\n`));

    if (!application.files || application.files.length === 0) {
      throw new Error("No files were generated");
    }

    printSystem(chalk.green(`Files: ${application.files.length}\n`));
    displayFileTree(application.files, application.folderName);

    printSystem(chalk.cyan("\nCreating files...\n"));
    const appDir = await createApplicationFiles(cwd, application.folderName, application.files);

    printSystem(chalk.green.bold("\nApplication created successfully.\n"));
    printSystem(chalk.cyan(`Location: ${chalk.bold(appDir)}\n`));

    if (application.setupCommands && application.setupCommands.length > 0) {
      printSystem(chalk.cyan("Next steps:\n"));
      application.setupCommands.forEach((cmd) => {
        printSystem(chalk.white(cmd));
      });
      printSystem("");
    } else {
      printSystem(chalk.yellow("No setup commands provided\n"));
    }

    return {
      folderName: application.folderName,
      appDir,
      files: application.files.map((file) => file.path),
      commands: application.setupCommands || [],
      success: true,
    };
  } catch (err) {
    printSystem(chalk.red(`\nError generating application: ${err.message}\n`));
    if (err.stack) {
      printSystem(chalk.dim(`${err.stack}\n`));
    }
    throw err;
  }
}
