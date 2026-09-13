<?php

namespace Tests\Feature\Api;

use App\Enums\AdminRole;
use App\Models\Admin;
use App\Models\Setting;
use Database\Seeders\RolePermissionSeeder;
use Database\Seeders\WebsiteSettingsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class WebsiteSettingsTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed([
            RolePermissionSeeder::class,
            WebsiteSettingsSeeder::class,
        ]);
    }

    public function test_public_settings_endpoint_is_available(): void
    {
        $response =
            $this->getJson(
                '/api/v1/settings'
            );

        $response
            ->assertOk()
            ->assertJsonPath(
                'success',
                true
            )
            ->assertJsonPath(
                'data.company.name',
                'Aishwarya Exim & Logistics'
            );
    }

    public function test_private_setting_is_not_exposed_publicly(): void
    {
        Setting::create([
            'key' => 'internal.example',

            'group' => 'internal',

            'type' => 'string',

            'value' => 'private-value',

            'is_public' => false,

            'sort_order' => 0,
        ]);

        $response =
            $this->getJson(
                '/api/v1/settings'
            );

        $response
            ->assertOk()
            ->assertJsonMissing([
                'private-value',
            ]);
    }

    public function test_guest_cannot_access_admin_settings(): void
    {
        $this
            ->getJson(
                '/api/v1/admin/settings'
            )
            ->assertStatus(
                401
            );
    }

    public function test_viewer_can_view_settings_but_cannot_update_them(): void
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
                '/api/v1/admin/settings'
            )
            ->assertOk()
            ->assertJsonPath('data.groups.0.key', 'company')
            ->assertJsonPath('data.groups.0.label', 'Company Identity')
            ->assertJsonPath('data.groups.0.fields.0.name', 'name')
            ->assertJsonPath(
                'data.groups.0.fields.0.value',
                'Aishwarya Exim & Logistics'
            );

        $this
            ->patchJson(
                '/api/v1/admin/settings/company',
                [
                    'values' => [
                        'name' => 'Updated Name',
                    ],
                ]
            )
            ->assertStatus(
                403
            );
    }

    public function test_super_admin_can_update_company_settings(): void
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
            $this->patchJson(
                '/api/v1/admin/settings/company',
                [
                    'values' => [
                        'name' => 'Updated Company Name',
                    ],
                ]
            );

        $response
            ->assertOk();

        $this->assertDatabaseHas(
            'settings',
            [
                'key' => 'company.name',

                'value' => 'Updated Company Name',
            ]
        );
    }

    public function test_settings_update_invalidates_public_cache(): void
    {
        Cache::put(
            'website.settings.public.v1',
            [
                'stale' => true,
            ],
            3600
        );

        $admin =
            Admin::factory()
                ->create();

        $admin->assignRole(
            AdminRole::SUPER_ADMIN->value
        );

        Sanctum::actingAs(
            $admin
        );

        $this->patchJson(
            '/api/v1/admin/settings/company',
            [
                'values' => [
                    'name' => 'Updated Company',
                ],
            ]
        )->assertOk();

        $this->assertNull(
            Cache::get(
                'website.settings.public.v1'
            )
        );
    }

    public function test_unknown_setting_field_is_rejected(): void
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

        $this
            ->patchJson(
                '/api/v1/admin/settings/company',
                [
                    'values' => [
                        'unknown_field' => 'invalid',
                    ],
                ]
            )
            ->assertStatus(
                422
            );
    }

    public function test_administrator_cannot_update_custom_scripts(): void
    {
        $admin =
            Admin::factory()
                ->create();

        $admin->assignRole(
            AdminRole::ADMINISTRATOR->value
        );

        Sanctum::actingAs(
            $admin
        );

        $this
            ->patchJson(
                '/api/v1/admin/settings/scripts',
                [
                    'values' => [
                        'enabled' => true,

                        'head_html' => '<script>console.log("test")</script>',
                    ],
                ]
            )
            ->assertStatus(
                403
            );
    }

    public function test_super_admin_can_update_custom_scripts(): void
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

        $this
            ->patchJson(
                '/api/v1/admin/settings/scripts',
                [
                    'values' => [
                        'enabled' => false,
                    ],
                ]
            )
            ->assertOk();
    }
}
