/*
  # Seed Mock Ads Data

  1. New Data
    - Insert mock ads with their respective details
    - Add corresponding compliance checks
    
  2. Data Structure
    - Each ad includes platform, advertiser, product type, media type, etc.
    - Compliance checks include verdict, reason, and confidence score
*/

-- Insert mock ads
INSERT INTO ads (
  advertiser,
  platform,
  product_type,
  ad_text,
  media_type,
  media_urls,
  hashtags,
  engagement_metrics,
  created_at
) VALUES
  (
    'McDonald''s',
    'instagram',
    'Kids Meal',
    'Collect all your favorite Minecraft toys in our new Happy Meal! Limited time only.',
    'image',
    ARRAY['https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg'],
    ARRAY['HappyMeal', 'Minecraft', 'KidsMeal', 'CollectAll'],
    '{"likes": 25000, "comments": 1200, "views": 150000, "shares": 3000}'::jsonb,
    '2024-02-15'::timestamptz
  ),
  (
    'Burger King',
    'instagram',
    'Kids Meal',
    'Unleash your inner superhero with our new Marvel toys collection!',
    'image',
    ARRAY['https://images.pexels.com/photos/3023479/pexels-photo-3023479.jpeg'],
    ARRAY['SuperKids', 'Marvel', 'BKKids'],
    '{"likes": 18000, "comments": 800, "views": 120000, "shares": 2500}'::jsonb,
    '2024-03-10'::timestamptz
  ),
  (
    'Kinder',
    'facebook',
    'Chocolate',
    'Make every moment special with Kinder! Perfect for little ones.',
    'image',
    ARRAY['https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg'],
    ARRAY['Kinder', 'Chocolate', 'Kids'],
    '{"likes": 30000, "comments": 1500, "views": 180000, "shares": 4000}'::jsonb,
    '2024-03-20'::timestamptz
  ),
  (
    'Kellogg''s',
    'instagram',
    'Sugary Cereal',
    'They''re Gr-r-reat! Start your day with Tony the Tiger.',
    'image',
    ARRAY['https://images.pexels.com/photos/216951/pexels-photo-216951.jpeg'],
    ARRAY['Kelloggs', 'TonyTheTiger', 'Breakfast'],
    '{"likes": 22000, "comments": 1100, "views": 135000, "shares": 2800}'::jsonb,
    '2024-01-25'::timestamptz
  ),
  (
    'Tang',
    'facebook',
    'Sugary Drink',
    'Fuel your playtime with Tang! Bright, fun, and delicious.',
    'image',
    ARRAY['https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg'],
    ARRAY['Tang', 'Playtime', 'Fun'],
    '{"likes": 15000, "comments": 600, "views": 90000, "shares": 1800}'::jsonb,
    '2024-04-05'::timestamptz
  ),
  (
    'CerealCo',
    'youtube',
    'Sugary Cereal',
    'Hey kids! Join Dragon Pops on a magical breakfast adventure!',
    'video',
    ARRAY['https://images.pexels.com/photos/216951/pexels-photo-216951.jpeg'],
    ARRAY['DragonPops', 'Breakfast', 'Kids'],
    '{"likes": 45000, "comments": 3000, "views": 500000, "shares": 8000}'::jsonb,
    '2024-01-20'::timestamptz
  ),
  (
    'Nestlé',
    'youtube',
    'Snack Bar',
    'The perfect after-school treat! Meet our candy mascots.',
    'video',
    ARRAY['https://images.pexels.com/photos/227432/pexels-photo-227432.jpeg'],
    ARRAY['AfterSchool', 'Snacks', 'Kids'],
    '{"likes": 35000, "comments": 2000, "views": 400000, "shares": 6000}'::jsonb,
    '2024-03-15'::timestamptz
  ),
  (
    'CoolTreats',
    'instagram',
    'Ice Cream',
    'Collect toys with every ice cream! Meet Cone the Cool Guy.',
    'image',
    ARRAY['https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg'],
    ARRAY['IceCream', 'Kids', 'Toys'],
    '{"likes": 20000, "comments": 900, "views": 110000, "shares": 2200}'::jsonb,
    '2024-04-10'::timestamptz
  ),
  (
    'XYZ Candy',
    'tiktok',
    'Candy',
    'Family fun with our new candy collection! #SweetMoments',
    'video',
    ARRAY['https://images.pexels.com/photos/55825/gold-bear-gummi-bears-bear-yellow-55825.jpeg'],
    ARRAY['Candy', 'Family', 'Fun'],
    '{"likes": 50000, "comments": 4000, "views": 500000, "shares": 10000}'::jsonb,
    '2024-03-01'::timestamptz
  ),
  (
    'KFC',
    'tiktok',
    'Fast Food',
    'Join the #FunWithBucket challenge! Show us your moves.',
    'video',
    ARRAY['https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg'],
    ARRAY['FunWithBucket', 'Dance', 'Challenge'],
    '{"likes": 40000, "comments": 3500, "views": 450000, "shares": 9000}'::jsonb,
    '2024-01-15'::timestamptz
  );

-- Insert compliance checks for the ads
WITH new_ads AS (
  SELECT id, advertiser FROM ads WHERE advertiser IN (
    'McDonald''s', 'Burger King', 'Kinder', 'Kellogg''s', 'Tang',
    'CerealCo', 'Nestlé', 'CoolTreats', 'XYZ Candy', 'KFC'
  )
)
INSERT INTO compliance_checks (
  ad_id,
  verdict,
  reason,
  confidence,
  is_non_nutritious,
  targets_children,
  has_child_appeal
)
SELECT
  id,
  CASE 
    WHEN advertiser IN ('McDonald''s', 'Burger King', 'Kinder', 'CerealCo', 'XYZ Candy') THEN 'High'
    WHEN advertiser IN ('Kellogg''s', 'Nestlé', 'CoolTreats', 'KFC') THEN 'High'
    ELSE 'Medium'
  END as verdict,
  CASE 
    WHEN advertiser = 'McDonald''s' THEN 'Uses cartoon characters and collectible toys targeting children'
    WHEN advertiser = 'Burger King' THEN 'Uses superhero characters appealing to children'
    WHEN advertiser = 'Kinder' THEN 'Uses cartoon characters and targets young children directly'
    WHEN advertiser = 'Kellogg''s' THEN 'Uses mascot character targeting children'
    WHEN advertiser = 'Tang' THEN 'Uses bright visuals and playful messaging'
    WHEN advertiser = 'CerealCo' THEN 'Uses cartoon dragon and targets children directly'
    WHEN advertiser = 'Nestlé' THEN 'Uses animated mascots in school setting'
    WHEN advertiser = 'CoolTreats' THEN 'Uses cartoon mascot and toy rewards'
    WHEN advertiser = 'XYZ Candy' THEN 'High engagement with child-appealing content'
    WHEN advertiser = 'KFC' THEN 'Uses teen-focused challenge format'
  END as reason,
  CASE 
    WHEN advertiser IN ('McDonald''s', 'Kinder', 'CerealCo', 'XYZ Candy') THEN 9
    WHEN advertiser IN ('Burger King', 'Kellogg''s', 'KFC', 'CoolTreats') THEN 8
    ELSE 6
  END as confidence,
  true,
  true,
  true
FROM new_ads;