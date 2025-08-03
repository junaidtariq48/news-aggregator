import ArticleCard from "./ArticleCard";

type Props = {
  articles: any[];
};

export default function ArticleList({ articles }: Props) {
  if (!articles.length) {
    return (
      <p className="text-center text-gray-500 mt-10">No articles found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((a) => (
        <ArticleCard key={a.url} article={a} />
      ))}
    </div>
  );
}
