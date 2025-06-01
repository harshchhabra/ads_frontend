import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface TikTokAdData {
  advertiser: string;
  media_type: string;
  ad_text: string;
  media_urls: string[];
  hashtags: string[];
  music_info: {
    title?: string;
    artist?: string;
  };
  engagement_metrics: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  duration_seconds?: number;
}

async function getAccessToken(): Promise<string> {
  const appId = Deno.env.get('TIKTOK_APP_ID');
  const secret = Deno.env.get('TIKTOK_SECRET');
  
  if (!appId || !secret) {
    throw new Error('TikTok API credentials not configured');
  }

  const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      app_id: appId,
      secret: secret,
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get TikTok access token');
  }

  const data = await response.json();
  return data.data.access_token;
}

async function fetchTikTokAds(query: string, accessToken: string): Promise<TikTokAdData[]> {
  const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/commercial_content/ad/query/', {
    method: 'POST',
    headers: {
      'Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      advertiser_id: 'ACTIVE',
      filtering: {
        ad_status: 'ACTIVE',
        search_term: query,
        country_code: 'AE',
      },
      page_size: 20,
      fields: [
        'ad_id',
        'ad_name',
        'advertiser_id',
        'advertiser_name',
        'creative_info',
        'call_to_action',
        'status',
        'statistics',
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`TikTok API Error: ${error.message}`);
  }

  const data = await response.json();
  
  if (!data.data || !data.data.list) {
    return [];
  }

  return data.data.list.map((ad: any) => ({
    advertiser: ad.advertiser_name,
    media_type: ad.creative_info?.media_type || 'image',
    ad_text: ad.creative_info?.ad_text || '',
    media_urls: ad.creative_info?.media_urls || [],
    hashtags: extractHashtags(ad.creative_info?.ad_text || ''),
    music_info: {
      title: ad.creative_info?.music_info?.title,
      artist: ad.creative_info?.music_info?.artist,
    },
    engagement_metrics: {
      likes: ad.statistics?.likes || 0,
      comments: ad.statistics?.comments || 0,
      shares: ad.statistics?.shares || 0,
      views: ad.statistics?.views || 0,
    },
    duration_seconds: ad.creative_info?.video_duration,
  }));
}

function extractHashtags(text: string): string[] {
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
  return (text.match(hashtagRegex) || [])
    .map(tag => tag.slice(1))
    .filter(tag => tag.length > 0);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { query } = await req.json();
    
    if (!query) {
      throw new Error('Query parameter is required');
    }

    console.log('Starting TikTok ad fetching for query:', query);

    const accessToken = await getAccessToken();
    const ads = await fetchTikTokAds(query, accessToken);

    console.log(`Successfully fetched ${ads.length} TikTok ads`);

    // Store results
    for (const ad of ads) {
      const { data, error } = await supabase
        .from('ads')
        .insert({
          platform: 'tiktok',
          advertiser: ad.advertiser,
          media_type: ad.media_type,
          ad_text: ad.ad_text,
          media_urls: ad.media_urls,
          hashtags: ad.hashtags,
          music_info: ad.music_info,
          engagement_metrics: ad.engagement_metrics,
          duration_seconds: ad.duration_seconds,
          metadata: {
            scraped_at: new Date().toISOString(),
            platform_specific: {
              hashtags: ad.hashtags,
              music_info: ad.music_info
            }
          }
        })
        .select()
        .single();

      if (error) {
        console.error('Error storing TikTok ad:', error);
        continue;
      }

      // Trigger compliance analysis
      await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/analyze-compliance`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ad_id: data.id })
      });
    }

    return new Response(
      JSON.stringify({ success: true, count: ads.length }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('TikTok API error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});