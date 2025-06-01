import { Ad } from '../types/ads';

const generateEngagement = () => ({
  likes: Math.floor(Math.random() * 50000) + 1000,
  comments: Math.floor(Math.random() * 5000) + 100,
  views: Math.floor(Math.random() * 500000) + 10000,
  shares: Math.floor(Math.random() * 1000) + 100
});

const generateDate2025 = (month: string) => {
  const months: { [key: string]: number } = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };
  const date = new Date(2025, months[month], 15);
  return date.toISOString();
};

const mockAds: Ad[] = [
  {
    id: '1',
    advertiser: "McDonald's",
    platform: "instagram",
    product_type: "Kids Meal",
    ad_text: "Minecraft toys, cartoon visuals. Happy Meal with 'Collect All' toy CTA",
    media_type: "image",
    media_urls: ["https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg"],
    hashtags: ["HappyMeal", "Minecraft", "KidsMeal", "CollectAll"],
    engagement_metrics: generateEngagement(),
    created_at: "2024-02-15T00:00:00Z",
    updated_at: "2024-02-15T00:00:00Z",
    compliance_checks: [{
      verdict: "High",
      reason: "Uses cartoon characters and collectible toys targeting children",
      confidence: 0.9
    }]
  },
  {
    id: '2',
    advertiser: "Burger King",
    platform: "instagram",
    product_type: "Kids Meal",
    ad_text: "Marvel superhero toys. 'Super kids' slogan + toy tie-in",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/3023479/pexels-photo-3023479.jpeg"],
    hashtags: ["SuperKids", "Marvel", "BKKids"],
    engagement_metrics: generateEngagement(),
    created_at: "2024-03-10T00:00:00Z",
    updated_at: "2024-03-10T00:00:00Z",
    compliance_checks: [{
      verdict: "High",
      reason: "Uses superhero characters appealing to children",
      confidence: 0.8
    }]
  },
  {
    id: '3',
    advertiser: "Kinder",
    platform: "facebook",
    product_type: "Chocolate",
    ad_text: "Cartoon bunny, 'for little ones'. Arabic ad, kid delivery visuals",
    media_type: "image",
    media_urls: ["https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg"],
    hashtags: ["Kinder", "Chocolate", "Kids"],
    engagement_metrics: generateEngagement(),
    created_at: "2024-03-20T00:00:00Z",
    updated_at: "2024-03-20T00:00:00Z",
    compliance_checks: [{
      verdict: "High",
      reason: "Uses cartoon characters and targets young children directly",
      confidence: 0.9
    }]
  },
  {
    id: '4',
    advertiser: "Kellogg's",
    platform: "instagram",
    product_type: "Sugary Cereal",
    ad_text: "Tony the Tiger, slogan. Classic mascot, kids' slogan",
    media_type: "image",
    media_urls: ["https://images.pexels.com/photos/216951/pexels-photo-216951.jpeg"],
    hashtags: ["Kelloggs", "TonyTheTiger", "Breakfast"],
    engagement_metrics: generateEngagement(),
    created_at: "2024-01-25T00:00:00Z",
    updated_at: "2024-01-25T00:00:00Z",
    compliance_checks: [{
      verdict: "High",
      reason: "Uses mascot character targeting children",
      confidence: 0.8
    }]
  },
  {
    id: '5',
    advertiser: "Tang",
    platform: "facebook",
    product_type: "Sugary Drink",
    ad_text: "Kids playing, bright visuals. 'Fuel your playtime' copy",
    media_type: "image",
    media_urls: ["https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg"],
    hashtags: ["Tang", "Playtime", "Fun"],
    engagement_metrics: generateEngagement(),
    created_at: "2024-04-05T00:00:00Z",
    updated_at: "2024-04-05T00:00:00Z",
    compliance_checks: [{
      verdict: "Medium",
      reason: "Uses bright visuals and playful messaging",
      confidence: 0.6
    }]
  }
];

// Add new mock ads
const newAds: Ad[] = [
  {
    id: '35',
    advertiser: "Coco Pops",
    platform: "instagram",
    product_type: "Cereal",
    ad_text: '"Pop into the day!" jingle with Coco the Monkey mascot',
    media_type: "image",
    media_urls: ["https://images.pexels.com/photos/216951/pexels-photo-216951.jpeg"],
    hashtags: ["CocoPops", "Breakfast", "Kids"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Jan'),
    updated_at: generateDate2025('Jan'),
    compliance_checks: [{
      verdict: "High",
      reason: "Uses monkey mascot and kid-focused jingle",
      confidence: 0.9
    }]
  },
  {
    id: '36',
    advertiser: "Chocopie",
    platform: "youtube",
    product_type: "Cakes",
    ad_text: "Singing sweets & friends in a cartoon picnic adventure",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg"],
    hashtags: ["Chocopie", "Picnic", "Friends"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Mar'),
    updated_at: generateDate2025('Mar'),
    compliance_checks: [{
      verdict: "High",
      reason: "Uses animated characters in child-focused setting",
      confidence: 0.9
    }]
  },
  {
    id: '37',
    advertiser: "Galaxy Minis",
    platform: "tiktok",
    product_type: "Chocolate",
    ad_text: "Kid giving chocolate gift box with sparkle effects",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg"],
    hashtags: ["GalaxyMinis", "Gift", "Sparkle"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Feb'),
    updated_at: generateDate2025('Feb'),
    compliance_checks: [{
      verdict: "High",
      reason: "Features children and emotional gift-giving",
      confidence: 0.9
    }]
  },
  {
    id: '38',
    advertiser: "Milkybar",
    platform: "youtube",
    product_type: "White Chocolate",
    ad_text: "Cartoon cow adventures on the magical Milkybar farm",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg"],
    hashtags: ["Milkybar", "Farm", "Adventure"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Jan'),
    updated_at: generateDate2025('Jan'),
    compliance_checks: [{
      verdict: "High",
      reason: "Uses animated mascot in children's story format",
      confidence: 1.0
    }]
  },
  {
    id: '39',
    advertiser: "Tic Tac",
    platform: "tiktok",
    product_type: "Candy",
    ad_text: "Play catch-the-tic-tac with our new AR filter!",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/55825/gold-bear-gummi-bears-bear-yellow-55825.jpeg"],
    hashtags: ["TicTac", "Game", "Filter"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Apr'),
    updated_at: generateDate2025('Apr'),
    compliance_checks: [{
      verdict: "High",
      reason: "Uses gamification targeting young audience",
      confidence: 0.9
    }]
  },
  {
    id: '40',
    advertiser: "Cinnabon",
    platform: "instagram",
    product_type: "Sweet Pastry",
    ad_text: "🎉 Sweet kids giveaway! Tag your bestie to win! 🎁",
    media_type: "image",
    media_urls: ["https://images.pexels.com/photos/267308/pexels-photo-267308.jpeg"],
    hashtags: ["Cinnabon", "Giveaway", "SweetTreats"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Feb'),
    updated_at: generateDate2025('Feb'),
    compliance_checks: [{
      verdict: "Medium",
      reason: "Uses emoji-heavy messaging appealing to youth",
      confidence: 0.6
    }]
  },
  {
    id: '41',
    advertiser: "Nestlé",
    platform: "snapchat",
    product_type: "Cereal",
    ad_text: "Build your dream cereal box in AR! Customize & share!",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/216951/pexels-photo-216951.jpeg"],
    hashtags: ["Nestlé", "AR", "Cereal"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Mar'),
    updated_at: generateDate2025('Mar'),
    compliance_checks: [{
      verdict: "High",
      reason: "Interactive AR feature targeting children",
      confidence: 0.9
    }]
  },
  {
    id: '42',
    advertiser: "Mentos",
    platform: "youtube",
    product_type: "Candy",
    ad_text: "Watch these hilarious mint pranks with kids!",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/55825/gold-bear-gummi-bears-bear-yellow-55825.jpeg"],
    hashtags: ["Mentos", "Pranks", "Fun"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Jan'),
    updated_at: generateDate2025('Jan'),
    compliance_checks: [{
      verdict: "High",
      reason: "Features children in prank content",
      confidence: 0.8
    }]
  },
  {
    id: '43',
    advertiser: "M&M's",
    platform: "tiktok",
    product_type: "Candy",
    ad_text: "Join the M&M's mascot dance challenge! #MMsDance",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/55825/gold-bear-gummi-bears-bear-yellow-55825.jpeg"],
    hashtags: ["MMsDance", "Challenge", "Candy"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Feb'),
    updated_at: generateDate2025('Feb'),
    compliance_checks: [{
      verdict: "High",
      reason: "Uses brand mascots in dance challenge",
      confidence: 1.0
    }]
  },
  {
    id: '44',
    advertiser: "Pepsi",
    platform: "youtube",
    product_type: "Soda",
    ad_text: "Rainbow straw effects at the ultimate teen party!",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg"],
    hashtags: ["Pepsi", "Party", "Rainbow"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Feb'),
    updated_at: generateDate2025('Feb'),
    compliance_checks: [{
      verdict: "Medium",
      reason: "Uses trendy effects appealing to youth",
      confidence: 0.6
    }]
  },
  {
    id: '45',
    advertiser: "Pizza Hut",
    platform: "tiktok",
    product_type: "Pizza",
    ad_text: "Family pizza party time! Watch kids enjoy their favorites",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg"],
    hashtags: ["PizzaHut", "Family", "Party"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Mar'),
    updated_at: generateDate2025('Mar'),
    compliance_checks: [{
      verdict: "Medium",
      reason: "Shows children in family dining setting",
      confidence: 0.6
    }]
  },
  {
    id: '46',
    advertiser: "Tang",
    platform: "snapchat",
    product_type: "Juice Powder",
    ad_text: "Turn into your favorite fruit with our new filters!",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg"],
    hashtags: ["Tang", "Fruit", "Filter"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Mar'),
    updated_at: generateDate2025('Mar'),
    compliance_checks: [{
      verdict: "High",
      reason: "Uses playful AR filters targeting children",
      confidence: 0.8
    }]
  },
  {
    id: '47',
    advertiser: "Nido",
    platform: "youtube",
    product_type: "Powdered Milk",
    ad_text: "Sweet dreams with our animated bedtime story",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg"],
    hashtags: ["Nido", "Bedtime", "Story"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Feb'),
    updated_at: generateDate2025('Feb'),
    compliance_checks: [{
      verdict: "Medium",
      reason: "Uses animated content for young children",
      confidence: 0.6
    }]
  },
  {
    id: '48',
    advertiser: "Nutella",
    platform: "instagram",
    product_type: "Spread",
    ad_text: "Create fun sandwich art with Nutella! Kids' edition",
    media_type: "image",
    media_urls: ["https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg"],
    hashtags: ["Nutella", "Art", "Fun"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Feb'),
    updated_at: generateDate2025('Feb'),
    compliance_checks: [{
      verdict: "High",
      reason: "Targets children with food art activities",
      confidence: 0.8
    }]
  },
  {
    id: '49',
    advertiser: "Ritz Bits",
    platform: "tiktok",
    product_type: "Crackers",
    ad_text: "Make a smiley face in our new AR game!",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/1618767/pexels-photo-1618767.jpeg"],
    hashtags: ["RitzBits", "Game", "Smile"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Jan'),
    updated_at: generateDate2025('Jan'),
    compliance_checks: [{
      verdict: "High",
      reason: "Uses interactive game format for children",
      confidence: 0.9
    }]
  },
  {
    id: '50',
    advertiser: "Chips Ahoy!",
    platform: "tiktok",
    product_type: "Cookies",
    ad_text: "Cookie mascot starts new sunglasses trend!",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg"],
    hashtags: ["ChipsAhoy", "Trend", "Style"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Feb'),
    updated_at: generateDate2025('Feb'),
    compliance_checks: [{
      verdict: "High",
      reason: "Uses mascot in trend-setting content",
      confidence: 0.9
    }]
  },
  {
    id: '51',
    advertiser: "Dairy Milk",
    platform: "youtube",
    product_type: "Chocolate",
    ad_text: "The magic gift - watch the rainbow surprise!",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg"],
    hashtags: ["DairyMilk", "Magic", "Gift"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Mar'),
    updated_at: generateDate2025('Mar'),
    compliance_checks: [{
      verdict: "High",
      reason: "Uses magical themes targeting children",
      confidence: 0.9
    }]
  },
  {
    id: '52',
    advertiser: "7UP",
    platform: "tiktok",
    product_type: "Soda",
    ad_text: "Bounce with our lemon-lime filter effect!",
    media_type: "video",
    media_urls: ["https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg"],
    hashtags: ["7UP", "Filter", "Effect"],
    engagement_metrics: generateEngagement(),
    created_at: generateDate2025('Feb'),
    updated_at: generateDate2025('Feb'),
    compliance_checks: [{
      verdict: "Medium",
      reason: "Uses playful effects appealing to youth",
      confidence: 0.6
    }]
  }
];

// Combine all ads
const allAds = [...mockAds, ...newAds];

export function filterAds(ads: Ad[], filters: {
  query?: string;
  platform?: string;
  compliance_verdict?: string;
  product_type?: string;
  dateRange?: [Date | null, Date | null];
}) {
  return ads.filter(ad => {
    if (filters.query && !ad.ad_text.toLowerCase().includes(filters.query.toLowerCase()) &&
        !ad.advertiser.toLowerCase().includes(filters.query.toLowerCase())) {
      return false;
    }

    if (filters.platform && filters.platform !== 'all' && ad.platform !== filters.platform) {
      return false;
    }
    
    if (filters.compliance_verdict && filters.compliance_verdict !== 'all' && 
        ad.compliance_checks?.[0]?.verdict !== filters.compliance_verdict) {
      return false;
    }
    
    if (filters.product_type && filters.product_type !== 'all' && 
        ad.product_type !== filters.product_type) {
      return false;
    }
    
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      const adDate = new Date(ad.created_at);
      if (adDate < filters.dateRange[0] || adDate > filters.dateRange[1]) {
        return false;
      }
    }

    return true;
  });
}

// Export the combined list as mockAds
export { allAds as mockAds }