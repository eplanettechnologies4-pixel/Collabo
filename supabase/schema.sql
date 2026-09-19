-- ========================================================
-- COLLAB - Our Partners Database Schema & Storage Setup
-- Run this in your Supabase SQL Editor (https://app.supabase.com)
-- ========================================================

-- 1. Table: brand_partner_requests
CREATE TABLE IF NOT EXISTS public.brand_partner_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  website TEXT,
  category TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  message TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: influencer_partner_requests
CREATE TABLE IF NOT EXISTS public.influencer_partner_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  height TEXT NOT NULL,
  skin_tone TEXT NOT NULL,
  instagram_handle TEXT NOT NULL,
  followers_count TEXT NOT NULL,
  tiktok_youtube TEXT,
  experience TEXT,
  profile_picture_url TEXT,
  age TEXT,
  country TEXT DEFAULT 'Pakistan',
  weight TEXT,
  chest_bust TEXT,
  waist TEXT,
  hips TEXT,
  shoe_size TEXT,
  hair_color TEXT,
  eye_color TEXT,
  languages TEXT,
  modeling_categories TEXT[],
  skills TEXT,
  previous_campaigns TEXT,
  availability TEXT,
  starting_rate TEXT,
  image1_url TEXT NOT NULL,
  image2_url TEXT,
  image3_url TEXT,
  image4_url TEXT,
  image5_url TEXT,
  image6_url TEXT,
  video1_url TEXT NOT NULL,
  video2_url TEXT,
  video3_url TEXT,
  is_approved BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: influencer_brands_worked_with
CREATE TABLE IF NOT EXISTS public.influencer_brands_worked_with (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id UUID NOT NULL REFERENCES public.influencer_partner_requests(id) ON DELETE CASCADE,
  brand_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast query performance
CREATE INDEX IF NOT EXISTS idx_brand_partner_requests_approved ON public.brand_partner_requests(is_approved);
CREATE INDEX IF NOT EXISTS idx_influencer_partner_requests_approved ON public.influencer_partner_requests(is_approved);
CREATE INDEX IF NOT EXISTS idx_influencer_partner_requests_verified ON public.influencer_partner_requests(is_verified);
CREATE INDEX IF NOT EXISTS idx_influencer_brands_worked_with_influencer_id ON public.influencer_brands_worked_with(influencer_id);

-- Storage Bucket Creation Instructions:
-- Go to Storage in Supabase Dashboard -> Create new bucket named "partner-uploads"
-- Make sure "Public bucket" toggle is set to ON so images & videos can be displayed publicly.
-- Or execute SQL to insert storage bucket if storage extension is active:
INSERT INTO storage.buckets (id, name, public) 
VALUES ('partner-uploads', 'partner-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Security Policies for public reading and uploads
CREATE POLICY "Public Read Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'partner-uploads');

CREATE POLICY "Public Insert Access" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'partner-uploads');
