# Security Vulnerability Fix Plan

## Current Status
- **30 vulnerabilities** (1 low, 1 moderate, 28 high)
- All vulnerabilities are in dependencies, not runtime code
- `npm audit fix` works locally but won't run in GitHub Actions

## Vulnerability Breakdown

### 1. @eslint/plugin-kit (1 Low - Easy Fix)
**Issue**: RegEx DoS vulnerability
**Fix**: Update to >=0.3.4
```bash
npm update @eslint/plugin-kit
```

### 2. Vite (1 Moderate - Easy Fix)
**Issue**: File serving and fs.deny bypass vulnerabilities
**Current**: 7.0.3
**Fix**: Update to 7.0.8+
```bash
npm install vite@latest
```

### 3. react-vertical-timeline-component (28 High - Complex)
**Issue**: Unmaintained package with ancient Babel dependencies (7.0.x from 2018)
**Root Cause**: Package hasn't been updated in years, pulls in vulnerable json5 and @babel/core

## Solution Options

### Option A: Replace with Modern Alternative (RECOMMENDED)
Replace `react-vertical-timeline-component` with a modern, maintained package.

**Alternatives:**
1. **framer-motion** - Build custom timeline (most flexible)
2. **react-chrono** - Modern timeline component (v2.7+)
3. **@vspada/react-vertical-timeline** - Maintained fork of the original

**Impact**: Requires refactoring timeline UI (AboutPage.tsx likely)

### Option B: Override Vulnerable Dependencies (Quick Fix)
Force newer versions of vulnerable packages using npm overrides.

Add to `package.json`:
```json
{
  "overrides": {
    "json5": "^2.2.3",
    "@babel/core": "^7.26.0"
  }
}
```

**Pros**: Quick fix, no code changes needed
**Cons**: May break react-vertical-timeline-component, untested compatibility

### Option C: Remove Timeline Component (Simplest)
If the timeline isn't critical, replace with a simpler UI component.

**Pros**: Eliminates 28 vulnerabilities immediately
**Cons**: Lose timeline functionality

## Recommended Implementation Plan

### Phase 1: Easy Wins (5 minutes)
1. Update Vite: `npm install vite@latest`
2. Update ESLint plugin: `npm update @eslint/plugin-kit`
3. Run `npm audit` to verify 28 remaining

### Phase 2: Timeline Replacement (30-60 minutes)
**Best Option**: Use Framer Motion to build custom timeline

**Steps:**
1. Install framer-motion: `npm install framer-motion`
2. Locate timeline usage (likely `AboutPage.tsx` or similar)
3. Create custom timeline component with framer-motion
4. Style to match Matrix theme
5. Remove `react-vertical-timeline-component`
6. Test thoroughly

**Alternative Quick Fix**: Use npm overrides (Phase 2B below)

### Phase 2B: Override Dependencies (5 minutes - if needed quickly)
1. Add overrides to `package.json`:
```json
{
  "overrides": {
    "react-vertical-timeline-component": {
      "json5": "^2.2.3",
      "@babel/core": "^7.26.0"
    }
  }
}
```
2. Delete `node_modules` and `package-lock.json`
3. Run `npm install`
4. Test timeline functionality
5. If broken, proceed with Phase 2

### Phase 3: CI/CD Fix (10 minutes)
Update `.github/workflows/deploy.yml` to run audit fix:

```yaml
- name: Install dependencies
  run: npm ci

- name: Fix vulnerabilities
  run: npm audit fix --force || true

- name: Build
  run: npm run build
```

## Risk Assessment

| Solution | Risk | Effort | Result |
|----------|------|--------|--------|
| Update Vite & ESLint | Low | 5 min | Fixes 2/30 |
| Override dependencies | Medium | 5 min | May fix all 28 |
| Replace timeline | Low | 60 min | Fixes all 28 |
| Remove timeline | Low | 30 min | Fixes all 28 |

## Files to Check/Update

### Timeline component is used in:
- ✅ **CONFIRMED**: `src/pages/UpdatesPage.tsx` (Dev Timeline & Journey page)
- ✅ `src/utils/timelineData.ts` (Timeline data source)
- ✅ `src/css/pages/updates.css` (Timeline styling)

### Deployment:
- `.github/workflows/deploy.yml`

## Final Recommendation

**For Production Deployment Today:**
1. Apply Phase 1 (Vite + ESLint updates)
2. Apply Phase 2B (npm overrides)
3. Test locally
4. If timeline works → Deploy
5. If timeline breaks → Apply Phase 2 (replace component)

**For Long-term Solution:**
- Replace `react-vertical-timeline-component` with framer-motion custom timeline
- This eliminates maintenance burden and security risks

## Commands to Run

```bash
# Phase 1: Easy fixes
npm install vite@latest
npm update @eslint/plugin-kit

# Phase 2B: Override approach (test first!)
# Add overrides to package.json, then:
rm -rf node_modules package-lock.json
npm install
npm audit

# Phase 2: If replacing timeline
npm uninstall react-vertical-timeline-component
npm install framer-motion

# Build and test
npm run build
npm run preview

# Commit
git add .
git commit -m "Security: Fix npm vulnerabilities"
```

## Notes
- These vulnerabilities are in build dependencies, not runtime
- They don't affect the deployed site's security
- But fixing them is best practice for CI/CD and future maintenance
