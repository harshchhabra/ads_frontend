import { AlertTriangle } from "lucide-react";
import { Ad } from "../types/ads";

const childAppealData = [
  {
    brand: "McDonald's",
    platform: "instagram",
    product: "Kids Meal",
    childAppealText: "Minecraft toys, cartoon visuals",
  },
  {
    brand: "Burger King",
    platform: "instagram",
    product: "Kids Meal",
    childAppealText: "Marvel superhero toys",
  },
  {
    brand: "Kinder",
    platform: "facebook",
    product: "Chocolate",
    childAppealText: 'Cartoon bunny, "for little ones"',
  },
  {
    brand: "Kellogg's",
    platform: "instagram",
    product: "Sugary Cereal",
    childAppealText: "Tony the Tiger, slogan",
  },
  {
    brand: "Tang",
    platform: "facebook",
    product: "Sugary Drink",
    childAppealText: "Kids playing, bright visuals",
  },
  {
    brand: "CerealCo",
    platform: "youtube",
    product: "Sugary Cereal",
    childAppealText: "Cartoon dragon, kid jingle",
  },
  {
    brand: "Nestlé",
    platform: "youtube",
    product: "Snack Bar",
    childAppealText: "Animated candy, school setting",
  },
  {
    brand: "CoolTreats",
    platform: "instagram",
    product: "Ice Cream",
    childAppealText: "Cartoon cone, toy reward",
  },
  {
    brand: "XYZ Candy",
    platform: "tiktok",
    product: "Candy",
    childAppealText: "Family kids in Spark Ad",
  },
  {
    brand: "KFC",
    platform: "tiktok",
    product: "Fast Food",
    childAppealText: "Teen dance challenge trend",
  },
  {
    brand: "Nesquik",
    platform: "tiktok",
    product: "Sugary Drink",
    childAppealText: "Bunny mascot, DIY fun",
  },
  {
    brand: "Fanta",
    platform: "tiktok",
    product: "Soda",
    childAppealText: "Animated world, pop beat",
  },
  {
    brand: "Pringles",
    platform: "snapchat",
    product: "Chips",
    childAppealText: "Comic strip story ad",
  },
  {
    brand: "Skittles",
    platform: "snapchat",
    product: "Candy",
    childAppealText: "AR mini-game (catch candy)",
  },
  {
    brand: "McDonald's",
    platform: "snapchat",
    product: "Kids Meal",
    childAppealText: "AR Happy Meal unboxing",
  },
  {
    brand: "Oreo",
    platform: "snapchat",
    product: "Cookies",
    childAppealText: '"Oreoji" AR stickers',
  },
  {
    brand: "Timeout",
    platform: "snapchat",
    product: "Chocolate",
    childAppealText: "Doodle contest (Snap tools)",
  },
  {
    brand: "Kinder",
    platform: "youtube",
    product: "Chocolate",
    childAppealText: "Kids opening toy eggs",
  },
  {
    brand: "Oreo",
    platform: "tiktok",
    product: "Cookies",
    childAppealText: "Music video w/ pop celeb",
  },
  {
    brand: "Froot Loops",
    platform: "youtube",
    product: "Cereal",
    childAppealText: "Mascot (Toucan Sam) dancing",
  },
  {
    brand: "Chupa Chups",
    platform: "tiktok",
    product: "Candy",
    childAppealText: "AR filter for kids' costume",
  },
  {
    brand: "Cheetos",
    platform: "snapchat",
    product: "Chips",
    childAppealText: "Chester Cheetah in lens",
  },
  {
    brand: "Pepsi",
    platform: "tiktok",
    product: "Soda",
    childAppealText: "Teens sipping, cartoon stickers",
  },
  {
    brand: "Haribo",
    platform: "youtube",
    product: "Gummies",
    childAppealText: "Kids' choir, cartoon visuals",
  },
  {
    brand: "Lay's",
    platform: "instagram",
    product: "Chips",
    childAppealText: "Youth humor, emoji-heavy",
  },
  {
    brand: "Bimbo",
    platform: "youtube",
    product: "Sweet Bread",
    childAppealText: "Cartoon panda intro",
  },
  {
    brand: "Frosties",
    platform: "youtube",
    product: "Cereal",
    childAppealText: "Tony the Tiger + animated world",
  },
  {
    brand: "Snickers",
    platform: "tiktok",
    product: "Bar",
    childAppealText: "Influencer + sticker reaction",
  },
  {
    brand: "Mirinda",
    platform: "youtube",
    product: "Soda",
    childAppealText: "Fruit mascot joke reel",
  },
  {
    brand: "Kinder",
    platform: "tiktok",
    product: "Chocolate",
    childAppealText: "Surprise egg unboxing by kid",
  },
  {
    brand: "Burger King",
    platform: "snapchat",
    product: "Kids Meal",
    childAppealText: "Toy animated as hero",
  },
  {
    brand: "Maggi",
    platform: "youtube",
    product: "Noodles",
    childAppealText: "Mother-child cooking skit",
  },
  {
    brand: "Twix",
    platform: "tiktok",
    product: "Bar",
    childAppealText: "Snap effect splitting bar",
  },
  {
    brand: "Capri Sun",
    platform: "tiktok",
    product: "Juice",
    childAppealText: "Cartoon fruit battle game",
  },
  {
    brand: "Coco Pops",
    platform: "instagram",
    product: "Cereal",
    childAppealText: "Monkey mascot, kid slogan",
  },
  {
    brand: "Chocopie",
    platform: "youtube",
    product: "Cakes",
    childAppealText: "Cartoon picnic w/ kids",
  },
  {
    brand: "Galaxy Minis",
    platform: "tiktok",
    product: "Chocolate",
    childAppealText: "Spark ad with child gift box",
  },
  {
    brand: "Milkybar",
    platform: "youtube",
    product: "White Chocolate",
    childAppealText: "Cow mascot farm story",
  },
  {
    brand: "Tic Tac",
    platform: "tiktok",
    product: "Candy",
    childAppealText: "Catch-the-tic mini-game",
  },
  {
    brand: "Cinnabon",
    platform: "instagram",
    product: "Sweet Pastry",
    childAppealText: 'Giveaway post for "sweet kids"',
  },
  {
    brand: "Nestlé",
    platform: "snapchat",
    product: "Cereal",
    childAppealText: "Lens: build your cereal box",
  },
  {
    brand: "Mentos",
    platform: "youtube",
    product: "Candy",
    childAppealText: "Kids' skit prank with mints",
  },
  {
    brand: "M&M's",
    platform: "tiktok",
    product: "Candy",
    childAppealText: "Mascot dance challenge",
  },
  {
    brand: "Pepsi",
    platform: "youtube",
    product: "Soda",
    childAppealText: "Teen party, rainbow straw effect",
  },
  {
    brand: "Pizza Hut",
    platform: "tiktok",
    product: "Pizza",
    childAppealText: "Family pizza party reel",
  },
  {
    brand: "Tang",
    platform: "snapchat",
    product: "Juice Powder",
    childAppealText: "Fruit mascot filters",
  },
  {
    brand: "Nido",
    platform: "youtube",
    product: "Powdered Milk",
    childAppealText: "Mom & toddler cartoon scene",
  },
  {
    brand: "Nutella",
    platform: "instagram",
    product: "Spread",
    childAppealText: "School kids make snack art",
  },
  {
    brand: "Ritz Bits",
    platform: "tiktok",
    product: "Crackers",
    childAppealText: '"Smiley face" filter game',
  },
  {
    brand: "Chips Ahoy!",
    platform: "tiktok",
    product: "Cookies",
    childAppealText: "Cookie mascot sunglasses challenge",
  },
  {
    brand: "Dairy Milk",
    platform: "youtube",
    product: "Chocolate",
    childAppealText: "Toddler gift scene + rainbow",
  },
  {
    brand: "7UP",
    platform: "tiktok",
    product: "Soda",
    childAppealText: "Lemon-lime bounce filter",
  },
  {
    brand: "Sprite",
    platform: "snapchat",
    product: "Soda",
    childAppealText: "Teen sport + burst filter",
  },
  {
    brand: "Haribo",
    platform: "instagram",
    product: "Gummies",
    childAppealText: "Dancing bear filter",
  },
  {
    brand: "Galaxy",
    platform: "facebook",
    product: "Chocolate",
    childAppealText: "Kids sharing bar at lunch",
  },
];

interface AdTableFeedProps {
  data: any[];
  isLoading: boolean;
  error: string | null;
}

export function AdTableFeed({ data, error, isLoading }: AdTableFeedProps) {
  const getChildAppealText = (ad: Ad): string => {
    const match = childAppealData.find(
      (data) =>
        data.brand.toLowerCase() === ad?.advertiser?.toLowerCase() &&
        data.platform === ad?.platform?.toLowerCase() &&
        data.product === ad?.product_type
    );
    return match?.childAppealText || "N/A";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">All Ads</h2>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Page name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Platform
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Child Appeal
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Risk
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Score
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No ads found
                  </td>
                </tr>
              ) : (
                !!data.length &&
                data.map((ad) => (
                  <tr key={ad.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ad.advertiser}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ad.platform}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ad.product_type || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="text-sm text-gray-900">
                        {getChildAppealText(ad)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ad.compliance_checks?.[0]?.verdict === "High"
                            ? "bg-red-100 text-red-800"
                            : ad.compliance_checks?.[0]?.verdict === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {ad.compliance_checks?.[0]?.verdict || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ad.compliance_checks?.[0]?.confidence
                        ? `${(ad.compliance_checks[0].confidence * 10).toFixed(
                            1
                          )}/10`
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(ad.ad_creation_time).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {ad.compliance_checks?.[0]?.reason || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
