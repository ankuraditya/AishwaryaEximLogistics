<?php

namespace Tests\Feature\Api;

use App\Enums\AdminRole;
use App\Models\Admin;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class SettingsMediaTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(
            RolePermissionSeeder::class
        );

        Storage::fake(
            'media'
        );
    }

    public function test_authorised_admin_can_upload_settings_media(): void
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

        $file =
            UploadedFile::fake()
                ->image(
                    'logo.png',
                    1200,
                    300
                );

        $response =
            $this->post(
                '/api/v1/admin/settings/media',
                [
                    'purpose' => 'logo',

                    'file' => $file,

                    'title' => 'Primary Logo',
                ],
                [
                    'Accept' => 'application/json',
                ]
            );

        $response
            ->assertCreated()
            ->assertJsonPath(
                'success',
                true
            );

        $this->assertDatabaseCount(
            'media',
            1
        );
    }

    public function test_invalid_media_type_is_rejected(): void
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

        $file =
            UploadedFile::fake()
                ->create(
                    'payload.exe',
                    50,
                    'application/octet-stream'
                );

        $this
            ->post(
                '/api/v1/admin/settings/media',
                [
                    'purpose' => 'logo',

                    'file' => $file,
                ],
                [
                    'Accept' => 'application/json',
                ]
            )
            ->assertStatus(
                422
            );
    }
}
