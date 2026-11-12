-- ========================================================
-- Migration: Add Model Registration & Rising Studio Profile Fields
-- Table: influencer_partner_requests
-- ========================================================

ALTER TABLE public.influencer_partner_requests
  ADD COLUMN IF NOT EXISTS profile_picture_url TEXT,
  ADD COLUMN IF NOT EXISTS age TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'Pakistan',
  ADD COLUMN IF NOT EXISTS weight TEXT,
  ADD COLUMN IF NOT EXISTS chest_bust TEXT,
  ADD COLUMN IF NOT EXISTS waist TEXT,
  ADD COLUMN IF NOT EXISTS hips TEXT,
  ADD COLUMN IF NOT EXISTS shoe_size TEXT,
  ADD COLUMN IF NOT EXISTS hair_color TEXT,
  ADD COLUMN IF NOT EXISTS eye_color TEXT,
  ADD COLUMN IF NOT EXISTS languages TEXT,
  ADD COLUMN IF NOT EXISTS modeling_categories TEXT[],
  ADD COLUMN IF NOT EXISTS skills TEXT,
  ADD COLUMN IF NOT EXISTS previous_campaigns TEXT,
  ADD COLUMN IF NOT EXISTS availability TEXT,
  ADD COLUMN IF NOT EXISTS starting_rate TEXT,
  ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;

-- Index on verification status
CREATE INDEX IF NOT EXISTS idx_influencer_partner_requests_verified
  ON public.influencer_partner_requests(is_verified);
