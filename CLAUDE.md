# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-page Next.js app ("Turnos de Matrícula") for students of FISI (a university engineering faculty) to calculate their enrollment time slot (`turno`) from their weighted average (`promedio ponderado`, 0-19 scale). Content and UI copy are in Spanish. Originally scaffolded with v0.dev.

## Commands

```
npm run dev      # start dev server
npm run build    # production build
npm run start    # run production build
npm run lint     # next lint
```

There is no test suite configured in this repo.

Note: `next.config.mjs` sets `eslint.ignoreDuringBuilds: true` and `typescript.ignoreBuildErrors: true`, so `next build` will succeed even with type or lint errors — don't rely on a clean build as a correctness signal. Run `npm run lint` and `tsc --noEmit` explicitly when you need that feedback.

## Architecture

- App Router, single route: `app/page.tsx` renders the whole page as a vertical stack of sections wrapped in `framer-motion` stagger animations: `Header` → `HeroSection` → (`CalculatorSection` + `ScheduleTable` side by side) → `Footer`.
- Active feature components live under `components/layout/` (`Header.tsx`, `Footer.tsx`) and `components/sections/` (`HeroSection.tsx`, `CalculatorSection.tsx`, `ScheduleTable.tsx`). These are the ones actually imported by `app/page.tsx`.
- `components/calculator.tsx`, `components/hero.tsx`, `components/footer.tsx`, `components/navbar.tsx`, and `components/schedule-table.tsx` are earlier/orphaned versions with no remaining imports anywhere — do not edit them expecting changes to show up in the app; if touching this area, prefer deleting the dead ones over updating both.
- `components/ui/` is the shadcn/ui (New York style) component set, configured via `components.json` (base color `neutral`, no class prefix, RSC + TSX on). Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Domain logic (the turn-calculation table and thresholds) is duplicated inline inside `CalculatorSection.tsx` and `ScheduleTable.tsx` as local objects/functions (`turnSchedules`, `calculateTurn`, `scheduleData`) rather than shared from `lib/`. When changing the turno/average mapping or its copy (e.g. presencial enrollment date/time notices), update it in both places to keep the calculator result and the displayed table consistent.
- Styling: Tailwind CSS v4 (via `@tailwindcss/postcss`), Geist Sans/Mono fonts loaded in `app/layout.tsx`.
