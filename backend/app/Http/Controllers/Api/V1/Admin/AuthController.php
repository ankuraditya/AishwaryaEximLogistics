<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Admin\LoginRequest;
use App\Http\Resources\Api\V1\Admin\AdminResource;
use App\Models\Admin;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(
        LoginRequest $request
    ): JsonResponse {
        $credentials = [
            'email' => $request->input(
                'email'
            ),

            'password' => $request->input(
                'password'
            ),

            'is_active' => true,
        ];

        if (
            ! Auth::guard(
                'admin'
            )->attempt(
                $credentials,
                $request->boolean(
                    'remember'
                )
            )
        ) {
            return ApiResponse::error(
                'The provided credentials are invalid.',
                [
                    'email' => [
                        'The provided credentials are invalid.',
                    ],
                ],
                422
            );
        }

        /*
         * Session fixation protection.
         */
        $request
            ->session()
            ->regenerate();

        /** @var Admin $admin */
        $admin =
            Auth::guard(
                'admin'
            )->user();

        $admin->forceFill([
            'last_login_at' => now(),

            'last_login_ip' => $request->ip(),
        ])->save();

        return ApiResponse::success(
            new AdminResource(
                $admin
            ),
            'Login successful.'
        );
    }

    public function me(
        Request $request
    ): JsonResponse {
        /** @var Admin|null $admin */
        $admin =
            Auth::guard(
                'admin'
            )->user();

        return ApiResponse::success(
            new AdminResource(
                $admin
            ),
            'Authenticated administrator retrieved.'
        );
    }

    public function logout(
        Request $request
    ): JsonResponse {
        Auth::guard(
            'admin'
        )->logout();

        $request
            ->session()
            ->invalidate();

        $request
            ->session()
            ->regenerateToken();

        return ApiResponse::success(
            null,
            'Logged out successfully.'
        );
    }
}
