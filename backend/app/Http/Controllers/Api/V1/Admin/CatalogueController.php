<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Subcategory;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CatalogueController extends Controller
{
    public function categories(): JsonResponse
    {
        return ApiResponse::success(Category::with(['media', 'subcategories'])->withCount('products')->orderBy('sort_order')->paginate(50));
    }

    public function storeCategory(Request $request): JsonResponse
    {
        $data = $request->validate($this->categoryRules());
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        return ApiResponse::created(Category::create($data)->load('media'), 'Category created successfully.');
    }

    public function updateCategory(Request $request, Category $category): JsonResponse
    {
        $data = $request->validate($this->categoryRules($category));
        $data['slug'] ??= Str::slug($data['name'] ?? $category->name);
        $category->update($data);

        return ApiResponse::success($category->fresh(['media', 'subcategories']), 'Category updated successfully.');
    }

    public function destroyCategory(Category $category): JsonResponse
    {
        abort_if($category->products()->exists(), 422, 'A category containing products cannot be deleted.');
        $category->delete();

        return ApiResponse::success(null, 'Category deleted successfully.');
    }

    public function subcategories(): JsonResponse
    {
        return ApiResponse::success(Subcategory::with('category')->withCount('products')->orderBy('sort_order')->paginate(50));
    }

    public function storeSubcategory(Request $request): JsonResponse
    {
        $data = $request->validate($this->subcategoryRules());
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);

        return ApiResponse::created(Subcategory::create($data)->load('category'), 'Subcategory created successfully.');
    }

    public function updateSubcategory(Request $request, Subcategory $subcategory): JsonResponse
    {
        $data = $request->validate($this->subcategoryRules($subcategory));
        $data['slug'] ??= Str::slug($data['name'] ?? $subcategory->name);
        $subcategory->update($data);

        return ApiResponse::success($subcategory->fresh('category'), 'Subcategory updated successfully.');
    }

    public function destroySubcategory(Subcategory $subcategory): JsonResponse
    {
        abort_if($subcategory->products()->exists(), 422, 'A subcategory containing products cannot be deleted.');
        $subcategory->delete();

        return ApiResponse::success(null, 'Subcategory deleted successfully.');
    }

    public function products(Request $request): JsonResponse
    {
        $products = Product::with(['category', 'subcategory', 'media', 'catalogueMedia', 'specifications'])
            ->when($request->string('search')->toString(), fn ($query, $search) => $query->where(fn ($q) => $q->where('name', 'like', "%{$search}%")->orWhere('sku', 'like', "%{$search}%")))
            ->when($request->filled('category_id'), fn ($query) => $query->where('category_id', $request->integer('category_id')))
            ->orderBy('sort_order')->latest('id')->paginate(min($request->integer('per_page', 20), 100));

        return ApiResponse::success($products);
    }

    public function storeProduct(Request $request): JsonResponse
    {
        $data = $request->validate($this->productRules());
        $media = $data['media'] ?? [];
        $specifications = $data['specifications'] ?? [];
        unset($data['media'], $data['specifications']);
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        $product = Product::create($data);
        $this->syncMedia($product, $media);
        $this->syncSpecifications($product, $specifications);

        return ApiResponse::created($product->load(['category', 'subcategory', 'media', 'catalogueMedia', 'specifications']), 'Product created successfully.');
    }

    public function updateProduct(Request $request, Product $product): JsonResponse
    {
        $data = $request->validate($this->productRules($product));
        $media = $data['media'] ?? null;
        $specifications = $data['specifications'] ?? null;
        unset($data['media'], $data['specifications']);
        $data['slug'] ??= Str::slug($data['name'] ?? $product->name);
        $product->update($data);
        if ($media !== null) {
            $this->syncMedia($product, $media);
        }
        if ($specifications !== null) {
            $this->syncSpecifications($product, $specifications);
        }

        return ApiResponse::success($product->fresh(['category', 'subcategory', 'media', 'catalogueMedia', 'specifications']), 'Product updated successfully.');
    }

    public function destroyProduct(Product $product): JsonResponse
    {
        $product->delete();

        return ApiResponse::success(null, 'Product deleted successfully.');
    }

    private function categoryRules(?Category $category = null): array
    {
        return ['name' => ['required', 'string', 'max:150'], 'slug' => ['nullable', 'string', 'max:180', Rule::unique('categories')->ignore($category)], 'description' => ['nullable', 'string'], 'media_id' => ['nullable', 'exists:media,id'], 'meta_title' => ['nullable', 'string', 'max:70'], 'meta_description' => ['nullable', 'string', 'max:170'], 'is_active' => ['sometimes', 'boolean'], 'sort_order' => ['sometimes', 'integer', 'min:0']];
    }

    private function subcategoryRules(?Subcategory $subcategory = null): array
    {
        return ['category_id' => ['required', 'exists:categories,id'], 'name' => ['required', 'string', 'max:150'], 'slug' => ['nullable', 'string', 'max:180', Rule::unique('subcategories')->ignore($subcategory)], 'description' => ['nullable', 'string'], 'is_active' => ['sometimes', 'boolean'], 'sort_order' => ['sometimes', 'integer', 'min:0']];
    }

    private function productRules(?Product $product = null): array
    {
        return ['category_id' => ['required', 'exists:categories,id'], 'subcategory_id' => ['nullable', 'exists:subcategories,id'], 'catalogue_media_id' => ['nullable', 'exists:media,id'], 'name' => ['required', 'string', 'max:180'], 'slug' => ['nullable', 'string', 'max:200', Rule::unique('products')->ignore($product)], 'sku' => ['nullable', 'string', 'max:100', Rule::unique('products')->ignore($product)], 'short_description' => ['nullable', 'string', 'max:500'], 'description' => ['nullable', 'string'], 'features' => ['nullable', 'array'], 'material' => ['nullable', 'string', 'max:255'], 'dimensions' => ['nullable', 'string', 'max:255'], 'colour' => ['nullable', 'string', 'max:255'], 'moq' => ['nullable', 'string', 'max:255'], 'packaging' => ['nullable', 'string'], 'customisation' => ['nullable', 'string'], 'country_of_origin' => ['nullable', 'string', 'max:120'], 'usage' => ['nullable', 'string', 'max:255'], 'meta_title' => ['nullable', 'string', 'max:70'], 'meta_description' => ['nullable', 'string', 'max:170'], 'is_featured' => ['sometimes', 'boolean'], 'is_active' => ['sometimes', 'boolean'], 'sort_order' => ['sometimes', 'integer', 'min:0'], 'media' => ['sometimes', 'array'], 'media.*.id' => ['required', 'exists:media,id'], 'media.*.is_primary' => ['sometimes', 'boolean'], 'media.*.sort_order' => ['sometimes', 'integer', 'min:0'], 'specifications' => ['sometimes', 'array'], 'specifications.*.label' => ['required', 'string', 'max:150'], 'specifications.*.value' => ['required', 'string', 'max:2000'], 'specifications.*.sort_order' => ['sometimes', 'integer', 'min:0']];
    }

    private function syncMedia(Product $product, array $media): void
    {
        $sync = [];
        foreach ($media as $index => $item) {
            $sync[$item['id']] = ['is_primary' => (bool) ($item['is_primary'] ?? $index === 0), 'sort_order' => $item['sort_order'] ?? $index];
        }
        $product->media()->sync($sync);
    }

    private function syncSpecifications(Product $product, array $specifications): void
    {
        $product->specifications()->delete();
        foreach ($specifications as $index => $specification) {
            $product->specifications()->create([
                'label' => $specification['label'],
                'value' => $specification['value'],
                'sort_order' => $specification['sort_order'] ?? $index,
            ]);
        }
    }
}
