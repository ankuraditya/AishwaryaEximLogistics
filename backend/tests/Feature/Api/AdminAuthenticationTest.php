<?php

namespace Tests\Feature\Api;

use App\Enums\AdminRole;
use App\Models\Admin;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(
            RolePermissionSeeder::class
        );
    }

    /**
     * Simulate requests coming from
     * the first-party React admin SPA.
     */
    private function asAdminFrontend(): static
    {
        return $this->withHeaders([
            'Origin' => 'http://localhost:5174',

            'Referer' => 'http://localhost:5174/',

            'Accept' => 'application/json',
        ]);
    }

    public function test_active_admin_can_login(): void
    {
        $admin =
            Admin::factory()->create([
                'email' => 'admin@example.com',

                'password' => 'StrongPassword!123',

                'is_active' => true,
            ]);

        $admin->assignRole(
            AdminRole::SUPER_ADMIN->value
        );

        $response =
            $this
                ->asAdminFrontend()
                ->postJson(
                    '/api/v1/admin/auth/login',
                    [
                        'email' => 'ADMIN@EXAMPLE.COM',

                        'password' => 'StrongPassword!123',
                    ]
                );

        $response
            ->assertOk()
            ->assertJsonPath(
                'success',
                true
            )
            ->assertJsonPath(
                'data.email',
                'admin@example.com'
            )
            ->assertJsonPath(
                'data.is_super_admin',
                true
            );

        $this->assertAuthenticatedAs(
            $admin,
            'admin'
        );
    }

    public function test_invalid_credentials_are_rejected(): void
    {
        Admin::factory()->create([
            'email' => 'admin@example.com',

            'is_active' => true,
        ]);

        $response =
            $this
                ->asAdminFrontend()
                ->postJson(
                    '/api/v1/admin/auth/login',
                    [
                        'email' => 'admin@example.com',

                        'password' => 'WrongPassword!123',
                    ]
                );

        $response
            ->assertStatus(422)
            ->assertJsonPath(
                'success',
                false
            );

        $this->assertGuest(
            'admin'
        );
    }

    public function test_inactive_admin_cannot_login(): void
    {
        Admin::factory()
            ->inactive()
            ->create([
                'email' => 'inactive@example.com',

                'password' => 'StrongPassword!123',
            ]);

        $response =
            $this
                ->asAdminFrontend()
                ->postJson(
                    '/api/v1/admin/auth/login',
                    [
                        'email' => 'inactive@example.com',

                        'password' => 'StrongPassword!123',
                    ]
                );

        $response
            ->assertStatus(422)
            ->assertJsonPath(
                'success',
                false
            );

        $this->assertGuest(
            'admin'
        );
    }

    public function test_guest_cannot_access_me_endpoint(): void
    {
        $this
            ->asAdminFrontend()
            ->getJson(
                '/api/v1/admin/auth/me'
            )
            ->assertStatus(401);
    }

    public function test_failed_login_is_audited(): void
    {
        Admin::factory()->create([
            'email' => 'admin@example.com',

            'is_active' => true,
        ]);

        $this
            ->asAdminFrontend()
            ->postJson(
                '/api/v1/admin/auth/login',
                [
                    'email' => 'admin@example.com',

                    'password' => 'WrongPassword!123',
                ]
            )
            ->assertStatus(422);

        $this->assertDatabaseHas(
            'admin_activity_logs',
            [
                'action' => 'auth.login_failed',

                'category' => 'security',
            ]
        );
    }
}
