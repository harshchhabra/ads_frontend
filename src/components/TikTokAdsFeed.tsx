import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { AdPreviewModal } from "./AdPreviewModal";
import { Ad, AdFilters } from "../types/ads";

interface TikTokAdsFeedProps {
  filters: AdFilters;
  viewMode: "grid" | "list";
}

export function TikTokAdsFeed({ filters, viewMode }: TikTokAdsFeedProps) {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  useEffect(() => {
    // const tiktokAds = mockAds.filter(ad => ad.platform === 'tiktok');
    // setAds(filterAds(tiktokAds, filters));
  }, [filters]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        TikTok Ads Monitor
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {loading && (
          <div className="col-span-full text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading ads...</p>
          </div>
        )}
        {!loading && ads.length === 0 && !error && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No ads found.</p>
          </div>
        )}
        {ads.map((ad) => (
          <div
            key={ad.id}
            className={`bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${
              viewMode === "list" ? "flex gap-4" : ""
            }`}
            onClick={() => setSelectedAd(ad)}
          >
            <div
              className={`bg-gray-100 ${
                viewMode === "list" ? "w-48 h-32" : "aspect-video"
              }`}
            >
              {ad.media_type === "video" ? (
                <video
                  src={ad.media_urls[0]}
                  className="w-full h-full object-cover"
                  controls
                />
              ) : (
                <img
                  src={ad.media_urls[0]}
                  alt={ad.advertiser}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{ad.advertiser}</h3>
                {ad.compliance_checks && ad.compliance_checks[0] && (
                  <span
                    className={`px-2 py-1 text-sm rounded-full ${
                      ad.compliance_checks[0].verdict === "High"
                        ? "bg-red-100 text-red-800"
                        : ad.compliance_checks[0].verdict === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {ad.compliance_checks[0].verdict} Risk
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{ad.ad_text}</p>
              {ad.hashtags && ad.hashtags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {ad.hashtags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                  {ad.hashtags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700">
                      +{ad.hashtags.length - 3} more
                    </span>
                  )}
                </div>
              )}
              <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                <span>{new Date(ad.created_at).toLocaleDateString()}</span>
                <div className="flex items-center gap-3">
                  <span>
                    {ad.engagement_metrics.likes.toLocaleString()} likes
                  </span>
                  <span>
                    {ad.engagement_metrics.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAd && (
        <AdPreviewModal
          isOpen={!!selectedAd}
          onClose={() => setSelectedAd(null)}
          ad={selectedAd}
        />
      )}
    </div>
  );
}
