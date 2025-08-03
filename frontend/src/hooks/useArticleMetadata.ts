import { useEffect, useState } from "react";
import api from "../api/axios";

type Metadata = {
  categories: string[];
  sources: string[];
  authors: string[];
};

export const useArticleMetadata = () => {
  const [data, setData] = useState<Metadata>({
    categories: [],
    sources: [],
    authors: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem("article-metadata");
    if (cached) {
      setData(JSON.parse(cached));
      setLoading(false);
    }

    api
      .get("/articles/metadata")
      .then((res) => {
        setData(res.data);
        localStorage.setItem("article-metadata", JSON.stringify(res.data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { data, loading };
};
