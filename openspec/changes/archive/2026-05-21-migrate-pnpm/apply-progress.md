# Apply Progress: Migrate from npm to pnpm

## Completed Tasks

### ✅ Task 1: Remove package-lock.json, install with pnpm
- Deleted `package-lock.json`
- Ran `pnpm install` → 440 packages installed
- Generated `pnpm-lock.yaml`

### ✅ Task 2: Create `.npmrc`
- Added `auto-install-peers=true` and `strict-peer-dependencies=false`

### ✅ Task 3: Update CI workflow
- `npm ci` → `pnpm install --frozen-lockfile`
- `npm test` → `pnpm test`
- Added `pnpm/action-setup@v4` step
- Added pnpm store caching

### ✅ Task 4: Update package.json scripts
- `predeploy`: `npm run build` → `pnpm run build`

### ✅ Task 5: Update documentation
- `.env.example`: Added pnpm quick start commands
- `README.md`: Updated prerequisites, install, and dev commands to use pnpm; fixed typos; updated auth section with bcrypt info

### ✅ Task 6: Full verification
- `pnpm test` → 9 passed
- `pnpm run build` → success
- `pnpm run lint` → no new errors

## Files Changed

| File | Action | Summary |
|------|--------|---------|
| `package-lock.json` | DELETED | Replaced by pnpm-lock.yaml |
| `pnpm-lock.yaml` | NEW | pnpm lockfile |
| `.npmrc` | NEW | pnpm configuration |
| `.github/workflows/test.yml` | MODIFIED | pnpm setup + caching |
| `package.json` | MODIFIED | predeploy script |
| `.env.example` | MODIFIED | Added pnpm commands |
| `README.md` | MODIFIED | Updated docs, fixed typos |

## Workload

~7 files changed. Under 400-line budget.
