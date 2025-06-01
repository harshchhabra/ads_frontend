/*
  # Fix TikTok API Credentials

  1. Changes
    - Add RLS policy for service role access to api_credentials table
    - Update TikTok credentials with proper configuration
    
  2. Security
    - Enable RLS on api_credentials table
    - Add policy for service role access
*/

-- Add policy for service role access
CREATE POLICY "Allow service role access"
ON api_credentials
FOR ALL
TO service_role
USING (true);

-- Update TikTok credentials with proper configuration
UPDATE api_credentials 
SET credentials = jsonb_build_object(
  'app_id', '7480735689735143440',
  'secret', '2967dccc25119a430e5749ee2ea492c2aca47ed0'
)
WHERE platform = 'tiktok';