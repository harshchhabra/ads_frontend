import { useState } from 'react';
import { Search, Filter, Calendar, Grid, List, Table2 } from 'lucide-react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { TikTokAdsFeed } from './TikTokAdsFeed';
import { MetaAdsFeed } from './MetaAdsFeed';
import { AdTableFeed } from './AdTableFeed';
import { AdFilters } from '../types/ads';
import "react-datepicker/dist/react-datepicker.css";

const JULY_2024 = new Date(2024, 6, 1);

const PLATFORMS = [
  { value: 'all', label: 'All Platforms' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'facebook_messenger', label: 'Facebook Messenger' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'instagram_reels', label: 'Instagram Reels' },
  { value: 'instagram_stories', label: 'Instagram Stories' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'snapchat', label: 'Snapchat' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'youtube_kids', label: 'YouTube Kids' },
  { value: 'youtube_shorts', label: 'YouTube Shorts' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'pinterest', label: 'Pinterest' },
  { value: 'twitch', label: 'Twitch' }
];

const TARGET_AUDIENCES = [
  { value: 'all', label: 'All Age Groups' },
  { value: '0-4', label: 'Toddlers (0-4 years)' },
  { value: '5-8', label: 'Young Children (5-8 years)' },
  { value: '9-12', label: 'Pre-teens (9-12 years)' },
  { value: '13-17', label: 'Teenagers (13-17 years)' },
  { value: '18+', label: 'Adults (18+ years)' }
];

const COMPLIANCE_VERDICTS = [
  { value: 'all', label: 'All Verdicts' },
  { value: 'High', label: 'High Risk' },
  { value: 'Medium', label: 'Medium Risk' },
  { value: 'Low', label: 'Low Risk' }
];

const PRODUCT_TYPES = [
  { value: 'all', label: 'All Products' },
  // Main Categories
  { value: 'Frozen Foods', label: 'Frozen Foods' },
  { value: 'Kids Meal', label: 'Kids Meals' },
  // Snacks & Confectionery
  { value: 'Candy', label: 'Candy & Sweets' },
  { value: 'Chocolate', label: 'Chocolate Products' },
  { value: 'Chips', label: 'Chips & Crisps' },
  { value: 'Crackers', label: 'Crackers & Biscuits' },
  { value: 'Popcorn', label: 'Popcorn & Corn Snacks' },
  { value: 'Nuts', label: 'Nuts & Seeds' },
  { value: 'Energy Bars', label: 'Energy & Protein Bars' },
  // Dairy & Alternatives
  { value: 'Ice Cream', label: 'Ice Cream & Frozen Desserts' },
  { value: 'Yogurt', label: 'Yogurt & Dairy Desserts' },
  { value: 'Cheese', label: 'Cheese Products' },
  { value: 'Milk', label: 'Milk & Dairy Drinks' },
  { value: 'Plant Based', label: 'Plant-Based Alternatives' },
  // Beverages
  { value: 'Soda', label: 'Carbonated Drinks' },
  { value: 'Juice', label: 'Fruit Juices & Drinks' },
  { value: 'Energy Drinks', label: 'Energy Drinks' },
  { value: 'Sports Drinks', label: 'Sports & Isotonic Drinks' },
  { value: 'Flavored Water', label: 'Flavored Water' },
  // Breakfast & Cereals
  { value: 'Breakfast Cereals', label: 'Breakfast Cereals' },
  { value: 'Granola', label: 'Granola & Muesli' },
  { value: 'Breakfast Bars', label: 'Breakfast Bars' },
  { value: 'Spreads', label: 'Sweet Spreads & Jams' },
  // Baked Goods
  { value: 'Cookies', label: 'Cookies & Biscuits' },
  { value: 'Cakes', label: 'Cakes & Pastries' },
  { value: 'Bread', label: 'Sweet Breads & Rolls' },
  { value: 'Donuts', label: 'Donuts & Fried Pastries' },
  // Ready-to-Eat
  { value: 'Instant Noodles', label: 'Instant Noodles & Soups' },
  { value: 'Microwave Meals', label: 'Microwave Meals' },
  { value: 'Frozen Pizza', label: 'Frozen Pizza' },
  { value: 'Frozen Snacks', label: 'Frozen Snacks & Appetizers' },
  // Condiments & Sauces
  { value: 'Sweet Sauces', label: 'Sweet Sauces & Syrups' },
  { value: 'Dips', label: 'Sweet Dips & Spreads' }
];

const INFLUENCER_CAMPAIGN_OPTIONS = [
  { value: 'all', label: 'All Campaigns' },
  { value: 'yes', label: 'Influencer Campaigns Only' },
  { value: 'no', label: 'Non-Influencer Campaigns' }
];

const LOCATION_TYPES = [
  { value: 'all', label: 'All Locations' },
  { value: 'seen_in', label: 'Seen in Abu Dhabi' },
  { value: 'targeting', label: 'Targeting Abu Dhabi' }
];

const COUNTRIES = [
  { value: 'UAE', label: 'United Arab Emirates' },
  { value: 'KSA', label: 'Saudi Arabia' },
  { value: 'QAT', label: 'Qatar' },
  { value: 'BHR', label: 'Bahrain' }
];

const UAE_CITIES = [
  { value: 'Abu Dhabi', label: 'Abu Dhabi' },
  { value: 'Dubai', label: 'Dubai' },
  { value: 'Sharjah', label: 'Sharjah' },
  { value: 'Al Ain', label: 'Al Ain' }
];

const DATE_PRESETS = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'this_week', label: 'This Week' },
  { value: 'last_week', label: 'Last Week' },
  { value: 'last_7', label: 'Last 7 Days' },
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_30', label: 'Last 30 Days' },
  { value: 'last_90', label: 'Last 90 Days' },
  { value: 'this_quarter', label: 'This Quarter' },
  { value: 'last_quarter', label: 'Last Quarter' },
  { value: 'this_year', label: 'This Year' },
  { value: 'last_year', label: 'Last Year' },
  { value: 'since_july_2024', label: 'Since July 2024' }
];

export function AdMonitor() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState({ value: 'all', label: 'All Platforms' });
  const [selectedVerdict, setSelectedVerdict] = useState({ value: 'all', label: 'All Verdicts' });
  const [selectedProductType, setSelectedProductType] = useState({ value: 'all', label: 'All Products' });
  const [selectedLocationType, setSelectedLocationType] = useState({ value: 'all', label: 'All Locations' });
  const [selectedCountry, setSelectedCountry] = useState({ value: 'UAE', label: 'United Arab Emirates' });
  const [selectedCity, setSelectedCity] = useState({ value: 'Abu Dhabi', label: 'Abu Dhabi' });
  const [selectedDatePreset, setSelectedDatePreset] = useState({ value: 'all', label: 'All Time' });
  const [isInfluencerCampaign, setIsInfluencerCampaign] = useState({ value: 'all', label: 'All Campaigns' });
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [selectedAudience, setSelectedAudience] = useState({ value: 'all', label: 'All Age Groups' });
  const [showFilters, setShowFilters] = useState(false);

  const handleDatePresetChange = (preset: any) => {
    setSelectedDatePreset(preset);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (preset.value) {
      case 'today':
        setDateRange([today, now]);
        break;
      case 'yesterday': {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        setDateRange([yesterday, yesterday]);
        break;
      }
      case 'this_week': {
        const thisWeekStart = new Date(today);
        thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
        setDateRange([thisWeekStart, now]);
        break;
      }
      case 'last_week': {
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(lastWeekStart.getDate() - lastWeekStart.getDay() - 7);
        const lastWeekEnd = new Date(lastWeekStart);
        lastWeekEnd.setDate(lastWeekEnd.getDate() + 6);
        setDateRange([lastWeekStart, lastWeekEnd]);
        break;
      }
      case 'since_july_2024':
        setDateRange([JULY_2024, now]);
        break;
      case 'last_7':
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        setDateRange([sevenDaysAgo, now]);
        break;
      case 'this_month': {
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        setDateRange([thisMonthStart, now]);
        break;
      }
      case 'last_month': {
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
        setDateRange([lastMonthStart, lastMonthEnd]);
        break;
      }
      case 'last_30':
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        setDateRange([thirtyDaysAgo, now]);
        break;
      case 'last_90': {
        const ninetyDaysAgo = new Date(today);
        ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
        setDateRange([ninetyDaysAgo, now]);
        break;
      }
      case 'this_quarter': {
        const quarter = Math.floor(today.getMonth() / 3);
        const quarterStart = new Date(today.getFullYear(), quarter * 3, 1);
        setDateRange([quarterStart, now]);
        break;
      }
      case 'last_quarter': {
        const quarter = Math.floor(today.getMonth() / 3);
        const lastQuarterStart = new Date(today.getFullYear(), (quarter - 1) * 3, 1);
        const lastQuarterEnd = new Date(today.getFullYear(), quarter * 3, 0);
        setDateRange([lastQuarterStart, lastQuarterEnd]);
        break;
      }
      case 'this_year': {
        const thisYearStart = new Date(today.getFullYear(), 0, 1);
        setDateRange([thisYearStart, now]);
        break;
      }
      case 'last_year': {
        const lastYearStart = new Date(today.getFullYear() - 1, 0, 1);
        const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31);
        setDateRange([lastYearStart, lastYearEnd]);
        break;
      }
      default:
        setDateRange([null, null]);
    }
  };

  const filters: AdFilters = {
    query: searchQuery,
    platform: selectedPlatform.value === 'all' ? undefined : selectedPlatform.value,
    product_type: selectedProductType.value === 'all' ? undefined : selectedProductType.value,
    compliance_verdict: selectedVerdict.value === 'all' ? undefined : selectedVerdict.value,
    dateRange: dateRange,
    location_type: selectedLocationType.value === 'all' ? undefined : selectedLocationType.value as 'seen_in' | 'targeting',
    country: selectedCountry.value === 'all' ? undefined : selectedCountry.value,
    city: selectedCity.value === 'all' ? undefined : selectedCity.value,
    is_influencer_campaign: isInfluencerCampaign.value === 'all' ? undefined : isInfluencerCampaign.value === 'yes',
    target_audience: selectedAudience.value === 'all' ? undefined : selectedAudience.value
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Ad Compliance Monitor</h2>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Grid view"
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${
                viewMode === 'list'
                  ? 'bg-white text-blue-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="List view"
            >
              <List size={20} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg ${
                viewMode === 'table'
                  ? 'bg-white text-blue-600 shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Table view"
            >
              <Table2 size={20} />
            </button>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
            title="Toggle filters"
          >
            <Filter size={20} />
          </button>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ads..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* First Row */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <Select
                value={selectedPlatform}
                onChange={(option) => setSelectedPlatform(option as any)}
                options={PLATFORMS}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compliance Verdict
              </label>
              <Select
                value={selectedVerdict}
                onChange={(option) => setSelectedVerdict(option as any)}
                options={COMPLIANCE_VERDICTS}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Type
              </label>
              <Select
                value={selectedProductType}
                onChange={(option) => setSelectedProductType(option as any)}
                options={PRODUCT_TYPES}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Preset
              </label>
              <Select
                value={selectedDatePreset}
                onChange={handleDatePresetChange}
                options={DATE_PRESETS}
                className="w-full"
              />
            </div>
            {/* Second Row */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Type
              </label>
              <Select
                value={selectedLocationType}
                onChange={(option) => setSelectedLocationType(option as any)}
                options={LOCATION_TYPES}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <Select
                value={selectedCountry}
                onChange={(option) => setSelectedCountry(option as any)}
                options={COUNTRIES}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Select
                value={selectedCity}
                onChange={(option) => setSelectedCity(option as any)}
                options={UAE_CITIES}
                isDisabled={selectedCountry.value !== 'UAE'}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Audience
              </label>
              <Select
                value={selectedAudience}
                onChange={(option) => setSelectedAudience(option as any)}
                options={TARGET_AUDIENCES}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Campaign Type
              </label>
              <Select
                value={isInfluencerCampaign}
                onChange={(option) => setIsInfluencerCampaign(option as any)}
                options={INFLUENCER_CAMPAIGN_OPTIONS}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      {viewMode === 'table' ? (
        <AdTableFeed filters={filters} />
      ) : (
        <div className="space-y-12">
          <TikTokAdsFeed filters={filters} viewMode={viewMode} />
          <MetaAdsFeed filters={filters} viewMode={viewMode} />
        </div>
      )}
    </div>
  );
}