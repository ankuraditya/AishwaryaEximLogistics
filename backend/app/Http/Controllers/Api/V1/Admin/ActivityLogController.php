<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\ActivityLogIndexRequest;
use App\Http\Resources\Api\V1\Admin\AdminActivityLogResource;
use App\Models\AdminActivityLog;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;

class ActivityLogController extends Controller
{
    public function index(
        ActivityLogIndexRequest $request
    ): JsonResponse {
        $query =
            AdminActivityLog::query()
                ->with(
                    'admin:id,name'
                )
                ->latest(
                    'created_at'
                );

        $query->when(
            $request->filled(
                'category'
            ),
            fn ($query) => $query->where(
                'category',
                $request->input(
                    'category'
                )
            )
        );

        $query->when(
            $request->filled(
                'action'
            ),
            fn ($query) => $query->where(
                'action',
                $request->input(
                    'action'
                )
            )
        );

        $query->when(
            $request->filled(
                'admin_id'
            ),
            fn ($query) => $query->where(
                'admin_id',
                $request->integer(
                    'admin_id'
                )
            )
        );

        $logs =
            $query->paginate(
                $request->integer(
                    'per_page',
                    20
                )
            );

        $data =
            collect(
                $logs->items()
            )
                ->map(
                    fn ($log) => (
                            new AdminActivityLogResource(
                                $log
                            )
                        )->resolve(
                            $request
                        )
                )
                ->values()
                ->all();

        return ApiResponse::success(
            $data,
            'Activity logs retrieved successfully.',
            200,
            [
                'current_page' => $logs->currentPage(),

                'last_page' => $logs->lastPage(),

                'per_page' => $logs->perPage(),

                'total' => $logs->total(),
            ]
        );
    }
}
