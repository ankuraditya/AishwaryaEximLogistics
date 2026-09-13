<?php

namespace Tests\Feature\Api;

use App\Enums\AdminRole;
use App\Models\Admin;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(
            RolePermissionSeeder::class
        );
    }

    public function test_admin_without_dashboard_permission_is_forbidden(): void
    {
        $admin =
            Admin::factory()
                ->create();

        Sanctum::actingAs(
            $admin
        );

        $this
            ->getJson(
                '/api/v1/admin/dashboard'
            )
            ->assertStatus(403);
    }

    public function test_viewer_can_access_dashboard(): void
    {
        $admin =
            Admin::factory()
                ->create();

        $admin->assignRole(
            AdminRole::VIEWER->value
        );

        Sanctum::actingAs(
            $admin
        );

        $this
            ->getJson(
                '/api/v1/admin/dashboard'
            )
            ->assertOk();
    }

    public function test_super_admin_receives_all_permissions(): void
    {
        $admin =
            Admin::factory()
                ->create();

        $admin->assignRole(
            AdminRole::SUPER_ADMIN->value
        );

        $this->assertTrue(
            $admin->can(
                'products.delete'
            )
        );

        $this->assertTrue(
            $admin->can(
                'activity.view'
            )
        );
    }
}
