# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured yet.

## Architecture

This is a **Next.js 16 (App Router)** project bootstrapped with `create-next-app`, using:
- **React 19** with TypeScript
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **Geist** font family (sans + mono) loaded via `next/font/google`

The app uses the `app/` directory with the App Router convention. `app/layout.tsx` defines the root layout with font variables and metadata; `app/page.tsx` is the home route. This is a fresh scaffold — no routing, data fetching, or API routes have been added yet.
