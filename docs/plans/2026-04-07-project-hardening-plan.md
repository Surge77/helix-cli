# Project Hardening Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Harden Helix CLI across security, configuration, auth flow hygiene, schema correctness, and verification.

**Architecture:** Introduce small pure config and path-safety utilities, route all runtime URL decisions through shared config, and remove insecure token handling. Keep the UI surface small, but make auth redirects predictable and verifiable. Add minimal automated tests and CI so the repo can protect itself.

**Tech Stack:** Node.js ESM, Commander, Better Auth, Express, Prisma, Next.js App Router, node:test, GitHub Actions

---

### Task 1: Add failing tests for safe path resolution and runtime config

**Files:**
- Create: `server/test/path-safety.test.js`
- Create: `server/test/app-config.test.js`
- Create: `server/test/cli-help.test.js`

**Steps:**
1. Write tests for rejecting traversal and absolute output paths.
2. Write tests for default and normalized runtime URLs.
3. Write a CLI smoke test that expects `helix` in help output.
4. Run `node --test server/test/*.test.js` and confirm failures.

### Task 2: Harden server runtime config and auth surfaces

**Files:**
- Create: `server/src/config/app.config.js`
- Modify: `server/src/index.js`
- Modify: `server/src/lib/auth.js`
- Modify: `server/src/cli/commands/auth/login.js`
- Modify: `server/src/cli/main.js`
- Modify: `server/src/cli/ai/google-service.js`
- Modify: `server/src/config/google.config.js`

**Steps:**
1. Centralize URLs, ports, and environment behavior in `app.config.js`.
2. Remove token-in-path auth, token logging, and noisy debug output.
3. Rename the CLI surface consistently to `helix`.
4. Add missing AI config defaults and fix env var naming.
5. Re-run targeted tests after each change.

### Task 3: Add safe file generation for Agent Mode

**Files:**
- Create: `server/src/utils/path-safety.js`
- Modify: `server/src/config/agent.config.js`

**Steps:**
1. Implement safe path resolution helpers.
2. Reject absolute paths, traversal, and overwrite collisions.
3. Keep generation preview output, but fail closed on unsafe writes.
4. Run the path-safety tests until green.

### Task 4: Clean up client auth flow and metadata

**Files:**
- Create: `client/lib/app-config.ts`
- Modify: `client/lib/auth-client.ts`
- Modify: `client/app/page.tsx`
- Modify: `client/app/(auth)/sign-in/page.tsx`
- Modify: `client/components/approve-content.tsx`
- Modify: `client/components/login-form.tsx`
- Modify: `client/app/layout.tsx`
- Modify: `client/app/globals.css`
- Modify: `client/components/ui/sidebar.tsx`

**Steps:**
1. Remove render-time redirects and move them into effects.
2. Route client URLs through public config.
3. Fix metadata, image usage, warnings, and lint blockers.
4. Run `npm run lint` in `client` and confirm green.

### Task 5: Tighten schema, docs, and CI

**Files:**
- Modify: `server/prisma/schema.prisma`
- Create: `server/prisma/migrations/20260407000000_project_hardening/migration.sql`
- Create: `server/.env.example`
- Create: `client/.env.example`
- Modify: `README.md`
- Create: `.github/workflows/ci.yml`
- Modify: `server/package.json`

**Steps:**
1. Remove the leftover test table and add enums/indexes where practical.
2. Add env examples that match actual runtime expectations.
3. Update README command names and feature status.
4. Add CI for server tests and client lint/build.
5. Run final verification commands before claiming completion.
