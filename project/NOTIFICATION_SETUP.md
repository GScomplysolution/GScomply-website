# Email Notification System — Resend Setup Guide

## What the code actually does (read this first)

Your codebase does **not** use EmailJS. It already has a working Resend
integration — a Supabase Edge Function called `email-sender`
(`supabase/functions/email-sender/index.ts`). Both forms call it:

- `src/pages/Contact.tsx` → contact form → `type: 'contact'`
- `src/components/Footer.tsx` → newsletter signup → `type: 'newsletter'`

Flow for the contact form:
1. Form data is inserted into the `contact_submissions` table in Supabase.
2. The browser calls `supabase.functions.invoke('email-sender', { type: 'contact', data })`.
3. The Edge Function sends **two** emails via the Resend API:
   - An admin notification to `info.gscomply@gmail.com` (with `reply_to` set to the visitor's email)
   - A confirmation email to the visitor themselves

There was a leftover, unused `src/lib/emailService.ts` file that used the
`@emailjs/browser` package and an outdated `.env.example`. Nothing imported
that file — it was dead code from an earlier version of the site and has
been removed, along with the `@emailjs/browser` dependency, to avoid
confusion. **Resend is, and should remain, the only email path.**

## Why the form was failing

The Edge Function reads three secrets from the Supabase Edge Function
environment (not from `.env` / Vercel — those are separate systems):

```
RESEND_API_KEY   — your Resend API key
FROM_EMAIL       — defaults to onboarding@resend.dev if unset
ADMIN_EMAIL      — defaults to info.gscomply@gmail.com if unset
```

The most common reasons this breaks:

1. **`RESEND_API_KEY` was never set as a Supabase secret.** The function
   returns a 500 with `"Email service not configured"` — check your browser
   console/network tab on `/contact` for this.
2. **Still using the default `FROM_EMAIL` (`onboarding@resend.dev`).**
   Resend's shared test address can only send to the email address you
   signed up to Resend with. It will fail (HTTP 403) for both the admin
   notification to `info.gscomply@gmail.com` *and* the confirmation email to
   the visitor, unless that happens to be your Resend account's own email.
   **This is almost certainly what's happening here** — fix it by verifying
   `gscomply.com` in Resend (Step 2 below) and sending from an address on
   that domain.
3. **`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` missing on the live
   site.** These are separate from the Resend secrets — they're read by the
   frontend (`src/lib/supabase.ts`) and must be set in **Vercel → Project →
   Settings → Environment Variables**, not just locally. Since you moved
   the domain to `gscomply.com`, double-check these are set for the
   **Production** environment tied to that domain (Vercel keeps env vars
   per-project, not per-domain, so this is usually fine after a domain swap
   — but re-verify after any redeploy).
4. **The Edge Function was never deployed**, or was deployed under a
   different name than `email-sender`.

## Step 1 — Get a Resend API key

1. Sign up / log in at [resend.com](https://resend.com).
2. Go to **API Keys** → **Create API Key**. Give it "Sending access" scope.
3. Copy the key (starts with `re_`) — you won't see it again.

## Step 2 — Verify gscomply.com so you can send from it

You must verify your domain before you can send to arbitrary recipients
(including your own visitors and `info.gscomply@gmail.com`).

1. In Resend, go to **Domains** → **Add Domain** → enter `gscomply.com`.
2. Resend shows you DNS records to add (typically an MX record, a TXT/SPF
   record, and one or more DKIM CNAME records).
3. Add those exact records in your DNS provider for `gscomply.com` (wherever
   you manage DNS — this is separate from Vercel unless you're using
   Vercel's DNS).
4. Wait for verification (a few minutes up to ~24h), then refresh the
   Domains page in Resend until it shows **Verified**.
5. Pick a sender address on that domain, e.g. `info@gscomply.com` or
   `no-reply@gscomply.com`. You do **not** need this to be a real inbox for
   *sending* — but if you want to receive replies at it, set up email
   hosting/forwarding for that mailbox separately (Resend only sends, it
   doesn't provide inboxes).

## Step 3 — Set the Edge Function secrets in Supabase

**Dashboard:** Supabase project → **Edge Functions** → `email-sender` →
**Secrets**, add:

| Key | Value |
|---|---|
| `RESEND_API_KEY` | `re_xxxxxxxxxxxxxxxx` (from Step 1) |
| `FROM_EMAIL` | `info@gscomply.com` (must be on the verified domain from Step 2) |
| `ADMIN_EMAIL` | `info.gscomply@gmail.com` |

**Or via CLI**, from the `project/` directory:

```bash
supabase link --project-ref <your-project-ref>
supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
supabase secrets set FROM_EMAIL=info@gscomply.com
supabase secrets set ADMIN_EMAIL=info.gscomply@gmail.com
supabase functions deploy email-sender
```

Redeploying after setting secrets isn't strictly required (secrets are read
at request time), but running `supabase functions deploy email-sender` at
least once ensures the function itself is live.

## Step 4 — Set frontend env vars in Vercel

**Vercel → your project → Settings → Environment Variables** (Production):

| Key | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://<your-project-ref>.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | your Supabase anon/public key |

Redeploy after adding/changing these — Vite bakes `VITE_*` vars in at build
time, so they won't take effect until the next build.

## Step 5 — Test

1. Go to `https://gscomply.com/contact`, submit the form with a real email
   address you can check.
2. You should get two emails: one to that address (confirmation) and one to
   `info.gscomply@gmail.com` (admin alert, reply-to set to the visitor).
3. If nothing arrives, open DevTools → **Network** tab, find the
   `email-sender` request, and check the response body — it returns a
   descriptive JSON error (e.g. `RESEND_API_KEY is not configured` or a
   `Resend API error: 403 - ...` if the domain isn't verified yet).
4. Also check the Supabase Dashboard → **Edge Functions** → `email-sender`
   → **Logs** for server-side errors.
5. In Resend, **Emails** (dashboard) shows every send attempt and its
   delivery status, which is the fastest way to confirm what actually
   happened after the API call.

## Editing the email templates

Both the admin-notification and visitor-confirmation HTML are generated
in-line in `supabase/functions/email-sender/index.ts`:

- `generateContactAdminEmail(data)` / `generateContactUserEmail(data)` — contact form
- `generateNewsletterAdminEmail(data)` / `generateNewsletterUserEmail()` — newsletter

Edit the HTML strings directly, then redeploy:

```bash
supabase functions deploy email-sender
```

## Changing the admin recipient

Prefer setting the `ADMIN_EMAIL` secret (Step 3) over hardcoding — the
function already defaults to `info.gscomply@gmail.com` if the secret isn't
set, so today it's correct either way. If you ever need to hardcode it
instead, edit this line in `supabase/functions/email-sender/index.ts`:

```ts
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL') || 'info.gscomply@gmail.com';
```

## Database tables

Already created via migrations in `supabase/migrations/`:
- `contact_submissions` — see `20260624180228_create_contact_and_newsletter_tables.sql`
  and `20260702194102_add_industry_other_to_contact_submissions.sql`
- `newsletter_subscribers` — same migration file

RLS policies (in `20260702191625_fix_rls_insert_policies_with_validation.sql`)
allow anonymous `INSERT` with basic field/email-format validation, and
restrict `SELECT` to authenticated users only. No changes needed here.
