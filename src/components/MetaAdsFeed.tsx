import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AdPreviewModal } from "./AdPreviewModal";
import { Ad } from "../types/ads";
interface MetaAdsFeedProps {
  viewMode: "grid" | "list";
  data: any[];
  isLoading: boolean;
  error: string | null;
}

export function MetaAdsFeed({
  viewMode,
  data = [],
  isLoading,
  error,
}: MetaAdsFeedProps) {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [showFullDescription] = useState(false);

  // const toggleDescription = () => setShowFullDescription((prev) => !prev);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Meta Ads Monitor</h2>

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
        {isLoading && (
          <div className="col-span-full text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading ads...</p>
          </div>
        )}
        {!isLoading && data.length === 0 && !error && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No ads found.</p>
          </div>
        )}

        {!!data.length &&
          data.map((ad) => (
            <div className="bg-white shadow-md rounded-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-2">Ad ID: {ad.id}</h2>
              <p className="text-sm text-gray-500 mb-2">
                Created: {ad.ad_creation_time} | Delivery:{" "}
                {ad.ad_delivery_start_time} - {ad.ad_delivery_stop_time}
              </p>

              <div className="mb-4">
                <a
                  href={ad.ad_snapshot_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  View Ad Snapshot
                </a>
              </div>

              <div className="mb-4">
                <p className="font-semibold">Platforms:</p>
                <ul className="flex flex-wrap gap-2 text-sm text-gray-700">
                  {ad.publisher_platforms.map((platform: string) => (
                    <li
                      key={platform}
                      className="bg-gray-100 px-2 py-1 rounded"
                    >
                      {platform}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <p className="font-semibold">Description:</p>
                <p className="text-gray-700">
                  {showFullDescription
                    ? ad.ad_creative_bodies?.[0]
                    : `${ad.ad_creative_bodies?.[0].slice(0, 100)}${
                        ad.ad_creative_bodies?.[0].length > 100 ? "..." : ""
                      }`}
                  {/* {ad.ad_creative_bodies?.[0].length > 100 && (
                    <button
                      onClick={toggleDescription}
                      className="text-blue-600 hover:underline text-sm mt-1"
                    >
                      {showFullDescription ? "Show Less" : "Show More"}
                    </button>
                  )} */}
                </p>
              </div>

              {/* <div>
                <p className="font-semibold mb-2">Reach Breakdown:</p>
                <div className="overflow-x-auto max-h-[300px] overflow-y-scroll border rounded">
                  <table className="min-w-full text-sm text-left">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        <th className="px-4 py-2">Country</th>
                        <th className="px-4 py-2">Age Range</th>
                        <th className="px-4 py-2">Male</th>
                        <th className="px-4 py-2">Female</th>
                        <th className="px-4 py-2">Unknown</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ad?.age_country_gender_reach_breakdown?.map(
                        (countryData) =>
                          countryData.age_gender_breakdowns.map(
                            (entry, index) => (
                              <tr
                                key={`${countryData.country}-${index}`}
                                className="border-t"
                              >
                                <td className="px-4 py-2">
                                  {index === 0 ? countryData.country : ""}
                                </td>
                                <td className="px-4 py-2">{entry.age_range}</td>
                                <td className="px-4 py-2">
                                  {entry.male ?? "-"}
                                </td>
                                <td className="px-4 py-2">
                                  {entry.female ?? "-"}
                                </td>
                                <td className="px-4 py-2">
                                  {entry.unknown ?? "-"}
                                </td>
                              </tr>
                            )
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              </div> */}
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
