<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchNewsFromNewsAPI extends Command
{
    protected $signature = 'news:fetch-newsapi';

    protected $description = 'Fetch news articles from NewsAPI.org and store them in the database';

    public function handle()
    {
        $this->info('Fetching articles from NewsAPI.org...');

        $apiKey = config('services.newsapi.key');
        $response = Http::get('https://newsapi.org/v2/top-headlines', [
            'country' => 'us',
            'pageSize' => 50,
            'apiKey' => $apiKey,
        ]);

        if ($response->failed()) {
            $this->error('Failed to fetch data from NewsAPI');
            return 1;
        }

        $articles = $response->json('articles');

        foreach ($articles as $item) {
            if (empty($item['description'])){
                $this->line('⚠️ Skipped (no description): ' . $item['title']);
                continue;
            }
                

            Article::updateOrCreate(
                ['url' => $item['url']],
                [
                    'title' => $item['title'],
                    'description' => $item['description'],
                    'source' => $item['source']['name'] ?? null,
                    'author' => $item['author'],
                    'category' => 'general', // optional, you can add logic here
                    'published_at' => \Carbon\Carbon::parse($item['publishedAt'])->format('Y-m-d H:i:s'),
                ]
            );

            $this->line('✅ Saved: ' . $item['title']);
        }

        $this->info('🎉 Done! All articles fetched and saved.');
        return 0;
    }
}
