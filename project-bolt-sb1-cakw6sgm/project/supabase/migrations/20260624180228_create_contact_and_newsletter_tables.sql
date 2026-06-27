-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text,
  industry text,
  company_size text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public contact form)
CREATE POLICY "insert_contact_submissions" ON contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "select_contact_submissions" ON contact_submissions
  FOR SELECT TO authenticated USING (true);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "insert_newsletter_subscribers" ON newsletter_subscribers
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only authenticated users can read
CREATE POLICY "select_newsletter_subscribers" ON newsletter_subscribers
  FOR SELECT TO authenticated USING (true);
