export async function fetchMetaAds(query: string): Promise<any[]> {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-meta-ads`;
  if (!query || query.length < 3) {
    throw new Error('Search query must be at least 3 characters');
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ query })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const { success, ads, error } = await res.json();

    if (!success) {
      console.error("⚠️ Supabase error:", error);
      throw new Error(error || 'Failed to fetch Meta ads');
    }

    if (!Array.isArray(ads)) {
      throw new Error('Invalid response format from Meta ads API');
    }

    return ads;
  } catch (err: any) {
    console.error("❌ fetchMetaAds failed:", err.message || err);
    throw err;

  }
}