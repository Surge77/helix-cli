# Contributing to Helix CLI

First off, thank you for considering contributing to Helix CLI! 🚀

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Coding Guidelines](#coding-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/helix-cli.git
   cd helix-cli
   ```
3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/original/helix-cli.git
   ```

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 14.0
- npm, yarn, or pnpm

### Installation

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Setup database
cd ../server
cp .env.example .env
# Edit .env with your credentials
npx prisma migrate dev
```

### Running Locally

```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-new-tool` - New features
- `fix/auth-token-refresh` - Bug fixes
- `docs/update-readme` - Documentation
- `refactor/cli-commands` - Code refactoring

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```bash
feat(cli): add support for custom AI models
fix(auth): resolve token expiration issue
docs(readme): update installation instructions
```

## Submitting Changes

1. **Update your fork**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature
   ```

3. **Make your changes** and commit them

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature
   ```

5. **Create a Pull Request** from your fork to the main repository

### Pull Request Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Update documentation if needed

## Coding Guidelines

### JavaScript/TypeScript

- Use ES6+ features
- Use `async/await` over callbacks
- Add JSDoc comments for functions
- Use meaningful variable names

### File Structure

```
src/
├── cli/           # CLI-related code
├── config/        # Configuration files
├── lib/           # Shared libraries
├── services/      # Business logic
└── index.js       # Entry point
```

### Error Handling

```javascript
try {
  const result = await someAsyncOperation();
  return result;
} catch (error) {
  console.error(chalk.red(`Error: ${error.message}`));
  throw error;
}
```

### Testing

- Write tests for new features
- Ensure existing tests pass
- Test edge cases

## Reporting Bugs

When reporting bugs, please include:

1. **Environment details**
   - OS version
   - Node.js version
   - npm/yarn version

2. **Steps to reproduce**
   - Exact commands run
   - Expected behavior
   - Actual behavior

3. **Error messages**
   - Full error output
   - Stack trace if available

4. **Screenshots** (if applicable)

### Bug Report Template

```markdown
## Bug Description
[Clear description of the bug]

## Steps to Reproduce
1. Run `helix login`
2. Select "Chat" mode
3. Type a message
4. See error

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## Environment
- OS: Windows 11
- Node.js: 20.10.0
- Helix CLI: 0.0.1

## Error Output
```
[Paste error here]
```

## Screenshots
[If applicable]
```

## Suggesting Features

We love feature suggestions! Please:

1. **Check existing issues** for similar requests
2. **Describe the use case** - Why is this needed?
3. **Propose a solution** - How might it work?
4. **Consider alternatives** - Any other approaches?

### Feature Request Template

```markdown
## Feature Description
[Clear description of the feature]

## Use Case
[Why is this feature needed?]

## Proposed Solution
[How might this work?]

## Alternatives Considered
[Any other approaches?]

## Additional Context
[Screenshots, examples, etc.]
```

## Questions?

Feel free to open an issue with the `question` label or reach out to the maintainers.

---

Thank you for contributing! 🎉
