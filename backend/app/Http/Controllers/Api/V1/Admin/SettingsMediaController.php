<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\SettingsMediaIndexRequest;
use App\Http\Requests\Api\V1\Admin\UploadSettingsMediaRequest;
use App\Http\Resources\Api\V1\MediaResource;
use App\Models\Media;
use App\Services\SettingsMediaService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class SettingsMediaController extends Controller
{
    public function __construct(
        private readonly SettingsMediaService $mediaService
    ) {}

    public function index(
        SettingsMediaIndexRequest $request
    ): JsonResponse {
        $query =
            Media::query()
                ->where(
                    'disk',
                    'media'
                )
                ->latest();

        $query->when(
            $request->filled(
                'search'
            ),
            function (
                $query
            ) use ($request) {
                $search =
                    trim(
                        (string)
                        $request->input(
                            'search'
                        )
                    );

                $query->where(
                    function (
                        $query
                    ) use ($search) {
                        $query
                            ->where(
                                'title',
                                'like',
                                '%'
                                .$search
                                .'%'
                            )
                            ->orWhere(
                                'original_name',
                                'like',
                                '%'
                                .$search
                                .'%'
                            )
                            ->orWhere(
                                'alt_text',
                                'like',
                                '%'
                                .$search
                                .'%'
                            );
                    }
                );
            }
        );

        $query->when(
            $request->filled(
                'purpose'
            ),
            fn ($query) => $query->where(
                'metadata->purpose',
                $request->input(
                    'purpose'
                )
            )
        );

        $media =
            $query->paginate(
                $request->integer(
                    'per_page',
                    20
                )
            );

        $data =
            collect(
                $media->items()
            )
                ->map(
                    fn (Media $item) => (
                            new MediaResource(
                                $item
                            )
                        )->resolve(
                            $request
                        )
                )
                ->values()
                ->all();

        return ApiResponse::success(
            $data,
            'Settings media retrieved successfully.',
            200,
            [
                'current_page' => $media->currentPage(),

                'last_page' => $media->lastPage(),

                'per_page' => $media->perPage(),

                'total' => $media->total(),
            ]
        );
    }

    public function store(
        UploadSettingsMediaRequest $request
    ): JsonResponse {
        $media =
            $this
                ->mediaService
                ->upload(
                    file: $request->file(
                        'file'
                    ),

                    purpose: $request->string(
                        'purpose'
                    )->toString(),

                    admin: $request->user(),

                    title: $request->input(
                        'title'
                    ),

                    altText: $request->input(
                        'alt_text'
                    )
                );

        return ApiResponse::created(
            new MediaResource(
                $media
            ),
            'Media uploaded successfully.'
        );
    }

    public function destroy(
        Media $media
    ): JsonResponse {
        $deleted =
            $this
                ->mediaService
                ->delete(
                    $media,
                    request()->user()
                );

        if (! $deleted) {
            return ApiResponse::error(
                'This media file cannot be deleted because it is currently in use or is not a public CMS media file.',
                null,
                409
            );
        }

        return ApiResponse::success(
            null,
            'Media deleted successfully.'
        );
    }
}
