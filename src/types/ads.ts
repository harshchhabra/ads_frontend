export interface Ad {
  id: string;
  advertiser: string;
  platform: string;
  product_type?: string;
  media_type: string;
  ad_text: string;
  media_urls: string[];
  hashtags: string[];
  location_type?: 'seen_in' | 'targeting';
  country?: string;
  city?: string;
  is_influencer_campaign?: boolean;
  music_info?: {
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
  created_at: string;
  updated_at: string;
  compliance_checks?: {
    verdict: string;
    reason: string;
    confidence: number;
  }[];
}

export interface AdFilters {
  query?: string;
  platform?: string;
  product_type?: string;
  compliance_verdict?: string;
  dateRange?: [Date | null, Date | null];
  location_type?: 'seen_in' | 'targeting';
  target_audience?: string;
  country?: string;
  city?: string;
  is_influencer_campaign?: boolean;
}