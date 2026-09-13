<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\ChangePasswordRequest;
use App\Http\Requests\Api\V1\Admin\ConfirmPasswordRequest;
use App\Http\Requests\Api\V1\Admin\UpdateProfileRequest;
use App\Http\Resources\Api\V1\Admin\AdminResource;
use App\Models\Admin;
use App\Services\AdminActivityLogger;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    public function __construct(
        private readonly AdminActivityLogger $activityLogger
    ) {}

    public function show(
        Request $request
    ): JsonResponse {
        return ApiResponse::success(
            new AdminResource(
                $request->user()
            ),
            'Administrator profile retrieved.'
        );
    }

    public function update(
        UpdateProfileRequest $request
    ): JsonResponse {
        /** @var Admin $admin */
        $admin =
            $request->user();

        $admin->fill(
            $request->validated()
        );

        $changedFields =
            array_keys(
                $admin->getDirty()
            );

        $admin->save();

        $this->activityLogger->log(
            action: 'profile.updated',

            category: 'profile',

            description: 'Administrator updated their profile.',

            admin: $admin,

            subject: $admin,

            metadata: [
                'changed_fields' => $changedFields,
            ]
        );

        return ApiResponse::success(
            new AdminResource(
                $admin->fresh()
            ),
            'Profile updated successfully.'
        );
    }

    public function changePassword(
        ChangePasswordRequest $request
    ): JsonResponse {
        /** @var Admin $admin */
        $admin =
            $request->user();

        $currentSessionId =
            $request
                ->session()
                ->getId();

        /*
         * Invalidate all other
         * database sessions first.
         */
        $removedSessions =
            DB::table(
                'sessions'
            )
                ->where(
                    'user_id',
                    $admin->id
                )
                ->where(
                    'id',
                    '!=',
                    $currentSessionId
                )
                ->delete();

        /*
         * The Admin model's hashed
         * cast hashes this value.
         */
        $admin->forceFill([
            'password' => $request->input(
                'password'
            ),

            'password_changed_at' => now(),

            /*
             * Invalidates old
             * remember-me cookies.
             */
            'remember_token' => Str::random(60),
        ])->save();

        /*
         * Refresh current session.
         */
        $request
            ->session()
            ->regenerate();

        $request
            ->session()
            ->regenerateToken();

        $this->activityLogger->log(
            action: 'security.password_changed',

            category: 'security',

            description: 'Administrator changed their password.',

            admin: $admin,

            subject: $admin,

            metadata: [
                'other_sessions_removed' => $removedSessions,
            ]
        );

        return ApiResponse::success(
            null,
            'Password changed successfully.'
        );
    }

    public function logoutOtherSessions(
        ConfirmPasswordRequest $request
    ): JsonResponse {
        /** @var Admin $admin */
        $admin =
            $request->user();

        $currentSessionId =
            $request
                ->session()
                ->getId();

        $removed =
            DB::table(
                'sessions'
            )
                ->where(
                    'user_id',
                    $admin->id
                )
                ->where(
                    'id',
                    '!=',
                    $currentSessionId
                )
                ->delete();

        /*
         * Also invalidate old
         * remember-me cookies.
         */
        $admin->forceFill([
            'remember_token' => Str::random(60),
        ])->save();

        $this->activityLogger->log(
            action: 'security.other_sessions_revoked',

            category: 'security',

            description: 'Administrator logged out other sessions.',

            admin: $admin,

            subject: $admin,

            metadata: [
                'sessions_removed' => $removed,
            ]
        );

        return ApiResponse::success(
            [
                'sessions_removed' => $removed,
            ],
            'Other sessions logged out successfully.'
        );
    }
}
