import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
