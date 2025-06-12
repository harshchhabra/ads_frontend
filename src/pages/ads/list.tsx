import { useState } from "react";
import { ReportsDashboard } from "../../components/ReportsDashboard";
import { AdMonitor } from "../../components/AdMonitor";
import { Activity, FileText } from "lucide-react";

export default function AdsList() {
  const [activeTab, setActiveTab] = useState<"monitor" | "reports">("monitor");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            ADECA Ad Compliance Monitor
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("monitor")}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === "monitor"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Activity className="w-5 h-5 mr-2" />
            Monitor
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex items-center px-4 py-2 rounded-lg ${
              activeTab === "reports"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-5 h-5 mr-2" />
            Reports
          </button>
        </div>

        {activeTab === "monitor" ? <AdMonitor /> : <ReportsDashboard />}
      </main>
    </div>
  );
}
