<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use App\Support\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdminIsActive
{
    public function handle(
        Request $request,
        Closure $next
    ): Response {
        $admin =
            $request->user();

        if (
            ! $admin instanceof Admin
            ||
            ! $admin->is_active
        ) {
            if (
                Auth::guard(
                    'web'
                )->check()
            ) {
                Auth::guard(
                    'web'
                )->logout();
            }

            if (
                $request->hasSession()
            ) {
                $request
                    ->session()
                    ->invalidate();

                $request
                    ->session()
                    ->regenerateToken();
            }

            return ApiResponse::error(
                'Administrator account is inactive.',
                null,
                403
            );
        }

        return $next(
            $request
        );
    }
}
