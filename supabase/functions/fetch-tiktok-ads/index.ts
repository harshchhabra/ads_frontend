import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function getAccessToken(): Promise<string> {
  const appId = Deno.env.get("TIKTOK_APP_ID");
  const secret = Deno.env.get("TIKTOK_SECRET");

  if (!appId || !secret) {
    throw new Error("TikTok API credentials not configured");
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
    throw new Error('Failed to obtain TikTok access token');
  }

  const data = await response.json();
  return data.data.access_token;
}

interface TikTokAdFilters {
  query: string;
  country?: string;
  adType?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

async function fetchAds(filters: TikTokAdFilters, accessToken: string) {
  const filtering: any = {
    ad_status: 'ACTIVE',
    search_term: filters.query,
    country_code: filters.country || 'AE'
  };

  if (filters.adType) {
    filtering.media_type = filters.adType.toUpperCase();
  }

  if (filters.dateRange) {
    filtering.start_time = filters.dateRange.start;
    filtering.end_time = filters.dateRange.end;
  }

  const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/commercial_content/ad/query/', {
    method: 'POST',
    headers: {
      'Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filtering,
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
  return data;
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

    const filters: TikTokAdFilters = await req.json();

    if (!filters.query) {
      throw new Error('Query parameter is required');
    }

    console.log('Starting TikTok ad fetching with filters:', filters);

    const accessToken = await getAccessToken();
    console.log('Successfully obtained TikTok access token');

    const data = await fetchAds(filters, accessToken);
    const adsList = data.data?.list || [];

    console.log(`Found ${adsList.length} ads`);

    const ads = adsList.map((ad: any) => ({
      platform: 'tiktok',
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
      metadata: {
        scraped_at: new Date().toISOString(),
        platform_specific: {
          hashtags: extractHashtags(ad.creative_info?.ad_text || ''),
          music_info: {
            title: ad.creative_info?.music_info?.title,
            artist: ad.creative_info?.music_info?.artist,
          }
        }
      }
    }));

    if (ads.length > 0) {
      for (const ad of ads) {
        const { error } = await supabase
          .from('ads')
          .insert(ad);

        if (error) {
          console.error('Error storing ad:', error);
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        count: ads.length,
        ads: ads
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('TikTok API error:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
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