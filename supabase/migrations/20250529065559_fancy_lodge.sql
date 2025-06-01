/*
  # Add Ad Metadata Fields

  1. Changes
    - Add new columns to ads table for enhanced filtering
    - Add indexes for improved query performance
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add new columns to ads table
ALTER TABLE ads
ADD COLUMN IF NOT EXISTS product_type text,
ADD COLUMN IF NOT EXISTS location_type text,
ADD COLUMN IF NOT EXISTS country text,
ADD COLUMN IF NOT EXISTS city text,
ADD COLUMN IF NOT EXISTS is_influencer_campaign boolean DEFAULT false;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ads_product_type ON ads(product_type);
CREATE INDEX IF NOT EXISTS idx_ads_location_type ON ads(location_type);
CREATE INDEX IF NOT EXISTS idx_ads_country ON ads(country);
CREATE INDEX IF NOT EXISTS idx_ads_city ON ads(city);
CREATE INDEX IF NOT EXISTS idx_ads_is_influencer_campaign ON ads(is_influencer_campaign);