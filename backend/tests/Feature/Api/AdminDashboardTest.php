<?php

namespace Tests\Feature\Api;

use App\Enums\AdminRole;
use App\Models\Admin;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminDashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(
            RolePermissionSeeder::class
        );
    }

    public function test_dashboard_returns_current_cms_foundation_statistics(): void
    {
        $admin =
            Admin::factory()
                ->create();

        $admin->assignRole(
            AdminRole::SUPER_ADMIN->value
        );

        Sanctum::actingAs(
            $admin
        );

        $response =
            $this->getJson(
                '/api/v1/admin/dashboard'
            );

        $response
            ->assertOk()
            ->assertJsonPath(
                'success',
                true
            )
            ->assertJsonStructure([
                'data' => [
                    'counts',
                    'module_readiness',
                    'recent_activity',
                    'generated_at',
                ],
            ]);
    }
}
