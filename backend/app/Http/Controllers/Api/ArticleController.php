<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::query();
        $user = $request->user();
        $showAll = $request->boolean('show_all', false);

        //Only apply preferences if show_all is false AND preferences exist
        if (!$showAll && $user) {
            $usedPreference = false;

            if (!empty($user->preferred_categories)) {
                $query->whereIn('category', (array)  $user->preferred_categories);
                // $query->whereIn('category', $user->preferred_categories);
                $usedPreference = true;
            }

            if (!empty($user->preferred_sources)) {
                $query->whereIn('source', (array) $user->preferred_sources);
                $usedPreference = true;
            }

            if (!empty($user->preferred_authors)) {
                $query->whereIn('author', (array) $user->preferred_authors);
                $usedPreference = true;
            }

            //If no preferences are saved, fall back to manual filters
            if (!$usedPreference) {
                if ($request->filled('category')) {
                    $query->whereIn('category', (array) $request->category);
                }

                if ($request->filled('source')) {
                    $query->whereIn('source', (array) $request->source);
                }
                
                if ($request->filled('author')) {
                    $query->whereIn('author', (array) $request->author);
                }
            }
        } else {
            if ($request->filled('category')) {
                $query->whereIn('category', (array) $request->category);
            }

            if ($request->filled('source')) {
                $query->whereIn('source', (array) $request->source);
            }
            
            if ($request->filled('author')) {
                $query->whereIn('author', (array) $request->author);
            }
        }

        //Always allow keyword and date filters (global)
        if ($request->filled('keyword')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->keyword . '%')
                ->orWhere('description', 'like', '%' . $request->keyword . '%');
            });
        }

        if ($request->filled('from_date')) {
            $query->whereDate('published_at', '>=', $request->from_date);
        }

        if ($request->filled('to_date')) {
            $query->whereDate('published_at', '<=', $request->to_date);
        }

        return ArticleResource::collection(
            $query->latest('published_at')->paginate(10)
        );
    }

    public function metadata()
    {
        return response()->json([
            'categories' => Article::distinct()->pluck('category')->filter()->values(),
            'sources'    => Article::distinct()->pluck('source')->filter()->values(),
            'authors'    => Article::distinct()->pluck('author')->filter()->values(),
        ]);
    }
}
