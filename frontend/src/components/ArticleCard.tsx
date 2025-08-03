type Props = {
  article: {
    title: string;
    description: string;
    url: string;
    source: string;
    published_at: string;
  };
};

export default function ArticleCard({ article }: Props) {
  return (
    <a
      href={article.url}
      target="_blank"
      className="block border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors"
    >
      <h2 className="font-semibold text-lg mb-1 line-clamp-2">
        {article.title}
      </h2>
      <p className="text-sm text-gray-600 mb-2 line-clamp-3">
        {article.description}
      </p>
      <div className="text-xs text-gray-400 flex justify-between">
        <span>{article.source}</span>
        <span>{new Date(article.published_at).toLocaleDateString()}</span>
      </div>
    </a>
  );
}
