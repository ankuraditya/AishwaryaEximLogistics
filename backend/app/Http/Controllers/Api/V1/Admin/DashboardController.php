<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Services\AdminDashboardService;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(
        private readonly AdminDashboardService $dashboardService
    ) {}

    public function index(
        Request $request
    ): JsonResponse {
        /** @var Admin $admin */
        $admin =
            $request->user();

        return ApiResponse::success(
            $this
                ->dashboardService
                ->build(
                    $admin
                ),
            'Dashboard retrieved successfully.'
        );
    }
}
