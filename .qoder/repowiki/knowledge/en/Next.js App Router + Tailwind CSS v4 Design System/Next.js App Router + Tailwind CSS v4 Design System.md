---
kind: frontend_style
name: Next.js App Router + Tailwind CSS v4 Design System
category: frontend_style
scope:
    - '**'
source_files:
    - frontend/app/globals.css
    - frontend/app/layout.tsx
    - frontend/app/page.tsx
    - frontend/next.config.ts
    - frontend/package.json
---

## Approach

This is the default `create-next-app` template (Next.js 16 / React 19) styled with **Tailwind CSS v4** (`tailwindcss@4.3.3`, `@tailwindcss/turbopack@4.3.3`) and compiled via **Turbopack**. There is no separate design system, component library, or custom CSS framework — styling is done inline with Tailwind utility classes in JSX and a small set of global CSS variables for theming.

## Key Files

- `frontend/app/globals.css` — single stylesheet that imports Tailwind, defines CSS custom properties for colors/fonts, and exposes an `@theme inline` block.
- `frontend/app/layout.tsx` — root layout that injects Google Fonts (Geist Sans & Geist Mono) as CSS variables (`--font-geist-sans`, `--font-geist-mono`) and applies base Tailwind utilities (`h-full antialiased`, `min-h-full flex flex-col`).
- `frontend/app/page.tsx` — example page using Tailwind utilities throughout; demonstrates dark-mode variants (`dark:`), responsive prefixes (`sm:`, `md:`), and semantic color tokens (`bg-foreground`, `text-background`).
- `frontend/next.config.ts` — configures Turbopack to use `@tailwindcss/turbopack` as the loader for `*.css` files.
- `frontend/package.json` — declares Tailwind v4 and Turbopack as devDependencies.

## Architecture and Conventions

### Theme tokens
Global CSS custom properties are defined in `globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

These are re-exported into Tailwind's theme via `@theme inline`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(----font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

This makes `bg-background`, `text-foreground`, `font-sans`, and `font-mono` available as Tailwind utilities. The font variables are populated by `next/font/google` in `layout.tsx`.

### Dark mode
Dark mode is handled through a `prefers-color-scheme: dark` media query in `globals.css` that overrides `--background` and `--foreground`. Components then use Tailwind's `dark:` variant (e.g., `dark:bg-black`, `dark:text-zinc-50`) rather than a class-based dark-mode strategy.

### Typography
Fonts are loaded at build time via `next/font/google` (Geist Sans and Geist Mono). They are exposed as CSS variables and referenced through Tailwind's `--font-*` theme keys. The `<body>` falls back to `Arial, Helvetica, sans-serif` in `globals.css`.

### Responsive strategy
Responsive breakpoints are applied inline with Tailwind's standard prefixes (`sm:`, `md:`) directly on JSX elements — e.g., `sm:items-start sm:text-left`, `md:w-[158px]`. No custom breakpoint configuration is present.

### Color palette
The codebase uses Tailwind's built-in zinc scale (`zinc-50`, `zinc-600`, `zinc-950`, `zinc-400`) plus the semantic `foreground`/`background` tokens. No custom color palette file exists.

### Component styling convention
There is no component library. UI components (if any beyond the default `page.tsx`) style themselves with Tailwind utility classes directly in JSX. The default `Home` component is a flat JSX tree composed entirely of utility classes — no CSS modules, no CSS-in-JS, no BEM classes.

## Conventions and Constraints

- **Styling toolchain**: All styles go through Tailwind CSS v4 processed by Turbopack; this is enforced by the `@tailwindcss/turbopack` loader rule in `next.config.ts` for `*.css`.
- **Theme entry point**: Global CSS is imported once from `app/layout.tsx` via `import "./globals.css"`; this is the Next.js App Router convention and is the only place the stylesheet is attached.
- **Design tokens**: Colors and fonts are centralized as CSS custom properties in `globals.css` and surfaced to Tailwind via `@theme inline`; new tokens should be added there rather than hard-coded values scattered across components.
- **Dark mode**: Implemented via `prefers-color-scheme` in CSS and `dark:` Tailwind variants in JSX — not via a JS-driven dark-mode toggle.
- **No custom Tailwind config**: There is no `tailwind.config.*` file; all customization happens through the `@theme inline` block in `globals.css` and the Next.js config.
- **Font loading**: Fonts are loaded exclusively through `next/font/google` and injected as CSS variables; direct `@import` of web fonts elsewhere is not used.