import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Don't let a missing/misconfigured env var crash the entire site.
  // createClient() throws synchronously if either value is falsy, and this
  // module is imported by Footer.tsx (rendered on every page), so an
  // unguarded throw here would white-screen the whole app on every route —
  // not just the contact/newsletter forms that actually need Supabase.
  //
  // If you're seeing this in your deployment logs, the environment variables
  // aren't set for this environment. On Vercel: Project → Settings →
  // Environment Variables → add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
  // for Production (and Preview, if you test PRs), then redeploy. See
  // .env.example in the project root for the expected variable names.
  console.error(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are missing. ' +
    'Set them in your hosting provider\'s environment variables and redeploy. ' +
    'Contact form and newsletter signup will not work until this is fixed.'
  );
}

// Fall back to harmless placeholder values so createClient() never throws.
// Any actual request made with these will fail gracefully (caught by the
// try/catch in each form's submit handler) instead of crashing on load.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);

export type UserRole = 'admin' | 'editor' | 'viewer';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image_url: string | null;
  author_name: string | null;
  author_bio: string | null;
  status: 'draft' | 'published' | 'archived';
  scheduled_at: string | null;
  published_at: string | null;
  category: string;
  read_time: number;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Regulation {
  id: string;
  name: string;
  acronym: string;
  description: string | null;
  full_description: string | null;
  region: string;
  governing_body: string | null;
  regulation_type: string;
  status: 'Active' | 'Upcoming' | 'Revised';
  key_requirements: string[];
  compliance_deadlines: string | null;
  official_url: string | null;
  related_services: string[];
  applicable_industries: string[];
  created_at: string;
  updated_at: string;
}
