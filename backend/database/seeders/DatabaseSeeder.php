<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            WebsiteSettingsSeeder::class,
            ContentStructureSeeder::class,
            FrontendContentSeeder::class,
        ]);
    }
}
