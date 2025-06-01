interface TikTokAdFilters {
  query: string;
  country?: string;
  adType?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export async function fetchTikTokAds(filters: TikTokAdFilters): Promise<any[]> {
  if (!filters.query || filters.query.length < 3) {
    throw new Error('Search query must be at least 3 characters');
  }

  const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-tiktok-ads-final`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
    },
    body: JSON.stringify(filters)
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const { success, ads, error } = await res.json();

  if (!success) {
    console.error("Supabase function failed:", { error });
    throw new Error(error || 'Failed to fetch TikTok ads');
  }

  if (!Array.isArray(ads)) {
    throw new Error('Invalid response format from TikTok ads API');
  }

  return ads;
}