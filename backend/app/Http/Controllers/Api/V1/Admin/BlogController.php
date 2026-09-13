<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class BlogController extends Controller
{
    public function categories(): JsonResponse
    {
        return ApiResponse::success(BlogCategory::withCount('blogs')->get());
    }

    public function storeCategory(Request $request): JsonResponse
    {
        $data = $request->validate(['name' => ['required', 'string', 'max:150'], 'slug' => ['nullable', 'unique:blog_categories,slug']]);
        $data['slug'] ??= Str::slug($data['name']);

        return ApiResponse::created(BlogCategory::create($data));
    }

    public function updateCategory(Request $request, BlogCategory $blogCategory): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'slug' => ['nullable', 'string', Rule::unique('blog_categories')->ignore($blogCategory)],
        ]);
        $data['slug'] ??= Str::slug($data['name']);
        $blogCategory->update($data);

        return ApiResponse::success($blogCategory->fresh(), 'Blog category updated successfully.');
    }

    public function destroyCategory(BlogCategory $blogCategory): JsonResponse
    {
        abort_if($blogCategory->blogs()->exists(), 422, 'A blog category containing posts cannot be deleted.');
        $blogCategory->delete();

        return ApiResponse::success();
    }

    public function posts(): JsonResponse
    {
        return ApiResponse::success(Blog::with(['category', 'featuredMedia', 'author'])->latest()->paginate(30));
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate($this->rules());
        $data['slug'] ??= Str::slug($data['title']);
        $data['author_id'] = $request->user()->id;

        return ApiResponse::created(Blog::create($data)->load(['category', 'featuredMedia', 'author']));
    }

    public function update(Request $request, Blog $blog): JsonResponse
    {
        $data = $request->validate($this->rules($blog));
        $data['slug'] ??= Str::slug($data['title'] ?? $blog->title);
        $blog->update($data);

        return ApiResponse::success($blog->fresh(['category', 'featuredMedia', 'author']));
    }

    public function destroy(Blog $blog): JsonResponse
    {
        $blog->delete();

        return ApiResponse::success();
    }

    private function rules(?Blog $blog = null): array
    {
        return ['blog_category_id' => ['nullable', 'exists:blog_categories,id'], 'featured_media_id' => ['nullable', 'exists:media,id'], 'title' => ['required', 'string', 'max:220'], 'slug' => ['nullable', 'string', Rule::unique('blogs')->ignore($blog)], 'excerpt' => ['nullable', 'string', 'max:600'], 'content' => ['required', 'string'], 'status' => ['required', Rule::in(['draft', 'published'])], 'published_at' => ['nullable', 'date'], 'meta_title' => ['nullable', 'string', 'max:70'], 'meta_description' => ['nullable', 'string', 'max:170']];
    }
}
