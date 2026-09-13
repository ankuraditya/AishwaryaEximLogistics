<?php

namespace Tests\Feature\Api;

use App\Models\Admin;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AdminProfileTest extends TestCase
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
     * Simulate a request coming from
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

    public function test_admin_can_update_profile(): void
    {
        $admin =
            Admin::factory()
                ->create();

        $this->actingAs(
            $admin,
            'admin'
        );

        $response =
            $this
                ->asAdminFrontend()
                ->patchJson(
                    '/api/v1/admin/profile',
                    [
                        'name' => 'Updated Admin',

                        'email' => 'updated@example.com',
                    ]
                );

        $response
            ->assertOk()
            ->assertJsonPath(
                'data.name',
                'Updated Admin'
            );

        $this->assertDatabaseHas(
            'admins',
            [
                'id' => $admin->id,

                'email' => 'updated@example.com',
            ]
        );
    }

    public function test_incorrect_current_password_is_rejected(): void
    {
        $admin =
            Admin::factory()
                ->create([
                    'password' => 'OldPassword!123',
                ]);

        $this->actingAs(
            $admin,
            'admin'
        );

        $this
            ->asAdminFrontend()
            ->putJson(
                '/api/v1/admin/profile/password',
                [
                    'current_password' => 'WrongPassword!123',

                    'password' => 'NewPassword!123',

                    'password_confirmation' => 'NewPassword!123',
                ]
            )
            ->assertStatus(422);
    }

    public function test_admin_can_change_password(): void
    {
        $admin =
            Admin::factory()
                ->create([
                    'password' => 'OldPassword!123',
                ]);

        $this->actingAs(
            $admin,
            'admin'
        );

        $this
            ->asAdminFrontend()
            ->putJson(
                '/api/v1/admin/profile/password',
                [
                    'current_password' => 'OldPassword!123',

                    'password' => 'NewPassword!456',

                    'password_confirmation' => 'NewPassword!456',
                ]
            )
            ->assertOk();

        $admin->refresh();

        $this->assertTrue(
            Hash::check(
                'NewPassword!456',
                $admin->password
            )
        );

        $this->assertNotNull(
            $admin
                ->password_changed_at
        );
    }
}
