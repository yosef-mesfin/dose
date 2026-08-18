# Dose Dependency Update and Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Patch Dose’s 2024 dependency tree, remove unused packages/dead code, and fix cleanup-level bugs so local development can resume on Next 14.

**Architecture:** Stay on the current majors (Next 14, React 18, Prisma 5, Tailwind 3). Security-patch in-range, delete unused integrations (AI SDK, Cloudinary, PDF, TanStack Query), then fix a small set of logic bugs that the cleanup surfaces.

**Tech Stack:** Next.js 14.2.x, React 18, Prisma 5, next-auth 5 beta, Tailwind 3, openai 4, Jest, TypeScript 5.

## Global Constraints

- Next.js stays on 14; install `next@14.2.35` (do not install 15 or 16).
- React stays on 18; do not install React 19 types.
- Prisma client and CLI stay on the same 5.x version.
- Do not install Tailwind 4, Zod 4, Storybook 10, ESLint 9, openai 5+, sonner 2, framer-motion 12+.
- next-auth stays on `5.0.0-beta.*` (npm `latest` is v4 — do not downgrade).
- Do not print, copy, or rewrite values from `.env`.
- Do not commit unless the user explicitly asks.
- Work on branch `chore/deps-and-cleanup`, not `main`.
- Do not add Account/Settings pages, Cloudinary uploads, or PDF support.

---

### Task 1: Branch and baseline

**Files:** none (git + test run)

**Interfaces:**
- Consumes: existing repo on `main`
- Produces: branch `chore/deps-and-cleanup`

- [ ] **Step 1: Create the working branch**

```bash
git checkout -b chore/deps-and-cleanup
```

Expected: `Switched to a new branch 'chore/deps-and-cleanup'`

- [ ] **Step 2: Run existing tests**

```bash
npm test -- --watchAll=false
```

Record failures. Known likely failure: `Button.test.tsx` expects `bg-blue-500` while `Button.tsx` uses `bg-primary`. Do not fix until Task 3.

---

### Task 2: Text-processing tests (TDD)

**Files:**
- Create: `lib/utils.test.ts`

**Interfaces:**
- Consumes: `cleanText`, `chunkedText`, `preprocessFile`, `extractText` from `lib/utils.ts`
- Produces: failing tests that prove `preprocessFile` does not chunk long strings today

- [ ] **Step 1: Write the failing tests**

Create `lib/utils.test.ts`:

```typescript
import { cleanText, chunkedText, preprocessFile } from './utils';

describe('cleanText', () => {
  it('strips SRT timestamps and extra blank lines', () => {
    const input = 'Hello\n00:00:01,000 --> 00:00:02,000\n\nWorld';
    expect(cleanText(input)).toBe('Hello\nWorld');
  });
});

describe('chunkedText', () => {
  it('splits encoded text into chunks of the given byte size', () => {
    const chunks = chunkedText('abcdefghij', 4);
    expect(chunks.join('')).toBe('abcdefghij');
    expect(chunks.length).toBeGreaterThan(1);
  });
});

describe('preprocessFile', () => {
  it('returns a single chunk when text is under 4000 characters', async () => {
    const file = new File(['short note'], 'note.txt', { type: 'text/plain' });
    await expect(preprocessFile(file)).resolves.toEqual(['short note']);
  });

  it('chunks text longer than 4000 characters', async () => {
    const text = 'a'.repeat(5000);
    const file = new File([text], 'long.txt', { type: 'text/plain' });
    const chunks = await preprocessFile(file);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.join('')).toBe(text);
  });

  it('rejects unsupported file types', async () => {
    const file = new File(['%PDF'], 'doc.pdf', { type: 'application/pdf' });
    await expect(preprocessFile(file)).rejects.toThrow('Unsupported file type');
  });
});
```

- [ ] **Step 2: Run tests and confirm the long-text case fails**

```bash
npm test -- --watchAll=false lib/utils.test.ts
```

Expected: `chunks text longer than 4000 characters` FAIL (today `cleanText.length` is `1`, so the function never chunks). Other tests in this file should pass.

---

### Task 3: Fix cleanup bugs and Button test

**Files:**
- Modify: `lib/utils.ts` (`preprocessFile` length check)
- Modify: `app/(auth)/login/actions.tsx` (`parsedCredentials.success`)
- Modify: `components/notes/create-note.tsx` (Assistant callback)
- Modify: `components/ui/Button.test.tsx` (class assertion)
- Modify: `components/notes/note-lists.tsx` (RSC error UI)
- Modify: `app/(landing page)/page.tsx` (Google sign-in)
- Modify: `tsconfig.json` (jest file extensions)

**Interfaces:**
- Consumes: tests from Task 2
- Produces: `preprocessFile` chunks on `cleanedText.length`; login validates `safeParse().success`; create-note appends summary without wiping the draft

- [ ] **Step 1: Fix chunking in `lib/utils.ts`**

In `preprocessFile`, change:

```typescript
if (cleanText.length > 4000) {
  return chunkedText(cleanedText, 4000);
}
```

to:

```typescript
if (cleanedText.length > 4000) {
  return chunkedText(cleanedText, 4000);
}
```

- [ ] **Step 2: Re-run utils tests**

```bash
npm test -- --watchAll=false lib/utils.test.ts
```

Expected: PASS

- [ ] **Step 3: Fix login validation**

In `app/(auth)/login/actions.tsx`, change `if (parsedCredentials)` to `if (parsedCredentials.success)`.

- [ ] **Step 4: Fix create-note Assistant callback**

In `components/notes/create-note.tsx`:

- Change `onAddSummary={() => handleAddSummary}` to `onAddSummary={handleAddSummary}`.
- Change `handleAddSummary` to append only (do not call `handleClose()`), matching `edit-note-modal.tsx`:

```typescript
const handleAddSummary = (summary: string) => {
  setTextContent((prev) => prev + summary);
};
```

Remove unused `isOpen` destructure if it is unused.

- [ ] **Step 5: Fix Button test to match the component**

In `components/ui/Button.test.tsx`, change the solid-variant assertion from `bg-blue-500` to `bg-primary`.

- [ ] **Step 6: Fix NoteLists server error UI**

In `components/notes/note-lists.tsx`, replace `return toast.error(noteResult.resultCode)` with a visible error element. Remove the `toast` import if unused.

```tsx
if (noteResult.type === 'error') {
  return (
    <p className="text-center text-red-500 mt-[20%]">
      Failed to load notes
    </p>
  );
}
```

- [ ] **Step 7: Fix landing Google sign-in**

In `app/(landing page)/page.tsx`, replace the `Link href="/notes"` Google button with the same server-action form used in `app/(auth)/layout.tsx`:

```tsx
<form
  action={async () => {
    'use server';
    await signIn('google');
    redirect('/notes');
  }}
>
  <Button
    size="lg"
    iconPosition="before"
    icon={<FcGoogle className="size-10" />}
    label="Continue with Google"
    className="bg-primary/10 border w-full hover:bg-primary/20"
  />
</form>
```

Add imports: `signIn` from `@/lib/auth`, `redirect` from `next/navigation`. Remove the unused `Link` import if nothing else uses it.

- [ ] **Step 8: Fix tsconfig jest includes**

In `tsconfig.json` `include`, replace `jest.setup.js` and `jest.config.js` with `jest.setup.ts` and `jest.config.ts`.

- [ ] **Step 9: Re-run the full test suite**

```bash
npm test -- --watchAll=false
```

Expected: PASS

---

### Task 4: Delete dead files and unused wrappers

**Files:**
- Delete: `lib/pdf-extracter.ts`
- Delete: `lib/preprocessFile.ts`
- Delete: `lib/cloudinary.ts`
- Delete: `lib/types/cloudinary.ts`
- Delete: `components/ui/modal.tsx`
- Modify: `lib/config.ts` — keep only `openaiConfig`
- Modify: `lib/types/config.ts` — remove `CloudinaryConfig` (delete file if empty)
- Modify: `components/providers.tsx` — remove TanStack Query
- Modify: `lib/hooks/use-autosave.tsx` — remove `console.log`
- Modify: `components/sidebar/sidebar-desktop.tsx` — remove Account/Settings
- Modify: `.storybook/main.ts` — remove Chromatic addon
- Modify: `lib/types/types.ts` and `lib/types/button.ts` — drop file-level `eslint-disable` if unused

**Interfaces:**
- Consumes: confirmation that Cloudinary / PDF / QueryClient have no remaining imports
- Produces: app compiles without those modules

- [ ] **Step 1: Delete dead files listed above**

- [ ] **Step 2: Slim `lib/config.ts` to**

```typescript
export const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
};
```

Delete `lib/types/config.ts` if it only held `CloudinaryConfig`. Confirm `openaiConfig` is still used; if `lib/openai.ts` reads `process.env` directly, `lib/config.ts` may also be unused — delete it only if grep shows no remaining imports.

- [ ] **Step 3: Remove QueryClient from `components/providers.tsx`**

Keep ThemeProvider, SidebarProvider, ModalProvider. Remove `@tanstack/react-query` imports and the `queryClient` constant.

- [ ] **Step 4: Remove debug logs from `use-autosave.tsx`**

Keep the early returns; drop `console.log` calls.

- [ ] **Step 5: Remove Account and Settings from `footerMenus` in `sidebar-desktop.tsx`**

Leave Notes / Archive / Trash. Remove unused icon imports (`MdOutlineSettings`, `MdAccountCircle`).

- [ ] **Step 6: Remove `@chromatic-com/storybook` from `.storybook/main.ts` addons**

- [ ] **Step 7: Grep to confirm no remaining imports of deleted modules**

```bash
rg "pdf-extracter|preprocessFile|lib/cloudinary|CloudinaryConfig|@tanstack/react-query|ui/modal" --glob '!node_modules/**' --glob '!package-lock.json'
```

Expected: no app imports (utils `preprocessFile` export is fine).

---

### Task 5: Remove unused npm packages

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json` (via npm)

**Interfaces:**
- Consumes: dead-code removal from Task 4
- Produces: lockfile without unused direct deps

- [ ] **Step 1: Uninstall unused packages**

```bash
npm uninstall @ai-sdk/openai ai next-cloudinary cloudinary pdf-lib pdf-parse react-intersection-observer tailwind-variants @tanstack/react-query ts-node supabase @chromatic-com/storybook
```

Expected: exit 0. `postinstall` runs `prisma generate`.

---

### Task 6: Bump remaining packages within majors

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Consumes: pruned tree from Task 5
- Produces: Next 14.2.35 + in-range updates listed below

- [ ] **Step 1: Install the Next 14 security patch and matching eslint config**

```bash
npm install next@14.2.35 eslint-config-next@14.2.35
```

- [ ] **Step 2: Bump Prisma 5 (client + CLI same version)**

```bash
npm install @prisma/client@5 prisma@5 --save-exact
```

Confirm both `package.json` entries share the same 5.x version, then `npx prisma generate`.

- [ ] **Step 3: Bump remaining in-range runtime deps**

```bash
npm install \
  @tailwindcss/typography@^0.5.20 \
  cloudinary@0.0.0 \
  next-auth@5.0.0-beta.32 \
  next-themes@^0.3.0 \
  openai@^4.104.0 \
  geist@^1.7.2 \
  framer-motion@^11.18.2 \
  react-icons@^5.7.0 \
  sonner@^1.7.4 \
  tailwind-merge@^2.6.1 \
  usehooks-ts@^3.1.1 \
  zod@^3.25.76
```

Do **not** reinstall `cloudinary`. If `next-themes@0.4` is needed later, skip it in this pass (`ThemeProviderProps` currently imports from `next-themes/dist/types`).

Correct command (no cloudinary):

```bash
npm install \
  @tailwindcss/typography@^0.5.20 \
  next-auth@5.0.0-beta.32 \
  openai@^4.104.0 \
  geist@^1.7.2 \
  framer-motion@^11.18.2 \
  react-icons@^5.7.0 \
  sonner@^1.7.4 \
  tailwind-merge@^2.6.1 \
  usehooks-ts@^3.1.1 \
  zod@^3.25.76
```

If `next-auth@5.0.0-beta.32` is unpublished, install the newest `5.0.0-beta.*` that exists (`npm view next-auth versions --json` and pick the highest beta).

- [ ] **Step 4: Bump in-range devDependencies**

```bash
npm install -D \
  @commitlint/cli@^19.8.1 \
  @commitlint/config-conventional@^19.8.1 \
  @storybook/addon-essentials@^8.6.14 \
  @storybook/addon-interactions@^8.6.14 \
  @storybook/addon-links@^8.6.18 \
  @storybook/addon-onboarding@^8.6.18 \
  @storybook/blocks@^8.6.14 \
  @storybook/nextjs@^8.6.18 \
  @storybook/react@^8.6.18 \
  @storybook/test@^8.6.15 \
  storybook@^8.6.18 \
  @testing-library/jest-dom@^6.9.1 \
  @testing-library/react@^16.3.2 \
  husky@^9.1.7 \
  prettier@^3.9.6 \
  postcss@^8.5.26 \
  tailwindcss@^3.4.19 \
  ts-jest@^29.4.12 \
  typescript@^5.9.3 \
  @types/node@^20.19.43 \
  @types/react@^18.3.31 \
  @types/react-dom@^18.3.7 \
  eslint@^8.57.1
```

Pin `@types/react` / `@types/react-dom` to 18, not 19.

- [ ] **Step 5: Confirm Next is still 14**

```bash
node -p "require('next/package.json').version"
```

Expected: starts with `14.2.`

---

### Task 7: Env example and untrack secrets file

**Files:**
- Create: `.env.example`
- Modify: git index for `.env` (`git rm --cached .env` only)

- [ ] **Step 1: Write `.env.example` with key names only**

```
DATABASE_URL=
DIRECT_URL=
AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
OPENAI_API_KEY=
```

- [ ] **Step 2: Untrack `.env` without deleting the working copy**

```bash
git rm --cached .env
```

Do not `git add` the real `.env`. Do not print its contents.

---

### Task 8: Verify

**Files:** none (commands)

- [ ] **Step 1: Tests**

```bash
npm test -- --watchAll=false
```

Expected: PASS

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: exit 0

- [ ] **Step 3: Lint**

```bash
npm run lint
```

Fix only errors introduced by this work. Do not mass-reformat the repo.

- [ ] **Step 4: Production build**

```bash
npm run build
```

Compile/type errors are blockers. If the build fails only because Prisma cannot reach the remote database, record that and continue.

- [ ] **Step 5: Audit snapshot**

```bash
npm audit --omit=dev 2>/dev/null | tail -40
```

Confirm `next` is no longer listed as needing `next@14.2.35`. Document remaining issues that require major upgrades.

---

## Self-review

- Spec coverage: unused packages, dead files, in-range bumps, listed bugs, env example, verification — each has a task.
- No Next 15/16, React 19, or Prisma 6 in any install command.
- Commits omitted (user rule: commit only when asked).
