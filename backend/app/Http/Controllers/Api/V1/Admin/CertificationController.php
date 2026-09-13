<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CertificationController extends Controller
{
    public function index(): JsonResponse
    {
        return ApiResponse::success(Certification::with('media')->orderBy('sort_order')->get());
    }

    public function store(Request $request): JsonResponse
    {
        return ApiResponse::created(Certification::create($request->validate($this->rules()))->load('media'));
    }

    public function update(Request $request, Certification $certification): JsonResponse
    {
        $certification->update($request->validate($this->rules()));

        return ApiResponse::success($certification->fresh('media'), 'Certification updated successfully.');
    }

    public function destroy(Certification $certification): JsonResponse
    {
        $certification->delete();

        return ApiResponse::success(null, 'Certification deleted successfully.');
    }

    private function rules(): array
    {
        return [
            'media_id' => ['nullable', 'exists:media,id'],
            'code' => ['nullable', 'string', 'max:40'],
            'title' => ['required', 'string', 'max:180'],
            'description' => ['nullable', 'string', 'max:1200'],
            'registration_number' => ['nullable', 'string', 'max:180'],
            'issued_at' => ['nullable', 'date'],
            'expires_at' => ['nullable', 'date', 'after_or_equal:issued_at'],
            'is_active' => ['sometimes', 'boolean'],
            'sort_order' => ['sometimes', 'integer', 'min:0'],
        ];
    }
}
