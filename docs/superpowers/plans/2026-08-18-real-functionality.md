# Dose Real Functionality Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Google sign-in, note search, and the Assistant real, and remove dead overflow menus.

**Architecture:** Keep Next 14 App Router. Auth.js Google stays; fix the server action and callbacks. Search uses `?q=` so Server Components can filter. Assistant calls Gemini from a server action with a pure prompt builder.

**Tech Stack:** Next.js 14.2.35, Auth.js 5 beta, Prisma 5, PostgreSQL, `@google/generative-ai`, Jest.

## Global Constraints

- Stay on Next 14 / React 18 / Prisma 5.
- Do not re-add OpenAI, Cloudinary, or PDF.
- Do not commit `.env`.
- Commit after each task. Do not push unless asked.
- commitlint: `type(scope): subject` with body bullets, subject not sentence-case.

---

### Task 1: Google OAuth fixes

**Files:**
- Modify: `lib/auth.ts`
- Modify: `lib/auth-actions.ts`
- Modify: `.env.example`

**Interfaces:**
- Produces: `signInWithGoogle()` calls only `signIn('google', { redirectTo: '/notes' })`

- [ ] **Step 1: Set `trustHost: true` and merge callbacks in `lib/auth.ts`**

```typescript
export const {
  handlers: { POST, GET },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  trustHost: true,
  providers: [
    // existing Credentials + GoogleProvider
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile) {
        const email =
          typeof profile.email === 'string' ? profile.email : undefined;
        if (!email) return false;
        try {
          const result = await createGoogleUser(profile);
          return result.type === 'success';
        } catch (error) {
          console.error('Error in signIn callback:', error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (!session.user?.email) return session;
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) {
        session.user = {
          ...session.user,
          id: user.id,
          emailVerified: user.emailVerified,
        };
      }
      return session;
    },
  },
});
```

- [ ] **Step 2: Replace `lib/auth-actions.ts` with**

```typescript
'use server';

import { signIn } from '@/lib/auth';

export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/notes' });
}
```

- [ ] **Step 3: Add to `.env.example`**

```
AUTH_TRUST_HOST=true
AUTH_URL=http://localhost:3000
```

- [ ] **Step 4: Commit**

```
fix(auth): complete Google OAuth sign-in flow
```

---

### Task 2: Search

**Files:**
- Create: `lib/notes-query.ts`
- Create: `lib/notes-query.test.ts`
- Modify: `app/(notes)/actions.ts` (`getNotes`)
- Modify: `lib/notes.ts`
- Modify: `components/notes/note-lists.tsx`
- Modify: `components/search.tsx`
- Modify: `app/(notes)/layout.tsx`
- Modify: `app/(notes)/notes/page.tsx`
- Modify: `app/(notes)/archive/page.tsx`
- Modify: `app/(notes)/trash/page.tsx`

**Interfaces:**
- Produces: `buildNotesWhere({ userId, isArchived, isTrashed, query })` → Prisma where
- Produces: `getNotes({ isArchived, isTrashed, query })`

- [ ] **Step 1: Write `lib/notes-query.test.ts`**

```typescript
import { buildNotesWhere } from './notes-query';

describe('buildNotesWhere', () => {
  it('filters by user and archive/trash flags', () => {
    expect(
      buildNotesWhere({ userId: 'u1', isArchived: false, isTrashed: false })
    ).toEqual({
      userId: 'u1',
      isArchived: false,
      isTrashed: false,
    });
  });

  it('adds case-insensitive title/content contains when query is set', () => {
    expect(
      buildNotesWhere({
        userId: 'u1',
        isArchived: false,
        isTrashed: false,
        query: '  hello  ',
      })
    ).toMatchObject({
      OR: [
        { title: { contains: 'hello', mode: 'insensitive' } },
        { content: { contains: 'hello', mode: 'insensitive' } },
      ],
    });
  });

  it('ignores blank query', () => {
    const where = buildNotesWhere({
      userId: 'u1',
      query: '   ',
    });
    expect(where.OR).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails** (`Cannot find module './notes-query'`)

- [ ] **Step 3: Implement `lib/notes-query.ts`**

```typescript
import type { Prisma } from '@prisma/client';

export function buildNotesWhere(params: {
  userId: string;
  isArchived?: boolean;
  isTrashed?: boolean;
  query?: string;
}): Prisma.NoteWhereInput {
  const where: Prisma.NoteWhereInput = {
    userId: params.userId,
    isArchived: params.isArchived,
    isTrashed: params.isTrashed,
  };
  const query = params.query?.trim();
  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { content: { contains: query, mode: 'insensitive' } },
    ];
  }
  return where;
}
```

- [ ] **Step 4: Wire `getNotes` / `loadNotes` / pages**

`getNotes` accepts `query?: string` and uses `buildNotesWhere`. Pages take `searchParams.q` and pass it to `NoteLists`.

Search box: debounce `router.replace` of `?q=` on the current pathname. Wrap `<Search />` in `<Suspense>` in the notes layout.

- [ ] **Step 5: Run tests, then commit**

```
feat(notes): filter notes from the search box
```

---

### Task 3: Gemini assistant

**Files:**
- Create: `lib/assistant-prompt.ts`
- Create: `lib/assistant-prompt.test.ts`
- Create: `lib/gemini.ts` (replace `lib/openai.ts`)
- Modify: `lib/summary/actions.ts`
- Modify: `components/summary/summary-modal.tsx`
- Modify: `components/summary/summary-welcome.tsx`
- Modify: `.env.example`
- Modify: `package.json` (add `@google/generative-ai`, remove `openai`)

**Interfaces:**
- Produces: `buildAssistantPrompt({ prompt?: string; content?: string[] }): string`
- Produces: `generateAssistantReply({ prompt?: string; content?: string[] }): Promise<string>`

- [ ] **Step 1: Test `buildAssistantPrompt`**

- prompt only → that prompt
- content only → `Summarize the following text:\n\n` + joined chunks
- both → prompt, then `---`, then joined chunks
- neither → throw `Nothing to generate`

- [ ] **Step 2: Implement prompt builder + Gemini client**

```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  });
}
```

`generateAssistantReply` builds the prompt and returns `result.response.text()`.

Modal: `handleGenerate` runs if `prompt.trim()` or `fileChunks`; send both into `generateAssistantReply`. Welcome copy: prompt and/or file.

- [ ] **Step 3: `npm uninstall openai && npm install @google/generative-ai`**

- [ ] **Step 4: Tests + commit**

```
feat(assistant): generate note text with Gemini
```

---

### Task 4: Dead overflow menus

**Files:**
- Modify: `components/notes/create-note.tsx` (remove `AiOutlineMore` button)
- Modify: `components/notes/edit-note-modal.tsx` (same)
- Modify: `components/notes/note-card.tsx` (remove `FaEllipsisV`; render image only if `imageUrls?.[0]`)

- [ ] **Step 1: Remove the inert controls and empty-image render**
- [ ] **Step 2: Tests + commit**

```
fix(notes): remove inert overflow menus
```

---

## Self-review

- Google, search, Gemini, dead menus each have a task.
- No Cloudinary/PDF/Account in this plan.
- Commit after each task; no push.
