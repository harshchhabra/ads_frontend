/*
  # Add TikTok Ads Support

  1. Changes
    - Add platform-specific fields to ads table
    - Add TikTok-specific metadata columns
    - Add indexes for performance
*/

-- Add TikTok-specific fields to ads table
ALTER TABLE ads
ADD COLUMN IF NOT EXISTS engagement_metrics jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS hashtags text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS music_info jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS duration_seconds integer;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ads_platform ON ads(platform);
CREATE INDEX IF NOT EXISTS idx_ads_created_at ON ads(created_at);
CREATE INDEX IF NOT EXISTS idx_ads_advertiser ON ads(advertiser);

-- Update platform enum values in platform_weights
INSERT INTO platform_weights (platform, weight)
VALUES ('TikTok', 3)
ON CONFLICT (platform) DO NOTHING;