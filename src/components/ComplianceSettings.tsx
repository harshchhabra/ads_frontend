import { useState, useEffect } from "react";
import { Plus, Trash2, AlertTriangle } from "lucide-react";
import { HexColorPicker } from "react-colorful";

interface ComplianceCriterion {
  id?: string;
  name: string;
  description: string;
  category: string;
  weight: number;
  keywords: string[];
  enabled: boolean;
}

export function ComplianceSettings() {
  const [criteria, setCriteria] = useState<ComplianceCriterion[]>([]);
  const [newCriterion, setNewCriterion] = useState<ComplianceCriterion>({
    name: "",
    description: "",
    category: "visual",
    weight: 1.0,
    keywords: [],
    enabled: true,
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCriteria();
  }, []);

  async function loadCriteria() {
    try {
      const { data, error } = await supabase
        .from("compliance_criteria")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCriteria(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load criteria");
    }
  }

  async function saveCriterion(criterion: ComplianceCriterion) {
    try {
      const { error } = await supabase
        .from("compliance_criteria")
        .insert([criterion]);

      if (error) throw error;

      await loadCriteria();
      setNewCriterion({
        name: "",
        description: "",
        category: "visual",
        weight: 1.0,
        keywords: [],
        enabled: true,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save criterion");
    }
  }

  async function deleteCriterion(id: string) {
    try {
      const { error } = await supabase
        .from("compliance_criteria")
        .delete()
        .eq("id", id);

      if (error) throw error;
      await loadCriteria();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete criterion"
      );
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Compliance Settings
        </h2>
        <button
          onClick={() => saveCriterion(newCriterion)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Criterion
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 space-y-6">
          {/* New Criterion Form */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add New Criterion
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={newCriterion.name}
                  onChange={(e) =>
                    setNewCriterion({ ...newCriterion, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter criterion name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newCriterion.category}
                  onChange={(e) =>
                    setNewCriterion({
                      ...newCriterion,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="visual">Visual</option>
                  <option value="text">Text</option>
                  <option value="audio">Audio</option>
                  <option value="targeting">Targeting</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight
                </label>
                <input
                  type="number"
                  value={newCriterion.weight}
                  onChange={(e) =>
                    setNewCriterion({
                      ...newCriterion,
                      weight: parseFloat(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  step="0.1"
                  min="0"
                  max="10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={newCriterion.keywords.join(", ")}
                  onChange={(e) =>
                    setNewCriterion({
                      ...newCriterion,
                      keywords: e.target.value.split(",").map((k) => k.trim()),
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter keywords"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newCriterion.description}
                  onChange={(e) =>
                    setNewCriterion({
                      ...newCriterion,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Enter criterion description"
                />
              </div>
            </div>
          </div>

          {/* Existing Criteria List */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Existing Criteria
            </h3>
            <div className="space-y-4">
              {criteria.map((criterion) => (
                <div
                  key={criterion.id}
                  className="bg-gray-50 rounded-lg p-4 flex items-start justify-between"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {criterion.name}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {criterion.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {criterion.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        criterion.id && deleteCriterion(criterion.id)
                      }
                      className="p-2 text-red-600 hover:text-red-700 rounded-full hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Color Picker Modal */}
      {showColorPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <HexColorPicker color={selectedColor} onChange={setSelectedColor} />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowColorPicker(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
