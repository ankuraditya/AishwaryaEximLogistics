<?php

namespace App\Providers;

use App\Enums\AdminRole;
use App\Listeners\AdminAuthEventSubscriber;
use App\Models\Admin;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        JsonResource::withoutWrapping();

        /*
        |--------------------------------------------------------------------------
        | Super Admin
        |--------------------------------------------------------------------------
        */

        Gate::before(
            function (
                Admin $admin,
                string $ability
            ): ?bool {
                return $admin->hasRole(
                    AdminRole::SUPER_ADMIN->value
                )
                    ? true
                    : null;
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Authentication Security Events
        |--------------------------------------------------------------------------
        */

        Event::subscribe(
            AdminAuthEventSubscriber::class
        );

        /*
        |--------------------------------------------------------------------------
        | General API
        |--------------------------------------------------------------------------
        */

        RateLimiter::for(
            'api',
            function (
                Request $request
            ) {
                return Limit::perMinute(
                    120
                )->by(
                    $request
                        ->user()
                        ?->getAuthIdentifier()
                    ?: $request->ip()
                );
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Public Enquiries
        |--------------------------------------------------------------------------
        */

        RateLimiter::for(
            'enquiries',
            function (
                Request $request
            ) {
                return [
                    Limit::perMinute(5)
                        ->by(
                            'enquiry-minute:'
                            .$request->ip()
                        ),

                    Limit::perHour(30)
                        ->by(
                            'enquiry-hour:'
                            .$request->ip()
                        ),
                ];
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Admin Login
        |--------------------------------------------------------------------------
        */

        RateLimiter::for(
            'admin-login',
            function (
                Request $request
            ) {
                $email =
                    Str::lower(
                        (string)
                        $request->input(
                            'email'
                        )
                    );

                return [
                    Limit::perMinute(5)
                        ->by(
                            $email
                            .'|'
                            .$request->ip()
                        ),

                    Limit::perHour(30)
                        ->by(
                            'admin-login:'
                            .$request->ip()
                        ),
                ];
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Authenticated Admin API
        |--------------------------------------------------------------------------
        */

        RateLimiter::for(
            'admin',
            function (
                Request $request
            ) {
                return Limit::perMinute(
                    120
                )->by(
                    'admin:'
                    .(
                        $request
                            ->user('admin')
                            ?->id
                        ?: $request->ip()
                    )
                );
            }
        );
    }
}
