<?php

namespace Database\Seeders;

use App\Enums\AdminRole;
use App\Enums\CmsPermission;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Guard
        |--------------------------------------------------------------------------
        */

        $guardName = 'admin';

        /*
        |--------------------------------------------------------------------------
        | Clear Permission Cache
        |--------------------------------------------------------------------------
        */

        app(
            PermissionRegistrar::class
        )->forgetCachedPermissions();

        /*
        |--------------------------------------------------------------------------
        | Permissions
        |--------------------------------------------------------------------------
        */

        foreach (
            CmsPermission::cases() as $permission
        ) {
            Permission::firstOrCreate([
                'name' => $permission->value,

                'guard_name' => $guardName,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Roles
        |--------------------------------------------------------------------------
        */

        foreach (
            AdminRole::cases() as $role
        ) {
            Role::firstOrCreate([
                'name' => $role->value,

                'guard_name' => $guardName,
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Super Admin
        |--------------------------------------------------------------------------
        */

        $superAdmin =
            Role::findByName(
                AdminRole::SUPER_ADMIN->value,
                $guardName
            );

        $superAdmin->syncPermissions(
            Permission::where(
                'guard_name',
                $guardName
            )->get()
        );

        /*
        |--------------------------------------------------------------------------
        | Administrator
        |--------------------------------------------------------------------------
        */

        $administrator =
            Role::findByName(
                AdminRole::ADMINISTRATOR->value,
                $guardName
            );

        $administratorPermissions =
            collect(
                CmsPermission::cases()
            )
                ->map(
                    fn (
                        CmsPermission $permission
                    ) => $permission->value
                )
                ->reject(
                    fn (
                        string $permission
                    ) => str_starts_with(
                        $permission,
                        'admins.'
                    )
                        ||
                        $permission ===
                            CmsPermission::SETTINGS_SCRIPTS_UPDATE->value
                )
                ->values()
                ->all();

        $administrator->syncPermissions(
            $administratorPermissions
        );

        /*
        |--------------------------------------------------------------------------
        | Catalogue Manager
        |--------------------------------------------------------------------------
        */

        Role::findByName(
            AdminRole::CATALOGUE_MANAGER->value,
            $guardName
        )->syncPermissions([
            CmsPermission::DASHBOARD_VIEW->value,

            CmsPermission::CATEGORIES_VIEW->value,
            CmsPermission::CATEGORIES_CREATE->value,
            CmsPermission::CATEGORIES_UPDATE->value,
            CmsPermission::CATEGORIES_DELETE->value,

            CmsPermission::PRODUCTS_VIEW->value,
            CmsPermission::PRODUCTS_CREATE->value,
            CmsPermission::PRODUCTS_UPDATE->value,
            CmsPermission::PRODUCTS_DELETE->value,

            CmsPermission::GALLERY_VIEW->value,
            CmsPermission::GALLERY_CREATE->value,
            CmsPermission::GALLERY_UPDATE->value,
            CmsPermission::GALLERY_DELETE->value,

            CmsPermission::MEDIA_VIEW->value,
            CmsPermission::MEDIA_UPLOAD->value,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Content Manager
        |--------------------------------------------------------------------------
        */

        Role::findByName(
            AdminRole::CONTENT_MANAGER->value,
            $guardName
        )->syncPermissions([
            CmsPermission::DASHBOARD_VIEW->value,

            CmsPermission::BLOGS_VIEW->value,
            CmsPermission::BLOGS_CREATE->value,
            CmsPermission::BLOGS_UPDATE->value,
            CmsPermission::BLOGS_DELETE->value,
            CmsPermission::BLOGS_PUBLISH->value,

            CmsPermission::PAGES_VIEW->value,
            CmsPermission::PAGES_UPDATE->value,

            CmsPermission::MEDIA_VIEW->value,
            CmsPermission::MEDIA_UPLOAD->value,

            CmsPermission::SEO_VIEW->value,
            CmsPermission::SEO_UPDATE->value,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Lead Manager
        |--------------------------------------------------------------------------
        */

        Role::findByName(
            AdminRole::LEAD_MANAGER->value,
            $guardName
        )->syncPermissions([
            CmsPermission::DASHBOARD_VIEW->value,

            CmsPermission::LEADS_VIEW->value,
            CmsPermission::LEADS_UPDATE->value,
            CmsPermission::LEADS_EXPORT->value,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Viewer
        |--------------------------------------------------------------------------
        */

        Role::findByName(
            AdminRole::VIEWER->value,
            $guardName
        )->syncPermissions([
            CmsPermission::DASHBOARD_VIEW->value,

            CmsPermission::SETTINGS_VIEW->value,

            CmsPermission::CATEGORIES_VIEW->value,

            CmsPermission::PRODUCTS_VIEW->value,

            CmsPermission::GALLERY_VIEW->value,

            CmsPermission::BLOGS_VIEW->value,

            CmsPermission::PAGES_VIEW->value,

            CmsPermission::LEADS_VIEW->value,

            CmsPermission::MEDIA_VIEW->value,

            CmsPermission::SEO_VIEW->value,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Clear Permission Cache Again
        |--------------------------------------------------------------------------
        */

        app(
            PermissionRegistrar::class
        )->forgetCachedPermissions();
    }
}
