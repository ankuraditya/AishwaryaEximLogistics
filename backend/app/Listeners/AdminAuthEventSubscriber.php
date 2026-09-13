<?php

namespace App\Listeners;

use App\Models\Admin;
use Illuminate\Auth\Events\Failed;
use Illuminate\Events\Dispatcher;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

class AdminAuthEventSubscriber
{
    public function handleFailedLogin(
        Failed $event
    ): void {
        /*
         * Only audit administrator
         * authentication failures.
         */
        if ($event->guard !== 'admin') {
            return;
        }

        $request = request();

        $email = isset(
            $event->credentials['email']
        )
            ? Str::lower(
                trim(
                    (string)
                    $event->credentials['email']
                )
            )
            : null;

        $payload = [
            'action' => 'auth.login_failed',

            'category' => 'security',
        ];

        /*
         * Attach optional audit fields
         * only when they exist in the
         * current schema.
         */

        if (
            Schema::hasColumn(
                'admin_activity_logs',
                'admin_id'
            )
        ) {
            $payload['admin_id'] =
                $event->user instanceof Admin
                    ? $event->user->getKey()
                    : null;
        }

        if (
            Schema::hasColumn(
                'admin_activity_logs',
                'title'
            )
        ) {
            $payload['title'] =
                'Failed administrator login';
        }

        if (
            Schema::hasColumn(
                'admin_activity_logs',
                'description'
            )
        ) {
            $payload['description'] =
                'A failed administrator login attempt was detected.';
        }

        if (
            Schema::hasColumn(
                'admin_activity_logs',
                'module'
            )
        ) {
            $payload['module'] =
                'security';
        }

        if (
            Schema::hasColumn(
                'admin_activity_logs',
                'ip_address'
            )
        ) {
            $payload['ip_address'] =
                $request->ip();
        }

        if (
            Schema::hasColumn(
                'admin_activity_logs',
                'user_agent'
            )
        ) {
            $payload['user_agent'] =
                $request->userAgent();
        }

        if (
            Schema::hasColumn(
                'admin_activity_logs',
                'request_id'
            )
        ) {
            $payload['request_id'] =
                $request->attributes->get(
                    'request_id'
                );
        }

        if (
            Schema::hasColumn(
                'admin_activity_logs',
                'metadata'
            )
        ) {
            $payload['metadata'] =
                json_encode([
                    'identity' => $request->ip(),

                    'email' => $email,

                    'guard' => $event->guard,
                ]);
        }

        if (
            Schema::hasColumn(
                'admin_activity_logs',
                'created_at'
            )
        ) {
            $payload['created_at'] =
                now();
        }

        if (
            Schema::hasColumn(
                'admin_activity_logs',
                'updated_at'
            )
        ) {
            $payload['updated_at'] =
                now();
        }

        DB::table(
            'admin_activity_logs'
        )->insert(
            $payload
        );
    }

    public function subscribe(
        Dispatcher $events
    ): void {
        $events->listen(
            Failed::class,
            [
                self::class,
                'handleFailedLogin',
            ]
        );
    }
}
