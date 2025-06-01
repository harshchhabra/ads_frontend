/*
  # Fix TikTok API Credentials

  1. Changes
    - Add service role policy for api_credentials table
    - Update TikTok credentials with proper configuration
    - Add index for faster lookups
    
  2. Security
    - Ensure service role has full access
    - Maintain existing RLS policies
*/

-- Add index for faster platform lookups
CREATE INDEX IF NOT EXISTS idx_api_credentials_platform ON api_credentials(platform);

-- Ensure service role policy exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'api_credentials' 
    AND policyname = 'Allow service role access'
  ) THEN
    CREATE POLICY "Allow service role access"
    ON api_credentials
    FOR ALL
    TO service_role
    USING (true);
  END IF;
END $$;

-- Update TikTok credentials with proper configuration
INSERT INTO api_credentials (platform, credentials)
VALUES (
  'tiktok',
  jsonb_build_object(
    'app_id', '7480735689735143440',
    'secret', '2967dccc25119a430e5749ee2ea492c2aca47ed0'
  )
)
ON CONFLICT (platform) 
DO UPDATE SET 
  credentials = EXCLUDED.credentials,
  updated_at = now();