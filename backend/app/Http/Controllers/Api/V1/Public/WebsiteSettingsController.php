<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Services\WebsiteSettingService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class WebsiteSettingsController extends Controller
{
    public function __construct(
        private readonly WebsiteSettingService $settingsService
    ) {}

    public function __invoke(): JsonResponse
    {
        return ApiResponse::success(
            $this
                ->settingsService
                ->publicSettings(),
            'Website settings retrieved successfully.'
        );
    }
}
