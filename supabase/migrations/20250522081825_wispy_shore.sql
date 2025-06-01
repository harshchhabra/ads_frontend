/*
  # Compliance Settings Schema

  1. New Tables
    - `platform_weights` - Platform-specific risk weights
    - `product_weights` - Product category risk weights
    - `keyword_flags` - Creative risk keyword rules
    - `compliance_settings` - Global compliance settings
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Platform Weights table
CREATE TABLE IF NOT EXISTS platform_weights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL UNIQUE,
  weight float NOT NULL CHECK (weight >= 1 AND weight <= 4),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Product Weights table
CREATE TABLE IF NOT EXISTS product_weights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_type text NOT NULL UNIQUE,
  weight float NOT NULL CHECK (weight >= 1 AND weight <= 3),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Keyword Flags table
CREATE TABLE IF NOT EXISTS keyword_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  score float NOT NULL CHECK (score >= 0 AND score <= 1),
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Global Compliance Settings table
CREATE TABLE IF NOT EXISTS compliance_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  high_risk_threshold float NOT NULL DEFAULT 8 CHECK (high_risk_threshold >= 7 AND high_risk_threshold <= 10),
  medium_risk_threshold float NOT NULL DEFAULT 5 CHECK (medium_risk_threshold >= 5 AND medium_risk_threshold <= 7),
  low_risk_threshold float NOT NULL DEFAULT 3 CHECK (low_risk_threshold >= 1 AND low_risk_threshold <= 4),
  include_ai_explanation boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE platform_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE keyword_flags ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for platform_weights
CREATE POLICY "Allow read access to authenticated users" ON platform_weights
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow modify access to authenticated users" ON platform_weights
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for product_weights
CREATE POLICY "Allow read access to authenticated users" ON product_weights
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow modify access to authenticated users" ON product_weights
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for keyword_flags
CREATE POLICY "Allow read access to authenticated users" ON keyword_flags
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow modify access to authenticated users" ON keyword_flags
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RLS Policies for compliance_settings
CREATE POLICY "Allow read access to authenticated users" ON compliance_settings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow modify access to authenticated users" ON compliance_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Insert default platform weights
INSERT INTO platform_weights (platform, weight) VALUES
  ('YouTube Kids', 4),
  ('TikTok', 3),
  ('Instagram Reels', 2),
  ('Meta Feed', 2),
  ('Snapchat', 2),
  ('LinkedIn', 1),
  ('X (Twitter)', 1);

-- Insert default product weights
INSERT INTO product_weights (product_type, weight) VALUES
  ('Candy', 3),
  ('Soda', 3),
  ('Chocolate', 3),
  ('Ice Cream', 2),
  ('Sugary Yogurt', 2),
  ('Chips / Savory Snacks', 2),
  ('High-Sodium Meals', 1),
  ('Sauces / Dressings', 1);

-- Insert default keyword flags
INSERT INTO keyword_flags (keyword, score, category) VALUES
  ('cartoon', 1, 'visual'),
  ('mascot', 1, 'visual'),
  ('character', 1, 'visual'),
  ('emoji', 1, 'visual'),
  ('bright color', 1, 'visual'),
  ('animated', 1, 'visual'),
  ('fun for kids', 1, 'copy'),
  ('after school', 1, 'copy'),
  ('your little one', 1, 'copy');

-- Insert default compliance settings
INSERT INTO compliance_settings (
  high_risk_threshold,
  medium_risk_threshold,
  low_risk_threshold,
  include_ai_explanation
) VALUES (8, 5, 3, true);