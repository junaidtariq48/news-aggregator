<?php

namespace App\Console\Commands;

use App\Models\Article;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchNewsFromGuardian extends Command
{
    protected $signature = 'news:fetch-guardian';

    protected $description = 'Fetch news articles from The Guardian API and store them';

    public function handle()
    {
        $this->info('Fetching articles from The Guardian...');

        $apiKey = config('services.guardian.key');

        $response = Http::get('https://content.guardianapis.com/search', [
            'api-key' => $apiKey,
            'page-size' => 50,
            'show-fields' => 'trailText,byline',
            'order-by' => 'newest',
        ]);

        if ($response->failed()) {
            $this->error('❌ Failed to fetch data from The Guardian.');
            return 1;
        }

        $articles = $response->json('response.results');

        $this->info('Processing ' . count($articles) . ' articles...');

        foreach ($articles as $item) {
            if (empty($item['fields']['trailText'])) {
                $this->line('⚠️ Skipped (no description): ' . $item['webTitle']);
                continue;
            }

            Article::updateOrCreate(
                ['url' => $item['webUrl']],
                [
                    'title' => $item['webTitle'],
                    'description' => strip_tags($item['fields']['trailText']),
                    'source' => 'The Guardian',
                    'author' => $item['fields']['byline'] ?? null,
                    'category' => $item['sectionName'] ?? 'general',
                    'published_at' => \Carbon\Carbon::parse($item['webPublicationDate'])->format('Y-m-d H:i:s'),
                ]
            );

            $this->line('✅ Saved: ' . $item['webTitle']);
        }

        $this->info('🎉 Done fetching from The Guardian.');
        return 0;
    }
}
