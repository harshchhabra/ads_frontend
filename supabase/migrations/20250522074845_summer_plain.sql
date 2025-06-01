/*
  # Report Settings Schema

  1. New Tables
    - `report_settings` - Stores recurring report configurations
      - `id` (uuid, primary key)
      - `name` (text) - Name of the report configuration
      - `frequency` (text) - How often to generate the report (daily, weekly, monthly)
      - `filters` (jsonb) - Stored filter settings
      - `recipients` (text[]) - Email addresses to receive the report
      - `enabled` (boolean) - Whether this report configuration is active
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
  2. Security
    - Enable RLS on report_settings table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS report_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  frequency text NOT NULL,
  filters jsonb NOT NULL DEFAULT '{}'::jsonb,
  recipients text[] NOT NULL DEFAULT '{}',
  enabled boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE report_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow read access to authenticated users" ON report_settings
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert access to authenticated users" ON report_settings
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow update access to authenticated users" ON report_settings
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow delete access to authenticated users" ON report_settings
  FOR DELETE TO authenticated USING (true);