import Select from "react-select";
import { useArticleMetadata } from "../hooks/useArticleMetadata";

type Props = {
  filters: any;
  setFilters: (filters: any) => void;
  resetFilters: () => void;
};

export default function FiltersPanel({
  filters,
  setFilters,
  resetFilters,
}: Props) {
  const { data, loading } = useArticleMetadata();

  const makeOptions = (arr: string[]) =>
    arr.map((v) => ({ label: v, value: v }));

  if (loading) return <div>Loading filters...</div>;

  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-sm mb-6 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      <div className="grid md:grid-cols-3 gap-4">
        {/* Keyword Search */}
        <input
          type="text"
          placeholder="Keyword..."
          value={filters.keyword}
          onChange={(e) =>
            setFilters((f: any) => ({ ...f, keyword: e.target.value }))
          }
          className="border p-2 rounded w-full dark:bg-gray-900 transition-colors"
        />

        {/* Source Select */}
        <Select
          isMulti
          options={makeOptions(data.sources)}
          value={makeOptions(filters.source)}
          onChange={(selected) =>
            setFilters((f: any) => ({
              ...f,
              source: selected.map((s) => s.value),
            }))
          }
          placeholder="Select source"
          classNamePrefix="react-select"
        />

        <Select
          isMulti
          options={makeOptions(data.categories)}
          value={makeOptions(filters.category)}
          onChange={(selected) =>
            setFilters((f: any) => ({
              ...f,
              category: selected.map((s) => s.value),
            }))
          }
          placeholder="Select category"
          classNamePrefix="react-select"
        />

        <Select
          isMulti
          options={makeOptions(data.authors)}
          value={makeOptions(filters.author)}
          onChange={(selected) =>
            setFilters((f: any) => ({
              ...f,
              author: selected.map((s) => s.value),
            }))
          }
          placeholder="Select author"
          classNamePrefix="react-select"
        />

        {/* Date Pickers */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="date"
            value={filters.from_date}
            onChange={(e) =>
              setFilters((f: any) => ({ ...f, from_date: e.target.value }))
            }
            className="border p-2 rounded w-full dark:bg-gray-900 transition-colors"
          />

          <input
            type="date"
            value={filters.to_date}
            onChange={(e) =>
              setFilters((f: any) => ({ ...f, to_date: e.target.value }))
            }
            className="border p-2 rounded w-full dark:bg-gray-900 transition-colors"
          />
        </div>
      </div>

      <div className="mt-3">
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 underline"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
