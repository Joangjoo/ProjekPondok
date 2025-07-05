<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the articles.
     */
    public function index()
    {
        $articles = Article::latest()->get();

        $formattedArticles = $articles->map(function ($article) {
            return [
                'id' => $article->id,
                'title' => $article->title,
                'excerpt' => $article->excerpt,
                'author' => $article->author,
                'date' => $article->date,
                'readTime' => $article->read_time,
                'category' => $article->category,
                'views' => $article->views,
                'likes' => $article->likes,
                'image' => $article->image ? asset('storage/' . $article->image) : null,
                'featured' => (bool) $article->featured,
                'url' => $article->external_url,
            ];
        });

        return response()->json($formattedArticles);
    }

    /**
     * Display the specified article.
     */
    public function show(int $id)
    {
        $article = Article::findOrFail($id);

        $article->increment('views');


        return response()->json([
            'id' => $article->id,
            'title' => $article->title,
            'excerpt' => $article->excerpt,
            'author' => $article->author,
            'date' => $article->date,
            'readTime' => $article->read_time,
            'category' => $article->category,
            'views' => $article->views,
            'likes' => $article->likes,
            'image' => $article->image ? asset('storage/' . $article->image) : null,
            'featured' => (bool) $article->featured,
            'url' => $article->external_url,
        ]);
    }
}
