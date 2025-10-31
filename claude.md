# GitHub Pages Root Domain Migration Plan

## Problem Statement
Currently, the website is deployed at `https://thomasjbutler.github.io/ThomasJButler` with the repository name appearing twice in the URL. The goal is to migrate to `https://thomasjbutler.github.io` (root domain).

## Solution Overview
To achieve this, the repository needs to be renamed to match the GitHub username exactly (thomasjbutler.github.io), and all base path references need to be removed from the codebase.

## Critical Changes Required

### 1. GitHub Repository Configuration
**Action**: Rename repository from `ThomasJButler` to `thomasjbutler.github.io`
- This is the ONLY way to get GitHub Pages to serve at the root domain
- GitHub Pages rule: `username.github.io` repositories are served at root
- All other repositories are served at `/repository-name/`

### 2. Package.json ([package.json](package.json))
**Current**:
```json
"homepage": "https://thomasjbutler.github.io/ThomasJButler"
```
**Change to**:
```json
"homepage": "https://thomasjbutler.github.io"
```

### 3. Vite Configuration ([vite.config.mjs](vite.config.mjs))
**Line 9 - Remove base path**:
```javascript
// Current:
base: '/ThomasJButler/',
// Change to:
base: '/',
```

**Lines 46-49 & 73-89 - Update middleware paths**:
Remove `/ThomasJButler` prefix from all middleware URL checks

**Line 122 - Update dev server open path**:
```javascript
// Current:
open: '/ThomasJButler/react.html',
// Change to:
open: '/react.html',
```

### 4. React Router Configuration ([src/App.tsx](src/App.tsx))
**Line 102 - Remove basename**:
```javascript
// Current:
<Router basename="/ThomasJButler">
// Change to:
<Router>
```

### 5. Blog Loader Utility ([src/utils/blogLoader.ts](src/utils/blogLoader.ts))
**Lines 134 - Update production base path**:
```javascript
// Current:
return '/ThomasJButler';
// Change to:
return '';
```

### 6. HTML Files
Update all HTML files that contain `/ThomasJButler` references:
- [index.html](index.html)
- [react.html](react.html)
- [blog.html](blog.html)

### 7. Other Files with Path References
Update the following files to remove `/ThomasJButler` prefix:
- [src/components/Header.tsx](src/components/Header.tsx)
- [src/components/Footer.tsx](src/components/Footer.tsx)
- [src/pages/SitemapPage.tsx](src/pages/SitemapPage.tsx)
- [src/pages/ProjectsPage.tsx](src/pages/ProjectsPage.tsx)
- [src/utils/timelineData.ts](src/utils/timelineData.ts)
- [public/manifest.json](public/manifest.json)

### 8. Test Files
Update test files that reference the base path:
- [src/__tests__/App.test.tsx](src/__tests__/App.test.tsx)
- [src/__tests__/migration-validation.test.tsx](src/__tests__/migration-validation.test.tsx)
- [src/pages/__tests__/SitemapPage.test.tsx](src/pages/__tests__/SitemapPage.test.tsx)

## Implementation Order

1. **First**: Update all code files (steps 2-8)
2. **Build & Test**: Run `npm run build` locally to ensure everything works
3. **Commit**: Commit all changes to the repository
4. **Rename Repository**: Go to GitHub Settings > General > Repository name
   - Change from `ThomasJButler` to `thomasjbutler.github.io`
5. **Wait**: GitHub Pages will automatically redeploy at the root domain

## Important Notes

- **Repository Name Must Match**: The repository MUST be named `thomasjbutler.github.io` (lowercase) to work at root domain
- **Automatic Redirect**: GitHub will automatically redirect the old URL to the new one
- **DNS Propagation**: Changes may take 10-20 minutes to fully propagate
- **Local Development**: Will continue to work normally at `localhost:3000`
- **No CNAME Needed**: Since using github.io domain, no CNAME file is required

## Verification Steps

After deployment:
1. Visit `https://thomasjbutler.github.io` - should load the site
2. Check all internal navigation works correctly
3. Verify blog posts load properly
4. Test that old URL redirects to new one
5. Check browser console for any 404 errors

## Rollback Plan

If issues occur:
1. Rename repository back to `ThomasJButler`
2. Revert the code changes via git
3. Push to trigger redeployment

This approach ensures a clean URL structure while maintaining all functionality.