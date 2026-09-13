<?php

namespace App\Services;

use App\Models\Admin;
use App\Models\AdminActivityLog;
use Illuminate\Database\Eloquent\Model;

class AdminActivityLogger
{
    public function log(
        string $action,
        string $category,
        string $description,
        ?Admin $admin = null,
        ?Model $subject = null,
        array $metadata = []
    ): AdminActivityLog {
        $request =
            app()->bound(
                'request'
            )
                ? request()
                : null;

        return AdminActivityLog::create([
            'admin_id' => $admin?->id,

            'category' => $category,

            'action' => $action,

            'description' => $description,

            'subject_type' => $subject
                    ? $subject::class
                    : null,

            'subject_id' => $subject?->getKey(),

            'ip_address' => $request?->ip(),

            'user_agent' => $request
                ?->userAgent(),

            'request_id' => $request
                ?->attributes
                ->get(
                    'request_id'
                ),

            'metadata' => $metadata ?: null,

            'created_at' => now(),
        ]);
    }
}
