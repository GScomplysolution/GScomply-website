-- Fix security issues with handle_new_user function:
-- 1. Set immutable search_path to prevent search path manipulation attacks
-- 2. Revoke execute permissions from anon and authenticated to prevent REST API access
-- The function only needs to be called by the auth trigger, not directly

-- Replace the function with secure settings (CREATE OR REPLACE works without dropping)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'viewer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Revoke all execute permissions from public roles
-- The function is only called by the auth.users trigger (postgres operation)
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM anon;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM authenticated;