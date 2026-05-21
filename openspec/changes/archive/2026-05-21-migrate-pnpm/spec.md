# Spec: Migrate from npm to pnpm

## Requirements

### R1: Dependencies installed via pnpm
The project **MUST** use pnpm as the package manager. `package-lock.json` must be removed and `pnpm-lock.yaml` generated.

### R2: CI workflow uses pnpm
The GitHub Actions workflow **MUST** use pnpm for dependency installation and test execution.

### R3: Scripts updated
Any npm-specific script references **MUST** be updated to use pnpm equivalents.

### R4: Documentation updated
README and .env.example **MUST** reference pnpm as the package manager.

## Acceptance Criteria

- `pnpm install` succeeds without errors
- `pnpm test` passes (9 tests)
- `pnpm run build` succeeds
- `pnpm run lint` has no new errors
- CI workflow uses pnpm steps
- No `package-lock.json` in repo (added to .gitignore if needed)
