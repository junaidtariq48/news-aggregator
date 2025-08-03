import { useEffect, useState } from "react";
import api from "../api/axios";
import PreferenceSelect from "../components/PreferenceSelect";

export default function Preferences() {
  const [loading, setLoading] = useState(true);
  const [preferences, setPreferences] = useState({
    preferred_categories: [] as string[],
    preferred_sources: [] as string[],
    preferred_authors: [] as string[],
  });

  const [availableOptions, setAvailableOptions] = useState({
    preferred_categories: [],
    preferred_sources: [],
    preferred_authors: [], // Ideally fetched
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [metaRes, prefRes] = await Promise.all([
          api.get("/articles/metadata"),
          api.get("/preferences"),
        ]);

        setAvailableOptions({
          preferred_categories: metaRes.data.categories,
          preferred_sources: metaRes.data.sources,
          preferred_authors: metaRes.data.authors,
        });

        setPreferences({
          preferred_categories: prefRes.data.preferred_categories || [],
          preferred_sources: prefRes.data.preferred_sources || [],
          preferred_authors: prefRes.data.preferred_authors || [],
        });

        setLoading(false);
      } catch (err) {
        console.error("Error loading preferences or metadata:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field: string, selected: string[]) => {
    setPreferences((p) => ({ ...p, [field]: selected }));
  };

  const savePreferences = async () => {
    await api.post("/preferences", preferences);
    alert("Preferences updated!");
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Preferences</h1>

      <PreferenceSelect
        label="Sources"
        field="preferred_sources"
        options={availableOptions.preferred_sources}
        values={preferences?.preferred_sources}
        onChange={handleChange}
      />

      <PreferenceSelect
        label="Categories"
        field="preferred_categories"
        options={availableOptions.preferred_categories}
        values={preferences?.preferred_categories}
        onChange={handleChange}
      />

      <PreferenceSelect
        label="Authors"
        field="preferred_authors"
        options={availableOptions.preferred_authors}
        values={preferences?.preferred_authors}
        onChange={handleChange}
      />

      <div className="mt-6">
        <button
          onClick={savePreferences}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
