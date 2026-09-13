<?php

namespace Database\Seeders;

use App\Models\Setting;
use App\Support\SettingValueCaster;
use App\Support\WebsiteSettingsRegistry;
use Illuminate\Database\Seeder;

class WebsiteSettingsSeeder extends Seeder
{
    public function run(): void
    {
        foreach (
            WebsiteSettingsRegistry::allFields() as $field
        ) {
            Setting::firstOrCreate(
                [
                    'key' => $field['key'],
                ],
                [
                    'group' => $field['group'],

                    'type' => $field['type'],

                    'value' => SettingValueCaster::encode(
                        $field['default'],
                        $field['type']
                    ),

                    'is_public' => $field['public'],

                    'sort_order' => $field[
                            'sort_order'
                        ],
                ]
            );
        }
    }
}
