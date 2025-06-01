import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import { DOMParser } from 'npm:@xmldom/xmldom@0.8.10';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface ScrapflyResponse {
  result: {
    content: string;
    url: string;
  };
  context: {
    status_code: number;
  };
}

interface AdData {
  advertiser: string;
  media_type: string;
  ad_text: string;
  media_urls: string[];
  raw_data: any;
}

function extractAdData(html: string): AdData {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  // Helper function to safely query elements
  const querySelector = (selector: string) => {
    try {
      return doc.querySelector(selector);
    } catch {
      return null;
    }
  };

  // Extract advertiser name
  const advertiserElement = querySelector('[data-testid="ad-library-page-name"]');
  const advertiser = advertiserElement?.textContent?.trim() || 'Unknown Advertiser';

  // Extract ad text
  const adTextElement = querySelector('[data-testid="ad_text"]');
  const ad_text = adTextElement?.textContent?.trim() || '';

  // Extract media URLs (images/videos)
  const mediaElements = doc.querySelectorAll('img[src*="scontent"], video[src*="video"]');
  const media_urls = Array.from(mediaElements || [])
    .map(el => el.getAttribute('src'))
    .filter((url): url is string => url !== null);

  // Determine media type based on found elements
  const media_type = media_urls.some(url => url.includes('video')) ? 'video' : 'image';

  // Log extraction results for debugging
  console.log('Extracted Ad Data:', {
    advertiser,
    media_type,
    ad_text: ad_text.substring(0, 100) + '...',
    media_urls_count: media_urls.length
  });

  return {
    advertiser,
    media_type,
    ad_text,
    media_urls,
    raw_data: {
      html_snapshot: html.substring(0, 1000), // Store first 1000 chars as reference
      timestamp: new Date().toISOString()
    }
  };
}

async function scrapeFacebookAds(query: string): Promise<AdData> {
  const apiKey = Deno.env.get('SCRAPFLY_API_KEY');
  if (!apiKey) {
    throw new Error('SCRAPFLY_API_KEY is not set');
  }

  const url = `https://api.scrapfly.io/scrape?key=${apiKey}&url=${encodeURIComponent(`https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=AE&q=${query}`)}&tags=fb_ads&render_js=true`;
  
  console.log('Fetching from Scrapfly:', { query });
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Scrapfly API error response:', error);
    throw new Error(`Scrapfly API error: ${error}`);
  }

  const data: ScrapflyResponse = await response.json();
  
  console.log('Scrapfly response:', {
    status_code: data.context?.status_code,
    has_content: !!data.result?.content,
    content_length: data.result?.content?.length
  });

  if (!data.context?.status_code) {
    throw new Error('Invalid response from Scrapfly API: Missing status code');
  }

  if (data.context.status_code !== 200) {
    throw new Error(`Facebook returned status code: ${data.context.status_code}`);
  }

  if (!data.result?.content) {
    throw new Error('No content returned from Facebook');
  }

  return extractAdData(data.result.content);
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

    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const { query } = await req.json();
    
    if (!query) {
      throw new Error('Query parameter is required');
    }

    console.log('Starting ad scraping for query:', query);

    const adData = await scrapeFacebookAds(query);

    console.log('Successfully scraped ad data:', {
      advertiser: adData.advertiser,
      media_type: adData.media_type,
      text_length: adData.ad_text.length,
      media_count: adData.media_urls.length
    });

    // Store results
    const { data, error } = await supabase
      .from('ads')
      .insert({
        platform: 'facebook',
        advertiser: adData.advertiser,
        media_type: adData.media_type,
        ad_text: adData.ad_text,
        media_urls: adData.media_urls,
        metadata: adData.raw_data
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
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

    return new Response(
      JSON.stringify({ success: true, data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Scraping error:', error);
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