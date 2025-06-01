/*
  # Add Compliance Settings Tables

  1. New Tables
    - `compliance_criteria` - Stores compliance rules and their weights
    - `scoring_methods` - Stores scoring methodology configurations
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Compliance Criteria table
CREATE TABLE IF NOT EXISTS compliance_criteria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  weight float NOT NULL DEFAULT 1.0,
  enabled boolean NOT NULL DEFAULT true,
  keywords text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Scoring Methods table
CREATE TABLE IF NOT EXISTS scoring_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  algorithm text NOT NULL,
  parameters jsonb DEFAULT '{}'::jsonb,
  is_default boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE compliance_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE scoring_methods ENABLE ROW LEVEL SECURITY;

-- RLS Policies for compliance_criteria
CREATE POLICY "Allow read access to authenticated users" ON compliance_criteria
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert access to authenticated users" ON compliance_criteria
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow update access to authenticated users" ON compliance_criteria
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow delete access to authenticated users" ON compliance_criteria
  FOR DELETE TO authenticated USING (true);

-- RLS Policies for scoring_methods
CREATE POLICY "Allow read access to authenticated users" ON scoring_methods
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert access to authenticated users" ON scoring_methods
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow update access to authenticated users" ON scoring_methods
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow delete access to authenticated users" ON scoring_methods
  FOR DELETE TO authenticated USING (true);

-- Insert default scoring methods
INSERT INTO scoring_methods (name, description, algorithm, parameters, is_default)
VALUES
  ('Simple Average', 'Average of all criteria scores', 'average', '{"min_score": 0, "max_score": 10}'::jsonb, true),
  ('Weighted Sum', 'Weighted sum of criteria scores', 'weighted_sum', '{"min_score": 0, "max_score": 10}'::jsonb, false);

-- Insert default compliance criteria
INSERT INTO compliance_criteria (name, description, category, weight, keywords)
VALUES
  ('Cartoon Characters', 'Check for presence of cartoon characters or animation', 'visual', 1.0, '{cartoon, animation, character, mascot}'),
  ('Child Targeting', 'Check if ad specifically targets children', 'targeting', 1.2, '{kids, children, young, youth}'),
  ('Promotional Offers', 'Check for promotional offers targeting children', 'marketing', 1.1, '{free, win, collect, promotion}'),
  ('Nutritional Claims', 'Check for misleading nutritional claims', 'content', 1.3, '{healthy, natural, nutritious, vitamin}'),
  ('Age-Restricted Content', 'Check for age-inappropriate content', 'content', 1.5, '{age, adult, mature}');