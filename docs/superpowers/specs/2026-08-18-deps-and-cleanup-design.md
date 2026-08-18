# Dose — Dependency Update and Code Cleanup

Date: 2026-08-18

## Problem

Dose last shipped in December 2024. `npm install` currently reports **69 vulnerabilities** (9 critical, 29 high). Most direct dependencies are 1–2 years behind. The tree also includes packages that are never imported, plus dead files and a handful of logic bugs left mid-feature.

## Goal

Make the repo installable, patchable, and maintainable so product work can resume:

1. Clear critical/high issues that have in-range fixes.
2. Remove unused packages and dead code.
3. Fix cleanup-level bugs that would bite during local run.
4. Stay on the stack the app was written for so this is an update, not a rewrite.

## Non-goals

- Next.js 15/16, React 19, Prisma 6, Tailwind 4, Zod 4, Storybook 10, ESLint 9.
- New product features (Account, Settings, Cloudinary uploads, PDF summarization).
- Rotating committed secrets (call out only; user action).
- Committing unless explicitly asked.

## Chosen approach

**Stay on current majors; bump to latest compatible wanted versions; prune unused deps.**

| Keep | Target | Why not latest major |
|------|--------|----------------------|
| Next.js 14 | `14.2.35` (audit fix) | 15/16 need async request APIs + React 19 |
| React 18 | stay | Pairs with Next 14 |
| Prisma 5 | latest 5.x | 6 is a breaking migrate |
| Tailwind 3 | latest 3.4.x | 4 is a new engine |
| next-auth v5 beta | latest `5.0.0-beta.*` | npm `latest` is v4 |
| openai SDK 4 | latest 4.x | v5/v6 API break |
| Storybook 8 | latest 8.6.x | 10 is a new architecture |
| ESLint 8 | 8.57.x + `eslint-config-next@14.2.35` | 9 needs flat config |
| TypeScript 5 | 5.9.x | 7 is a different compiler |
| zod 3 | latest 3.x | 4 is breaking |
| sonner 1 | latest 1.x | 2 is breaking |
| framer-motion 11 | latest 11.x | 12/13 rename/API |

## Unused packages to remove

Never imported in app/lib/components (only listed in `package.json`):

- `@ai-sdk/openai`, `ai` — summarization uses `openai` directly
- `next-cloudinary`, `cloudinary` — upload helper unused; notes store base64
- `pdf-lib`, `pdf-parse` — PDF extractor is fully commented out
- `react-intersection-observer`
- `tailwind-variants`
- `@tanstack/react-query` — provider wraps the tree; no `useQuery`/`useMutation`
- `ts-node` — Jest uses `ts-jest` / `next/jest`
- `supabase` CLI — hosted Postgres via `DATABASE_URL` only

## Dead files / code to remove

- `lib/pdf-extracter.ts` (entire file commented)
- `lib/preprocessFile.ts` (duplicate of `lib/utils.ts`; unused)
- `lib/cloudinary.ts`, `lib/types/cloudinary.ts`
- Cloudinary block in `lib/config.ts` and `lib/types/config.ts`
- `components/ui/modal.tsx` (never imported; live modal is `use-modal` + `dialog`)
- QueryClient wrapper in `components/providers.tsx`
- Chromatic addon if it is only wired in Storybook with no Chromatic project (keep Storybook essentials/links/interactions)
- Sidebar Account / Settings links (routes do not exist; catch-all redirects)
- Debug `console.log` in `lib/hooks/use-autosave.tsx`

## Bugs in scope (cleanup, not new features)

1. **`preprocessFile` never chunks** — `if (cleanText.length > 4000)` uses the function’s arity (`1`), not the string. Use `cleanedText.length`.
2. **Create-note Assistant callback** — `onAddSummary={() => handleAddSummary}` drops the summary; `handleAddSummary` also calls `handleClose()` and wipes the draft. Match edit-note: append text, stay open.
3. **Login `safeParse`** — `if (parsedCredentials)` is always true. Use `parsedCredentials.success`.
4. **Button test** — expects `bg-blue-500`; component uses `bg-primary`. Align the test with the component.
5. **`NoteLists` in a Server Component** calls `toast.error(...)`. Return an error element instead.
6. **Landing Google button** is a `Link` to `/notes`. Use the same `signIn('google')` server action as the auth layout.
7. **`tsconfig.json` include** lists `jest.setup.js` / `jest.config.js`; files are `.ts`.

## Env / secrets (limited)

- Add `.env.example` with **key names only** (`DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `OPENAI_API_KEY`).
- `.env` is already in `.gitignore` but **is tracked**. Untrack with `git rm --cached .env` (leave the local file). Do not print or rewrite secret values.
- Recommend rotating the committed DB/Auth/Google secrets; do not rotate from this change.

## Verification

- `npm test` — existing Button tests plus new `lib/utils` text-processing tests.
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build` (may fail if remote DB/schema is unreachable; treat compile errors as blockers, DB connectivity as a note)
- `npm audit` — critical Next.js issue should resolve via `next@14.2.35`; leftover transitive issues documented, not force-fixed with `--force`

## Out of scope leftovers (for later product work)

- Prisma `Note` model has no matching migration.
- No `middleware.ts` (auth is layout-based).
- PDF summarization and Cloudinary image hosting.
- Account / Settings pages.
- `npm audit` items that only fix by jumping majors (`ai@6`, `eslint-config-next@16`, Storybook 10).
