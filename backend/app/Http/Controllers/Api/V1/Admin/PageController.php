<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class PageController extends Controller
{
    public function index(): JsonResponse
    {
        return ApiResponse::success(Page::with(['sections.media'])->orderBy('title')->get());
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate($this->rules());
        $sections = $data['sections'] ?? [];
        unset($data['sections']);
        $data['slug'] ??= Str::slug($data['title']);
        $page = Page::create($data);
        $this->sync($page, $sections);

        return ApiResponse::created($page->load('sections.media'));
    }

    public function update(Request $request, Page $page): JsonResponse
    {
        $data = $request->validate($this->rules($page));
        $sections = $data['sections'] ?? null;
        unset($data['sections']);
        $data['slug'] ??= Str::slug($data['title'] ?? $page->title);
        $page->update($data);
        if ($sections !== null) {
            $this->sync($page, $sections);
        }

        return ApiResponse::success($page->fresh('sections.media'));
    }

    public function destroy(Page $page): JsonResponse
    {
        $page->delete();

        return ApiResponse::success();
    }

    private function rules(?Page $page = null): array
    {
        return ['slug' => ['nullable', 'string', 'max:180', Rule::unique('pages')->ignore($page)], 'title' => ['required', 'string', 'max:180'], 'summary' => ['nullable', 'string'], 'meta_title' => ['nullable', 'string', 'max:70'], 'meta_description' => ['nullable', 'string', 'max:170'], 'is_active' => ['sometimes', 'boolean'], 'sections' => ['sometimes', 'array'], 'sections.*.section_key' => ['required', 'string', 'max:100'], 'sections.*.heading' => ['nullable', 'string', 'max:255'], 'sections.*.eyebrow' => ['nullable', 'string', 'max:150'], 'sections.*.body' => ['nullable', 'string'], 'sections.*.media_id' => ['nullable', 'exists:media,id'], 'sections.*.content' => ['nullable', 'array'], 'sections.*.is_active' => ['sometimes', 'boolean'], 'sections.*.sort_order' => ['sometimes', 'integer', 'min:0']];
    }

    private function sync(Page $page, array $sections): void
    {
        $page->sections()->delete();
        foreach ($sections as $i => $section) {
            $page->sections()->create([...$section, 'sort_order' => $section['sort_order'] ?? $i]);
        }
    }
}
