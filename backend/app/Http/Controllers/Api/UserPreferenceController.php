<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserPreferenceController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'preferred_sources' => 'array',
            'preferred_categories' => 'array',
            'preferred_authors' => 'array',
        ]);

        $user = $request->user();

        $user->update([
            'preferred_sources' => $request->preferred_sources,
            'preferred_categories' => $request->preferred_categories,
            'preferred_authors' => $request->preferred_authors,
        ]);

        return response()->json(['message' => 'Preferences updated.']);
    }

    public function show(Request $request)
    {
        return response()->json($request->user()->only([
            'preferred_sources',
            'preferred_categories',
            'preferred_authors',
        ]));
    }
}
