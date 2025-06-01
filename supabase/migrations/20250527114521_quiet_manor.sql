/*
  # Add TikTok API Credentials Table

  1. New Tables
    - `api_credentials` - Stores API credentials for various platforms
      - `id` (uuid, primary key)
      - `platform` (text) - Platform name (e.g., 'tiktok', 'facebook')
      - `credentials` (jsonb) - Encrypted credentials
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      
  2. Security
    - Enable RLS on api_credentials table
    - Add policies for authenticated users
*/

-- Create API Credentials table
CREATE TABLE IF NOT EXISTS api_credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL UNIQUE,
  credentials jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE api_credentials ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow read access to authenticated users" ON api_credentials
  FOR SELECT TO authenticated USING (true);

-- Insert TikTok credentials
INSERT INTO api_credentials (platform, credentials)
VALUES (
  'tiktok',
  jsonb_build_object(
    'app_id', '7480735689735143440',
    'secret', '2967dccc25119a430e5749ee2ea492c2aca47ed0'
  )
) ON CONFLICT (platform) DO UPDATE
SET credentials = EXCLUDED.credentials;