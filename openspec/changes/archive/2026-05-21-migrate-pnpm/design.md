# Design: Migrate from npm to pnpm

## Changes

### 1. Delete package-lock.json, install with pnpm
```bash
rm package-lock.json
pnpm install
```

### 2. `.npmrc` (NEW)
```
auto-install-peers=true
strict-peer-dependencies=false
```

### 3. `.github/workflows/test.yml`
```diff
       - name: Install dependencies
-        run: npm ci
+        run: pnpm install
```

### 4. `package.json`
```diff
-    "predeploy": "npm run build",
+    "predeploy": "pnpm run build",
```

### 5. `.gitignore`
```diff
+# pnpm
+pnpm-lock.yaml
```

Wait — we WANT to keep pnpm-lock.yaml. Let me check standard practice.

Actually, pnpm-lock.yaml should be committed (like package-lock.json). So we add pnpm-lock.yaml to .gitignore only for node_modules patterns but NOT the lockfile itself.

Actually, we commit pnpm-lock.yaml. We just remove package-lock.json and add it to .gitignore.

### 6. `.env.example`
Update comments to reference pnpm:
```
pnpm install     # install dependencies
pnpm dev         # start dev server
pnpm test        # run tests
pnpm run build   # production build
```

### 7. README.md
Update installation and development instructions to use pnpm.
