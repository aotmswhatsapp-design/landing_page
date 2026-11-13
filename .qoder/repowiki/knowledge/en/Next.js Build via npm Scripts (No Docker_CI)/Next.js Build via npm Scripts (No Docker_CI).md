---
kind: build_system
name: Next.js Build via npm Scripts (No Docker/CI)
category: build_system
scope:
    - '**'
source_files:
    - frontend/package.json
    - frontend/next.config.ts
---

## Build System Overview

This repository is a Next.js 16 frontend application. The build system is minimal and relies entirely on the default Next.js toolchain invoked through npm scripts — there are no Makefiles, Dockerfiles, CI pipelines, release scripts, or cross-compilation configuration anywhere in the repo.

### What system/approach is used

- **Framework**: Next.js 16.4.6 with React 19.3.0 and TypeScript 5.
- **Build tooling**: `next build` (via npm script) produces the production bundle; `next dev` for development; `next start` to serve the built output.
- **CSS pipeline**: Tailwind CSS v4.3.3 integrated through `@tailwindcss/turbopack`, configured as a Turbopack loader rule for `*.css` files in `next.config.ts`.
- **Dependency management**: npm (`package-lock.json` present); versions pinned in `package.json`.

### Key files

- `frontend/package.json` — defines the four npm scripts (`dev`, `build`, `start`, `lint`) and all runtime/dev dependencies.
- `frontend/next.config.ts` — enables `cacheComponents`, `partialPrefetching`, and registers the Tailwind Turbopack loader for CSS.
- `frontend/tsconfig.json` — TypeScript compilation settings (inherited from the Next.js template).
- `frontend/eslint.config.mjs` — ESLint 9 configuration (used by the `lint` script).

### Architecture and conventions

- All build logic lives in `package.json` scripts; there is no custom build orchestration layer.
- The app follows the Next.js App Router layout under `frontend/app/` (`layout.tsx`, `page.tsx`, `globals.css`).
- Static assets live under `frontend/public/`.
- The `.next/` directory is the generated build output (present in the tree, indicating builds have been run locally).

### Conventions and constraints

- Development, building, and serving are performed exclusively through the npm scripts defined in `frontend/package.json`:
  - `npm run dev` → `next dev`
  - `npm run build` → `next build`
  - `npm run start` → `next start`
  - `npm run lint` → `eslint`
- There is no Makefile, Dockerfile, GitHub Actions workflow, CI YAML, release automation, version-bumping script, or cross-compile configuration found anywhere in the repository.
- Dependency versions are declared directly in `package.json` (no lockfile override strategy beyond the standard `package-lock.json`).
- The project is marked `"private": true` in `package.json`, so it is not published as an npm package.