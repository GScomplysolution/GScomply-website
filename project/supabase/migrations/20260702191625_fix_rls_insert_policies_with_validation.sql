/*
# Fix RLS INSERT Policies — Replace Always-True WITH CHECK Clauses

## Problem
The INSERT policies on `contact_submissions` and `newsletter_subscribers` used
`WITH CHECK (true)`, which is unconditionally true and provides no meaningful
row-level protection. Security scanners correctly flag this as a risk.

## Fix
Replace `WITH CHECK (true)` with real data-validation predicates that:
- Verify required fields are non-null and non-empty
- Validate email addresses match a basic format pattern

This removes the "always true" condition while preserving the intended behaviour:
anonymous visitors can still submit the contact form and subscribe to the newsletter,
but only with structurally valid data.

## Changes

### contact_submissions
- DROP and RECREATE `insert_contact_submissions` policy
- New WITH CHECK validates: full_name non-empty, company non-empty, email matches
  basic email pattern `^[^@\s]+@[^@\s]+\.[^@\s]+$`

### newsletter_subscribers
- DROP and RECREATE `insert_newsletter_subscribers` policy
- New WITH CHECK validates: email is non-null and matches basic email pattern

## Security Notes
1. Roles: both tables remain INSERT-accessible to `anon` and `authenticated`
   (correct for public-facing forms — no login required to contact or subscribe).
2. SELECT stays restricted to `authenticated` only (admin read).
3. No UPDATE or DELETE policies exist — anonymous users cannot modify data after insert.
4. The email regex is intentionally simple; stricter validation lives in the application layer.
*/

-- ────────────────────────────────────────────────────────────────
-- contact_submissions
-- ────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "insert_contact_submissions" ON contact_submissions;

CREATE POLICY "insert_contact_submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    full_name IS NOT NULL
    AND char_length(trim(full_name)) > 0
    AND company IS NOT NULL
    AND char_length(trim(company)) > 0
    AND email IS NOT NULL
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

-- ────────────────────────────────────────────────────────────────
-- newsletter_subscribers
-- ────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "insert_newsletter_subscribers" ON newsletter_subscribers;

CREATE POLICY "insert_newsletter_subscribers"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    email IS NOT NULL
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );
