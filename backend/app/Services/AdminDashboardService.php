<?php

namespace App\Services;

use App\Enums\CmsPermission;
use App\Models\Admin;
use App\Models\AdminActivityLog;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AdminDashboardService
{
    public function build(
        Admin $admin
    ): array {
        return [
            'counts' => [
                'administrators' => [
                    'total' => Admin::count(),

                    'active' => Admin::where(
                        'is_active',
                        true
                    )->count(),

                    'inactive' => Admin::where(
                        'is_active',
                        false
                    )->count(),
                ],

                'categories' => $this->countTable(
                    'categories'
                ),

                'products' => $this->countTable(
                    'products'
                ),

                'gallery_items' => $this->countTable(
                    'gallery_items'
                ),

                'blogs' => $this->countTable(
                    'blogs'
                ),

                'enquiries' => $this->countTable('enquiries'),

                'new_enquiries' => Schema::hasTable('enquiries')
                    ? DB::table('enquiries')->where('status', 'new')->count()
                    : null,

                'media' => $this->countTable(
                    'media'
                ),
            ],

            'module_readiness' => [
                'catalogue' => [
                    'ready' => Schema::hasTable(
                        'products'
                    ),

                    'allowed' => $admin->can(
                        CmsPermission::PRODUCTS_VIEW->value
                    ),
                ],

                'gallery' => [
                    'ready' => Schema::hasTable(
                        'gallery_items'
                    ),

                    'allowed' => $admin->can(
                        CmsPermission::GALLERY_VIEW->value
                    ),
                ],

                'blogs' => [
                    'ready' => Schema::hasTable(
                        'blogs'
                    ),

                    'allowed' => $admin->can(
                        CmsPermission::BLOGS_VIEW->value
                    ),
                ],

                'leads' => [
                    'ready' => Schema::hasTable('enquiries'),

                    'allowed' => $admin->can(
                        CmsPermission::LEADS_VIEW->value
                    ),
                ],

                'settings' => [
                    'ready' => Schema::hasTable(
                        'settings'
                    ),

                    'allowed' => $admin->can(
                        CmsPermission::SETTINGS_VIEW->value
                    ),
                ],
            ],

            'recent_activity' => $this->recentActivity(
                $admin
            ),

            'generated_at' => now()
                ->toIso8601String(),
        ];
    }

    private function countTable(
        string $table
    ): ?int {
        if (
            ! Schema::hasTable(
                $table
            )
        ) {
            return null;
        }

        return DB::table(
            $table
        )->count();
    }

    private function recentActivity(
        Admin $admin
    ): array {
        $query =
            AdminActivityLog::query()
                ->with(
                    'admin:id,name'
                )
                ->latest(
                    'created_at'
                );

        /*
         * Admins with activity.view
         * can see system activity.
         *
         * Others only see themselves.
         */
        if (
            ! $admin->can(
                CmsPermission::ACTIVITY_VIEW->value
            )
        ) {
            $query->where(
                'admin_id',
                $admin->id
            );
        }

        return $query
            ->limit(8)
            ->get()
            ->map(
                fn (
                    AdminActivityLog $log
                ) => [
                    'id' => $log->id,

                    'category' => $log->category,

                    'action' => $log->action,

                    'description' => $log->description,

                    'admin' => $log->admin
                            ? [
                                'id' => $log
                                    ->admin
                                    ->id,

                                'name' => $log
                                    ->admin
                                    ->name,
                            ]
                            : null,

                    'created_at' => $log
                        ->created_at
                        ?->toIso8601String(),
                ]
            )
            ->values()
            ->all();
    }
}
