---
kind: configuration_system
name: Next.js App Shell — Minimal Build-Time Configuration Only
category: configuration_system
scope:
    - '**'
source_files:
    - frontend/next.config.ts
    - frontend/package.json
---

## What system/approach is used

This repository is a Next.js 16 app shell (created via `create-next-app`) and does **not** implement an application-level runtime configuration system. There is no config loader, no `.env` files, no feature-flag library, and no secrets manager integration. The only configuration present is build-time configuration consumed by the Next.js framework itself.

## Key files and packages

- `frontend/next.config.ts` — the sole Next.js configuration file; declares `cacheComponents`, `partialPrefetching`, and a Turbopack CSS rule for `@tailwindcss/turbopack`.
- `frontend/package.json` — defines npm scripts (`dev`, `build`, `start`, `lint`) and pins Next.js 16.4.6, React 19.3.0, Tailwind CSS 4.3.3, and `@tailwindcss/turbopack` 4.3.3.
- `frontend/tsconfig.json` — TypeScript compiler options (no runtime config).
- `frontend/eslint.config.mjs` — ESLint configuration (no runtime config).
- `frontend/.gitignore` — excludes `node_modules`, `.next`, etc.

No `.env`, `.env.local`, `.env.production`, or any other environment-file variant exists in the tree. A grep for `process.env` / `NEXT_PUBLIC_` across all `.ts`/`.tsx`/`.js`/`.mjs` files returns zero matches, confirming that no code reads environment variables at runtime.

## Architecture and conventions

- **Framework-only configuration**: All behavior is driven by Next.js's built-in config surface (`next.config.ts`). There is no custom config module, no `config/` directory, and no runtime config resolution layer.
- **Turbopack-first build pipeline**: `next.config.ts` enables `turbopack.rules` with a `*.css` rule pointing to `@tailwindcss/turbopack`, indicating the project uses Turbopack as the dev/build bundler rather than Webpack.
- **Tailwind v4 via Turbopack**: Tailwind is configured through the Turbopack loader rather than a separate `tailwind.config.*` file (none exists in the repo).
- **No runtime env vars**: Since no source file references `process.env` or `NEXT_PUBLIC_*`, there is no convention for exposing environment values to the browser or server.
- **No feature flags or secret management**: No libraries or modules for feature toggles, remote config, or secret injection are present.

## Conventions and constraints

- Observed pattern: configuration is limited to static JSON-like objects inside `next.config.ts`; nothing is loaded dynamically at runtime.
- Enforced by absence: there are no `.env*` files in the repository, so no environment variable loading convention exists to follow.
- Enforced by dependency list: `package.json` contains no runtime configuration libraries (e.g., `dotenv`, `conf`, `feature-flags`, `unleash`), so adding such functionality would require explicit installation.
- The only build-time knobs currently exposed are `cacheComponents`, `partialPrefetching`, and the Turbopack CSS loader rule — all hard-coded literals in `next.config.ts`.