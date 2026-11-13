---
kind: dependency_management
name: npm-based dependency management with lockfile and pinned versions
category: dependency_management
scope:
    - '**'
source_files:
    - frontend/package.json
    - frontend/package-lock.json
    - frontend/.gitignore
    - frontend/next.config.ts
---

## Approach

The project uses **npm** as its package manager for a Next.js 16 frontend. Dependencies are declared in `frontend/package.json`, with a deterministic install graph captured by `frontend/package-lock.json`. There is no vendoring of third-party packages — the `node_modules/` directory is present locally but ignored from version control.

## Key files

- `frontend/package.json` — declares runtime dependencies (`next`, `react`, `react-dom`) and dev dependencies (`tailwindcss`, `@tailwindcss/turbopack`, `eslint`, `typescript`, `@types/*`).
- `frontend/package-lock.json` — npm lockfile pinning every transitive dependency to an exact tarball URL under `https://registry.npmjs.org/...` (e.g. `resolved: "https://registry.npmjs.org/@babel/core/-/core-7.29.13.tgz"`), ensuring reproducible installs.
- `frontend/.gitignore` — explicitly ignores `/node_modules`, `.pnp`, `.yarn/*`, and related artifacts, while leaving `package-lock.json` tracked.
- `frontend/next.config.ts` — configures Turbopack rules for Tailwind CSS v4 via `@tailwindcss/turbopack`, tying the build toolchain to the declared dependencies.

## Versioning conventions observed

- **Runtime deps** are pinned to exact versions: `next@16.4.6`, `react@19.3.0`, `react-dom@19.3.0`, `tailwindcss@4.3.3`, `@tailwindcss/turbopack@4.3.3`, `eslint-config-next@16.4.6`.
- **Dev-only type/tooling deps** use caret ranges (`^20`, `^19`, `^9`, `^5`) for `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `typescript`, allowing minor/patch upgrades within the major version.
- The `name` field marks the package as `private: true`, so it is not published to the registry.
- Scripts expose `dev`, `build`, `start`, and `lint` (via `next` CLI and `eslint`).

## Registry and private-package configuration

No `.npmrc`, `NPM_CONFIG_*` environment variables, or `resolutions`/`overrides` fields were found in the repository. All resolved URLs in the lockfile point at the public `https://registry.npmjs.org/` endpoint, indicating no private registry or scoped-registry overrides are configured at this level.

## Vendoring / workspace strategy

- No `pnpm-workspace.yaml`, `lerna.json`, `turbo.json`, or monorepo workspace manifests exist.
- No `vendor/`, `third_party/`, or similar vendored directories are present.
- The `.gitignore` includes Yarn/PnP/Yarn Berry patterns (`.pnp`, `.pnp.*`, `.yarn/*`) as compatibility noise, but the project itself uses npm (lockfile + scripts).

## Constraints enforced by the setup

- `node_modules/` is gitignored, so dependency trees must be reproduced from `package.json` + `package-lock.json` rather than committed snapshots.
- Exact-version pins on runtime dependencies combined with the lockfile enforce deterministic builds; upgrading a runtime dep requires an explicit edit to `package.json` followed by regeneration of the lockfile.
- The `next.config.ts` enforces that Tailwind CSS v4 is processed through the Turbopack loader (`@tailwindcss/turbopack`) rather than the standard PostCSS pipeline.