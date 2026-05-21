# Tasks: Migrate from npm to pnpm

## Task 1: Remove package-lock.json, install with pnpm
- Delete `package-lock.json`
- Run `pnpm install`
- Verify `pnpm-lock.yaml` generated
- **Verify:** `pnpm test` → 9 tests pass

---

## Task 2: Create `.npmrc`
- Add `auto-install-peers=true` and `strict-peer-dependencies=false`
- **Verify:** No peer dependency warnings

---

## Task 3: Update CI workflow
- Change `npm ci` → `pnpm install`
- Change `npm test` → `pnpm test`
- **Verify:** Workflow YAML valid

---

## Task 4: Update package.json scripts
- `predeploy`: `npm run build` → `pnpm run build`
- **Verify:** `pnpm run lint` no errors

---

## Task 5: Update documentation
- Add pnpm setup to `.env.example`
- Update README.md installation section
- **Verify:** Docs mention pnpm consistently

---

## Task 6: Full verification
- `pnpm test` → 9 tests pass
- `pnpm run build` → success
- `pnpm run lint` → no new errors
