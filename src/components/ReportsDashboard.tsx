import React, { useState, Fragment } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { AlertTriangle, CheckCircle, TrendingUp, TrendingDown, Users, Activity, FileText, Download, Calendar, ChevronRight, X, ExternalLink, Settings } from 'lucide-react';
import { ComplianceSettings } from './ComplianceSettings';
import { Dialog, Transition } from '@headlessui/react';

const violationsByPlatform = [
  { name: 'Facebook', violations: 24, compliant: 76 },
  { name: 'Instagram', violations: 18, compliant: 82 },
  { name: 'TikTok', violations: 35, compliant: 65 },
  { name: 'Snapchat', violations: 28, compliant: 72 },
];

const trendsData = [
  { month: 'Jan', violations: 15, total: 100 },
  { month: 'Feb', violations: 20, total: 110 },
  { month: 'Mar', violations: 18, total: 95 },
  { month: 'Apr', violations: 25, total: 120 },
  { month: 'May', violations: 22, total: 105 },
  { month: 'Jun', violations: 30, total: 130 },
];

const violationTypes = [
  { name: 'Child Appeal', value: 35 },
  { name: 'Non-nutritious', value: 25 },
  { name: 'Targeting Children', value: 20 },
  { name: 'Other', value: 20 },
];

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#84cc16'];

// Sample data for top violating brands
const topViolatingBrands = [
  { id: 1, brand: "McDonald's UAE", violations: 45, communicated: true },
  { id: 2, brand: "KFC Middle East", violations: 38, communicated: true },
  { id: 3, brand: "Burger King UAE", violations: 32, communicated: false },
  { id: 4, brand: "Baskin Robbins", violations: 28, communicated: true },
  { id: 5, brand: "Dunkin' UAE", violations: 25, communicated: false },
  { id: 6, brand: "Pizza Hut UAE", violations: 22, communicated: true },
  { id: 7, brand: "Domino's Pizza", violations: 20, communicated: false },
  { id: 8, brand: "Hardee's Arabia", violations: 18, communicated: true },
  { id: 9, brand: "Subway UAE", violations: 15, communicated: false },
  { id: 10, brand: "Papa John's", violations: 12, communicated: true },
];

// Sample data for top violating ads
const topViolatingAds = [
  {
    id: 1,
    brand: "McDonald's UAE",
    adTitle: "Happy Meal Toy Collection",
    violationScore: 9.8,
    platform: "Facebook",
    thumbnail: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
    reason: "Uses cartoon characters and targets children directly"
  },
  {
    id: 2,
    brand: "KFC Middle East",
    adTitle: "Kids Bucket Challenge",
    violationScore: 9.5,
    platform: "Instagram",
    thumbnail: "https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg",
    reason: "Promotes excessive consumption to children"
  },
  {
    id: 3,
    brand: "Baskin Robbins",
    adTitle: "Ice Cream Adventure",
    violationScore: 9.2,
    platform: "TikTok",
    thumbnail: "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg",
    reason: "Uses animated characters and child influencers"
  },
  {
    id: 4,
    brand: "Dunkin' UAE",
    adTitle: "Colorful Donut Party",
    violationScore: 8.9,
    platform: "Snapchat",
    thumbnail: "https://images.pexels.com/photos/2955820/pexels-photo-2955820.jpeg",
    reason: "Appeals to children with bright colors and party themes"
  },
  {
    id: 5,
    brand: "Pizza Hut UAE",
    adTitle: "Gaming Night Special",
    violationScore: 8.7,
    platform: "YouTube",
    thumbnail: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
    reason: "Targets young gamers with promotional offers"
  }
];

interface DetailedReportProps {
  isOpen: boolean;
  onClose: () => void;
  report: any;
}

const DetailedReport: React.FC<DetailedReportProps> = ({ isOpen, onClose, report }) => {
  const [officerComment, setOfficerComment] = useState('');
  const [savedComments, setSavedComments] = useState<string[]>([]);
  const [brandCommunication, setBrandCommunication] = useState(
    topViolatingBrands.map(brand => ({ id: brand.id, communicated: brand.communicated }))
  );

  const handleSaveComment = () => {
    if (officerComment.trim()) {
      setSavedComments([...savedComments, officerComment]);
      setOfficerComment('');
    }
  };

  const toggleCommunication = (brandId: number) => {
    setBrandCommunication(prev =>
      prev.map(brand =>
        brand.id === brandId
          ? { ...brand, communicated: !brand.communicated }
          : brand
      )
    );
  };

  const violationScoreData = [
    { name: 'Very High', value: 15 },
    { name: 'High', value: 25 },
    { name: 'Medium', value: 35 },
    { name: 'Low', value: 25 },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="text-2xl font-semibold text-gray-900">
                    {report.title} - Detailed Report
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Report Overview */}
                  <section>
                    <h3 className="text-lg font-semibold mb-4">Report Overview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Total Ads Monitored</p>
                        <p className="text-2xl font-semibold">1,284</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Violations Found</p>
                        <p className="text-2xl font-semibold text-red-600">308</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Average Violation Score</p>
                        <p className="text-2xl font-semibold text-orange-600">7.8</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Brands Monitored</p>
                        <p className="text-2xl font-semibold text-blue-600">156</p>
                      </div>
                    </div>
                  </section>

                  {/* Top 10 Violating Brands */}
                  <section className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Top 10 Violating Brands</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Violations</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Communication Status</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {topViolatingBrands.map((brand, index) => (
                            <tr key={brand.id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                #{index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {brand.brand}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {brand.violations}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={brandCommunication.find(b => b.id === brand.id)?.communicated}
                                    onChange={() => toggleCommunication(brand.id)}
                                  />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                  <span className="ml-3 text-sm font-medium text-gray-900">
                                    {brandCommunication.find(b => b.id === brand.id)?.communicated ? 'Communicated' : 'Pending'}
                                  </span>
                                </label>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Violation Score Distribution */}
                  <section className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Violation Score Distribution</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={violationScoreData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {violationScoreData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={trendsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="violations" fill="#ef4444" name="Violations" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </section>

                  {/* Top 5 Violating Ads */}
                  <section className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Top 5 Violating Ads</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {topViolatingAds.map((ad) => (
                        <div key={ad.id} className="bg-gray-50 p-4 rounded-lg flex items-start gap-4">
                          <div className="w-32 h-32 flex-shrink-0">
                            <img
                              src={ad.thumbnail}
                              alt={ad.adTitle}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{ad.brand}</h4>
                                <p className="text-sm text-gray-600">{ad.adTitle}</p>
                              </div>
                              <div className="flex items-center">
                                <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800">
                                  Score: {ad.violationScore}
                                </span>
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">
                              <span className="font-medium">Platform:</span> {ad.platform}
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                              <span className="font-medium">Violation:</span> {ad.reason}
                            </p>
                            <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                              View Ad Details
                              <ExternalLink size={16} className="ml-1" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* AI Monitoring Observations */}
                  <section className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">AI Monitoring Observations</h3>
                    
                    <div className="space-y-6">
                      {/* Violation Reasons */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Reasons for Violations</h4>
                        <div className="bg-red-50 p-4 rounded-lg">
                          <ul className="list-disc list-inside space-y-2 text-red-700">
                            <li>Use of cartoon characters appealing to children</li>
                            <li>Promotional offers targeting young audiences</li>
                            <li>High sugar content in advertised products</li>
                          </ul>
                        </div>
                      </div>

                      {/* Impact on Children */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Impact on Children</h4>
                        <div className="bg-yellow-50 p-4 rounded-lg">
                          <p className="text-yellow-800">
                            The advertisements may influence children's food preferences and create
                            emotional associations with high-sugar products. The use of animated
                            characters can lead to increased brand recognition among young audiences.
                          </p>
                        </div>
                      </div>

                      {/* Recommended Actions */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Recommended Actions</h4>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <ul className="list-disc list-inside space-y-2 text-green-700">
                            <li>Remove cartoon characters from advertising materials</li>
                            <li>Adjust promotional messaging to target adult audiences</li>
                            <li>Include clear nutritional information in advertisements</li>
                          </ul>
                        </div>
                      </div>

                      {/* Officer Comments */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Officer Comments</h4>
                        <div className="space-y-4">
                          {/* Existing Comments */}
                          {savedComments.length > 0 && (
                            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                              {savedComments.map((comment, index) => (
                                <div key={index} className="text-gray-700">
                                  <p className="text-sm text-gray-500">Officer Comment #{index + 1}</p>
                                  <p>{comment}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* New Comment Input */}
                          <div className="space-y-2">
                            <textarea
                              value={officerComment}
                              onChange={(e) => setOfficerComment(e.target.value)}
                              placeholder="Add your observations..."
                              className="w-full h-24 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={handleSaveComment}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                              Save Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Download Options */}
                  <section className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Download Report</h3>
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Download size={20} />
                        Download PDF
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Download size={20} />
                        Download CSV
                      </button>
                    </div>
                  </section>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const StatCard = ({ title, value, trend, icon: Icon, trendValue }: any) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${trend === 'up' ? 'bg-green-100' : 'bg-red-100'}`}>
        <Icon className={trend === 'up' ? 'text-green-600' : 'text-red-600'} size={24} />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      {trend === 'up' ? (
        <TrendingUp size={16} className="text-green-500 mr-1" />
      ) : (
        <TrendingDown size={16} className="text-red-500 mr-1" />
      )}
      <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
        {trendValue}
      </span>
    </div>
  </div>
);

const ReportCard = ({ title, description, icon: Icon, date, onView }: any) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="p-2 bg-blue-100 rounded-lg mr-4">
          <Icon className="text-blue-600" size={24} />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <Download size={20} className="text-gray-600" />
      </button>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">PDF</span>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">CSV</span>
      </div>
      <button
        onClick={onView}
        className="text-blue-600 hover:text-blue-700 flex items-center text-sm font-medium"
      >
        View Report
        <ChevronRight size={16} className="ml-1" />
      </button>
    </div>
  </div>
);

export function ReportsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showComplianceSettings, setShowComplianceSettings] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'reports'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Reports
        </button>
        </div>
        <button
          onClick={() => setShowComplianceSettings(true)}
          className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          <Settings className="w-5 h-5 mr-2" />
          Compliance Settings
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Ads Monitored"
              value="1,284"
              trend="up"
              icon={Activity}
              trendValue="+12.5% from last month"
            />
            <StatCard
              title="Compliance Rate"
              value="76%"
              trend="up"
              icon={CheckCircle}
              trendValue="+5.2% from last month"
            />
            <StatCard
              title="Violations Found"
              value="308"
              trend="down"
              icon={AlertTriangle}
              trendValue="-8.3% from last month"
            />
            <StatCard
              title="Active Advertisers"
              value="156"
              trend="up"
              icon={Users}
              trendValue="+3.8% from last month"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Violations by Platform</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={violationsByPlatform}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="violations" fill="#ef4444" name="Violations" />
                    <Bar dataKey="compliant" fill="#22c55e" name="Compliant" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Violation Trends</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="violations"
                      stroke="#ef4444"
                      name="Violations"
                    />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#3b82f6"
                      name="Total Ads"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Types of Violations</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={violationTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {violationTypes.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Violations</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">McDonald's UAE</p>
                      <p className="text-sm text-gray-500">Facebook Ad Campaign</p>
                    </div>
                    <div className="flex items-center">
                      <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-800">
                        Child Appeal
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Monthly Reports</h2>
            <p className="text-gray-600 mb-6">
              Comprehensive monthly analysis of ad monitoring and violations across all platforms
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <ReportCard
                title="March 2025 Report"
                description="Monthly compliance report including violation summary, top offending brands, and platform risk profiles."
                icon={FileText}
                date="Generated on Apr 1, 2025"
                onView={() => setSelectedReport({
                  title: "March 2025 Report",
                  type: "monthly"
                })}
              />
              <ReportCard
                title="February 2025 Report"
                description="Complete analysis of February's ad monitoring data with child exposure trends and geo distribution."
                icon={FileText}
                date="Generated on Mar 1, 2025"
                onView={() => setSelectedReport({
                  title: "February 2025 Report",
                  type: "monthly"
                })}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">Quarterly Reports</h2>
            <p className="text-gray-600 mb-6">
              In-depth quarterly analysis with policy recommendations and longitudinal trends
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <ReportCard
                title="Q1 2025 Report"
                description="Quarterly trends overview, seasonal behavior analysis, and policy recommendations."
                icon={Calendar}
                date="Generated on Apr 1, 2025"
                onView={() => setSelectedReport({
                  title: "Q1 2025 Report",
                  type: "quarterly"
                })}
              />
              <ReportCard
                title="Q4 2024 Report"
                description="Year-end analysis with comprehensive violation patterns and enforcement suggestions."
                icon={Calendar}
                date="Generated on Jan 1, 2025"
                onView={() => setSelectedReport({
                  title: "Q4 2024 Report",
                  type: "quarterly"
                })}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Report Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Automatic Report Generation</h3>
                  <p className="text-sm text-gray-500">Generate and send reports automatically</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-500">Receive email alerts for new reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Bilingual Reports</h3>
                  <p className="text-sm text-gray-500">Generate reports in English and Arabic</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedReport && (
        <DetailedReport
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          report={selectedReport}
        />
      )}

      {/* Compliance Settings Modal */}
      <Dialog
        open={showComplianceSettings}
        onClose={() => setShowComplianceSettings(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-4xl w-full bg-gray-50 rounded-xl shadow-lg">
            <ComplianceSettings />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}