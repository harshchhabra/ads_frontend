/*
  # Add Compliance Criteria Table

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
CREATE POLICY "compliance_criteria_select_policy" 
  ON compliance_criteria
  FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "compliance_criteria_insert_policy"
  ON compliance_criteria
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "compliance_criteria_update_policy"
  ON compliance_criteria
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "compliance_criteria_delete_policy"
  ON compliance_criteria
  FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for scoring_methods
CREATE POLICY "scoring_methods_select_policy"
  ON scoring_methods
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "scoring_methods_insert_policy"
  ON scoring_methods
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "scoring_methods_update_policy"
  ON scoring_methods
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "scoring_methods_delete_policy"
  ON scoring_methods
  FOR DELETE
  TO authenticated
  USING (true);

-- Insert default scoring methods
INSERT INTO scoring_methods (name, description, algorithm, parameters, is_default)
VALUES
  ('Simple Average', 'Average of all criteria scores', 'average', '{"min_score": 0, "max_score": 10}'::jsonb, true),
  ('Weighted Sum', 'Weighted sum of criteria scores', 'weighted_sum', '{"min_score": 0, "max_score": 10}'::jsonb, false);