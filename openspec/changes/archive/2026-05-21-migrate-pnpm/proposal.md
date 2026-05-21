# Proposal: Migrate from npm to pnpm

## Problem

Project uses npm as package manager. pnpm offers:
- Faster installs (hard links instead of copying)
- Less disk space (single global store)
- Strict dependency resolution (no phantom deps)
- Better for monorepo-style projects (root + backend packages)

## Proposed Change

Migrate all package management from npm to pnpm:
1. Remove `package-lock.json`, reinstall with `pnpm`
2. Update CI workflow to use pnpm
3. Update scripts referencing `npm run` → `pnpm run`
4. Add `.npmrc` with pnpm settings
5. Update documentation (.env.example, README)

## Scope

### In scope
- Delete package-lock.json
- Install with pnpm
- Update `.github/workflows/test.yml`
- Update `predeploy` script
- Add `.npmrc`
- Update docs

### Out of scope
- Restructuring to pnpm workspaces (current flat structure works)
- Changing dependency versions

## Estimated effort

Small: ~5 files, ~30 lines changed. Single PR.
