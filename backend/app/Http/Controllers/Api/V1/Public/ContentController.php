<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Models\Category;
use App\Models\Certification;
use App\Models\GalleryItem;
use App\Models\Page;
use App\Models\Product;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    public function certifications(): JsonResponse
    {
        return ApiResponse::success(
            Certification::where('is_active', true)->with('media')->orderBy('sort_order')->get()
        );
    }

    public function categories(): JsonResponse
    {
        return ApiResponse::success(Category::where('is_active', true)->with(['media', 'subcategories' => fn ($q) => $q->where('is_active', true)])->orderBy('sort_order')->get());
    }

    public function category(Category $category): JsonResponse
    {
        abort_unless($category->is_active, 404);

        return ApiResponse::success($category->load(['media', 'subcategories']));
    }

    public function products(Request $request): JsonResponse
    {
        $items = Product::published()->with(['category', 'subcategory', 'media', 'catalogueMedia', 'specifications'])->when($request->filled('category'), fn ($q) => $q->whereHas('category', fn ($category) => $category->where('slug', $request->string('category'))))->when($request->filled('search'), fn ($q) => $q->where(fn ($search) => $search->where('name', 'like', '%'.$request->string('search').'%')->orWhere('sku', 'like', '%'.$request->string('search').'%')))->orderBy('sort_order')->paginate(min($request->integer('per_page', 20), 60));

        return ApiResponse::success($items);
    }

    public function product(Product $product): JsonResponse
    {
        abort_unless($product->is_active, 404);

        return ApiResponse::success($product->load(['category', 'subcategory', 'media', 'catalogueMedia', 'specifications']));
    }

    public function gallery(): JsonResponse
    {
        return ApiResponse::success(GalleryItem::where('is_active', true)->with(['category', 'media', 'product:id,name,slug,category_id'])->orderBy('sort_order')->paginate(60));
    }

    public function blogs(): JsonResponse
    {
        return ApiResponse::success(Blog::published()->with(['category', 'featuredMedia', 'author:id,name'])->latest('published_at')->paginate(12));
    }

    public function blog(Blog $blog): JsonResponse
    {
        abort_unless($blog->status === 'published' && $blog->published_at?->isPast(), 404);

        return ApiResponse::success($blog->load(['category', 'featuredMedia', 'author:id,name']));
    }

    public function page(Page $page): JsonResponse
    {
        abort_unless($page->is_active, 404);

        return ApiResponse::success($page->load(['sections' => fn ($query) => $query->where('is_active', true)->with('media')]));
    }
}
