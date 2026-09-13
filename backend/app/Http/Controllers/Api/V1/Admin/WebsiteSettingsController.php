<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\UpdateWebsiteSettingsRequest;
use App\Services\WebsiteSettingService;
use App\Support\ApiResponse;
use App\Support\WebsiteSettingsRegistry;
use Illuminate\Http\JsonResponse;

class WebsiteSettingsController extends Controller
{
    public function __construct(
        private readonly WebsiteSettingService $settingsService
    ) {}

    public function index(): JsonResponse
    {
        return ApiResponse::success(
            $this
                ->settingsService
                ->adminSettings(),
            'Website settings retrieved successfully.'
        );
    }

    public function show(
        string $group
    ): JsonResponse {
        if (
            ! WebsiteSettingsRegistry::group(
                $group
            )
        ) {
            return ApiResponse::error(
                'Settings group not found.',
                null,
                404
            );
        }

        return ApiResponse::success(
            $this
                ->settingsService
                ->adminSettings(
                    $group
                ),
            'Website settings group retrieved successfully.'
        );
    }

    public function update(
        UpdateWebsiteSettingsRequest $request,
        string $group
    ): JsonResponse {
        return ApiResponse::success(
            $this
                ->settingsService
                ->updateGroup(
                    $group,
                    $request
                        ->validated(
                            'values'
                        ),
                    $request->user()
                ),
            'Website settings updated successfully.'
        );
    }
}
