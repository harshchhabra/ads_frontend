export interface MetaAdsFilter {
  countries?: string[];
  region?: string;
  city?: string;
  adSource?: 'paid' | 'organic';
  ageGroup?: string;
  foodCategory?: string[];
  searchTerms?: string;
  adType?: string;
  mediaTypes?: string[];
  channels?: string[];
  industries?: string[];
  dateRange?: {
    start: Date | null;
    end: Date | null;
  };
  datePreset?: string;
}

export interface MetaAdResult {
  id: string;
  page_id: string;
  page_name: string;
  ad_creative_body: string;
  ad_creative_link_caption: string;
  ad_creative_link_description: string;
  ad_creative_link_title: string;
  ad_delivery_start_time: string;
  ad_snapshot_url: string;
  currency: string;
  funding_entity: string;
  impressions: {
    lower_bound: string;
    upper_bound: string;
  };
  publisher_platforms: string[];
  media_type: string;
}

export interface MetaAdsResponse {
  data: MetaAdResult[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export interface City {
  value: string;
  label: string;
  emirate: string;
}

export interface InsightsRangeValue {
  lower_bound: string;
  upper_bound: string;
}