/*
  # Ad Monitoring System Schema

  1. New Tables
    - `ad_sources` - Tracks different ad platforms and their configurations
    - `ads` - Stores extracted advertisements
    - `compliance_checks` - Stores OpenAI compliance analysis results
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Ad Sources table
CREATE TABLE IF NOT EXISTS ad_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  platform text NOT NULL,
  url text NOT NULL,
  config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ads table
CREATE TABLE IF NOT EXISTS ads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid REFERENCES ad_sources(id),
  platform text NOT NULL,
  advertiser text NOT NULL,
  media_type text NOT NULL,
  ad_text text,
  media_urls text[],
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Compliance Checks table
CREATE TABLE IF NOT EXISTS compliance_checks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_id uuid REFERENCES ads(id),
  is_non_nutritious boolean,
  targets_children boolean,
  has_child_appeal boolean,
  verdict text NOT NULL,
  reason text,
  confidence float,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE ad_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_checks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow read access to authenticated users" ON ad_sources
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON ads
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow read access to authenticated users" ON compliance_checks
  FOR SELECT TO authenticated USING (true);