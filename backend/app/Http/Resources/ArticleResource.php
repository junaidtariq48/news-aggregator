<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'url' => $this->url,
            'source' => $this->source,
            'author' => $this->author,
            'category' => $this->category,
            'published_at' => \Carbon\Carbon::parse($this->published_at)->format('Y-m-d H:i:s'),
        ];
    }
}
