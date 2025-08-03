<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchNewsFromNYTimes extends Command
{
    protected $signature = 'news:fetch-nytimes';

    protected $description = 'Fetch news articles from the New York Times API';

    public function handle()
    {
        $this->info('📡 Fetching articles from New York Times...');

        $apiKey = config('services.nytimes.key');
        $response = Http::get("https://api.nytimes.com/svc/topstories/v2/home.json", [
            'api-key' => $apiKey,
        ]);

        if ($response->failed()) {
            $this->error('❌ Failed to fetch data from New York Times.');
            return 1;
        }

        $articles = $response->json('results');

        $this->info('Processing ' . count($articles) . ' articles...');

        foreach ($articles as $item) {
            if (empty($item['abstract'])) {
                $this->line('⚠️ Skipped (no description): ' . $item['title']);
                continue;
            }

            Article::updateOrCreate(
                ['url' => $item['url']],
                [
                    'title' => $item['title'],
                    'description' => $item['abstract'],
                    'source' => 'New York Times',
                    'author' => $item['byline'] ?? null,
                    'category' => $item['section'] ?? 'general',
                    'published_at' => \Carbon\Carbon::parse($item['published_date'])->format('Y-m-d H:i:s'),
                ]
            );

            $this->line('✅ Saved: ' . $item['title']);
        }

        $this->info('🎉 Done fetching from NYTimes.');
        return 0;
    }
}
