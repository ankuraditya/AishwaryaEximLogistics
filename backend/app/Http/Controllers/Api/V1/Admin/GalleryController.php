<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
use App\Models\GalleryItem;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class GalleryController extends Controller
{
    public function categories(): JsonResponse
    {
        return ApiResponse::success(GalleryCategory::withCount('items')->orderBy('sort_order')->get());
    }

    public function storeCategory(Request $request): JsonResponse
    {
        $data = $request->validate($this->categoryRules());
        $data['slug'] ??= Str::slug($data['name']);

        return ApiResponse::created(GalleryCategory::create($data));
    }

    public function updateCategory(Request $request, GalleryCategory $galleryCategory): JsonResponse
    {
        $data = $request->validate($this->categoryRules($galleryCategory));
        $data['slug'] ??= Str::slug($data['name'] ?? $galleryCategory->name);
        $galleryCategory->update($data);

        return ApiResponse::success($galleryCategory->fresh());
    }

    public function destroyCategory(GalleryCategory $galleryCategory): JsonResponse
    {
        abort_if($galleryCategory->items()->exists(), 422, 'A gallery category containing items cannot be deleted.');
        $galleryCategory->delete();

        return ApiResponse::success();
    }

    public function items(): JsonResponse
    {
        return ApiResponse::success(GalleryItem::with(['category', 'media', 'product'])->orderBy('sort_order')->paginate(50));
    }

    public function storeItem(Request $request): JsonResponse
    {
        return ApiResponse::created(GalleryItem::create($request->validate($this->itemRules()))->load(['category', 'media', 'product']));
    }

    public function updateItem(Request $request, GalleryItem $galleryItem): JsonResponse
    {
        $galleryItem->update($request->validate($this->itemRules()));

        return ApiResponse::success($galleryItem->fresh(['category', 'media', 'product']));
    }

    public function destroyItem(GalleryItem $galleryItem): JsonResponse
    {
        $galleryItem->delete();

        return ApiResponse::success();
    }

    private function categoryRules(?GalleryCategory $category = null): array
    {
        return ['name' => ['required', 'string', 'max:150'], 'slug' => ['nullable', 'string', Rule::unique('gallery_categories')->ignore($category)], 'description' => ['nullable', 'string'], 'is_active' => ['sometimes', 'boolean'], 'sort_order' => ['sometimes', 'integer', 'min:0']];
    }

    private function itemRules(): array
    {
        return ['gallery_category_id' => ['nullable', 'exists:gallery_categories,id'], 'product_id' => ['nullable', 'exists:products,id'], 'media_id' => ['required', 'exists:media,id'], 'title' => ['required', 'string', 'max:180'], 'caption' => ['nullable', 'string'], 'is_featured' => ['sometimes', 'boolean'], 'is_active' => ['sometimes', 'boolean'], 'sort_order' => ['sometimes', 'integer', 'min:0']];
    }
}
