import { useEffect, useState } from "react";
import api from "../api/axios";

export function useArticles(
  filters: any,
  page: number,
  isAuthenticated: boolean
) {
  const [articles, setArticles] = useState([]);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const fetchWithPreferences = async () => {
      let activeFilters = { ...filters };

      if (
        isAuthenticated &&
        !filters.category.length &&
        !filters.source.length
      ) {
        const prefRes = await api.get("/preferences");
        activeFilters = {
          ...activeFilters,
          category: prefRes.data.preferred_categories || [],
          source: prefRes.data.preferred_sources || [],
        };
      }

      const res = await api.get("/articles", {
        params: { page, ...activeFilters },
      });
      setArticles(res.data.data);
      setLastPage(res.data.meta.last_page);
    };

    fetchWithPreferences();
  }, [filters, page, isAuthenticated]);

  return { articles, lastPage };
}
