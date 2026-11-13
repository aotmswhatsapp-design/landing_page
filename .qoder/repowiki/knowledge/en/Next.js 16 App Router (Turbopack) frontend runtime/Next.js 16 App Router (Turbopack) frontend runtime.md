---
kind: external_dependency
name: Next.js 16 App Router (Turbopack) frontend runtime
slug: nextjs
category: external_dependency
category_hints:
    - framework_behavior
scope:
    - '**'
---

### Identity
- Build tooling: Turbopack via `@tailwindcss/turbopack` rule in `next.config.ts`; no PostCSS pipeline.

### Role in this repo
- Serves as the full-stack framework for the AOTMS Global marketing landing page; the app is a single static `/` route composed of eight sections.

### Durable integration shape
- App Router (`app/layout.tsx`, `app/page.tsx`) — server components by default; only genuinely interactive pieces become `"use client"` islands.
- `cacheComponents: true` + `partialPrefetching: true` — routes must stay prerenderable; avoid request-time access during render.
- Tailwind v4 tokens via `@theme` in `globals.css` (no PostCSS config).
- Fonts via `next/font` loading Geist / Geist Mono; `layout.tsx` uses typed `LayoutProps<"/">`.
- Static assets under `public/` (logo copied to `public/brand/logo.png`).

### Notes
- No third-party UI library or animation library is installed yet; 21st.dev snippets will be adapted to server-component-first conventions.
- Verify exact Next 16 / Turbopack API surface against official docs when adding new build flags.