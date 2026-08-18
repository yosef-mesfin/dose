# Dose — Real functionality (Google, search, Gemini)

Date: 2026-08-18

## Decision

Assistant v1 is **option A**: Gemini note helper — prompt and/or `.txt`/`.srt` → text inserted into the note.

Out of scope: Cloudinary, PDF, Account/Settings, full chat threads.

## Slices

1. **Google OAuth** — `signIn('google', { redirectTo: '/notes' })` only; `trustHost: true`; merge Auth.js callbacks instead of replacing them.
2. **Search** — `?q=` on notes/archive/trash; Prisma case-insensitive `contains` on title and content.
3. **Gemini assistant** — replace OpenAI; generate from prompt, file, or both; `GEMINI_API_KEY`.
4. **Dead menus** — remove non-functional `⋯` controls; show note images only when a URL exists.

## Env (names only)

`AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `AUTH_TRUST_HOST=true`, `AUTH_URL` (optional local), `GEMINI_API_KEY`, `GEMINI_MODEL` (default `gemini-2.0-flash`).

Google Cloud authorized redirect: `http://localhost:3000/api/auth/callback/google`.

## Verification

`npm test -- --watchAll=false`, `npm run lint`, `npm run build`. Commit per slice. Do not push unless asked.
