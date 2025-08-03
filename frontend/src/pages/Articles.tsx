import { useState, useEffect } from "react";
import FiltersPanel from "../components/FiltersPanel";
import ArticleList from "../components/ArticleList";
import { useArticles } from "../hooks/useArticles";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";

interface Filters {
  category: string[];
  source: string[];
  author: string[];
  keyword: string;
  from_date: string;
  to_date: string;
}

export default function Articles() {
  const { isAuthenticated } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    category: [],
    source: [],
    author: [],
    keyword: "",
    from_date: "",
    to_date: "",
  });
  const [page, setPage] = useState(1);

  const resetFilters = () => {
    setFilters({
      keyword: "",
      category: [],
      source: [],
      from_date: "",
      to_date: "",
      author: [],
    });
    setPage(1);
  };

  const { articles, lastPage } = useArticles(filters, page, isAuthenticated);

  useEffect(() => {
    const category = searchParams.getAll("category");
    const source = searchParams.getAll("source");
    const author = searchParams.getAll("author");
    const keyword = searchParams.get("keyword") || "";
    const from_date = searchParams.get("from_date") || "";
    const to_date = searchParams.get("to_date") || "";

    setFilters({
      category,
      source,
      author,
      keyword,
      from_date,
      to_date,
    });
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    filters.category.forEach((c: string) => params.append("category", c));
    filters.source.forEach((s: string) => params.append("source", s));
    filters.author?.forEach?.((a: string) => params.append("author", a));

    if (filters.keyword) params.set("keyword", filters.keyword);
    if (filters.from_date) params.set("from_date", filters.from_date);
    if (filters.to_date) params.set("to_date", filters.to_date);

    setSearchParams(params);
  }, [filters]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 ">
      <FiltersPanel
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
      />
      <ArticleList articles={articles} />
      <div className="mt-6 flex justify-center gap-2">
        {page > 1 && (
          <button
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
        )}
        {page < lastPage && (
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
