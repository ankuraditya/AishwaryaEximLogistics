<?php

namespace App\Support;

use App\Enums\SettingType;
use App\Enums\WebsiteSettingGroup;

final class WebsiteSettingsRegistry
{
    public static function groups(): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Company
            |--------------------------------------------------------------------------
            */

            WebsiteSettingGroup::COMPANY->value => [
                'label' => 'Company Identity',

                'description' => 'Core public company information.',

                'fields' => [

                    'name' => [
                        'key' => 'company.name',

                        'label' => 'Company Name',

                        'type' => SettingType::STRING->value,

                        'default' => 'Aishwarya Exim & Logistics',

                        'public' => true,

                        'sort_order' => 10,

                        'rules' => [
                            'required',
                            'string',
                            'max:150',
                        ],
                    ],

                    'tagline' => [
                        'key' => 'company.tagline',

                        'label' => 'Company Tagline',

                        'type' => SettingType::STRING->value,

                        'default' => 'Connecting Bihar, India to the World',

                        'public' => true,

                        'sort_order' => 20,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:255',
                        ],
                    ],

                    'description' => [
                        'key' => 'company.description',

                        'label' => 'Company Description',

                        'type' => SettingType::TEXT->value,

                        'default' => 'Aishwarya Exim & Logistics connects quality Indian products with global markets through a diversified portfolio of handicrafts, biodegradable food packaging, leather goods, garments and export-focused business solutions.',

                        'public' => true,

                        'sort_order' => 30,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:2000',
                        ],
                    ],

                    'location' => [
                        'key' => 'company.location',

                        'label' => 'Location',

                        'type' => SettingType::STRING->value,

                        'default' => 'Bihar, India',

                        'public' => true,

                        'sort_order' => 40,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:255',
                        ],
                    ],
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | Contact
            |--------------------------------------------------------------------------
            */

            WebsiteSettingGroup::CONTACT->value => [
                'label' => 'Contact Information',

                'description' => 'Public company contact information.',

                'fields' => [

                    'email' => [
                        'key' => 'contact.email',

                        'label' => 'Public Email',

                        'type' => SettingType::EMAIL->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 10,

                        'rules' => [
                            'nullable',
                            'email',
                            'max:255',
                        ],
                    ],

                    'phone' => [
                        'key' => 'contact.phone',

                        'label' => 'Phone Number',

                        'type' => SettingType::PHONE->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 20,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:40',
                        ],
                    ],

                    'whatsapp' => [
                        'key' => 'contact.whatsapp',

                        'label' => 'WhatsApp Number',

                        'type' => SettingType::PHONE->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 30,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:40',
                        ],
                    ],

                    'address' => [
                        'key' => 'contact.address',

                        'label' => 'Full Address',

                        'type' => SettingType::TEXT->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 40,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:1500',
                        ],
                    ],

                    'map_embed_url' => [
                        'key' => 'contact.map_embed_url',

                        'label' => 'Map Embed URL',

                        'type' => SettingType::URL->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 50,

                        'rules' => [
                            'nullable',
                            'url',
                            'max:2000',
                        ],
                    ],
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | Branding
            |--------------------------------------------------------------------------
            */

            WebsiteSettingGroup::BRANDING->value => [
                'label' => 'Branding',

                'description' => 'Logos, favicon and brand colours.',

                'fields' => [

                    'logo' => [
                        'key' => 'branding.logo_media_id',

                        'label' => 'Primary Logo',

                        'type' => SettingType::MEDIA->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 10,

                        'rules' => [
                            'nullable',
                        ],
                    ],

                    'logo_white' => [
                        'key' => 'branding.logo_white_media_id',

                        'label' => 'White Logo',

                        'type' => SettingType::MEDIA->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 20,

                        'rules' => [
                            'nullable',
                        ],
                    ],

                    'favicon' => [
                        'key' => 'branding.favicon_media_id',

                        'label' => 'Favicon',

                        'type' => SettingType::MEDIA->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 30,

                        'rules' => [
                            'nullable',
                        ],
                    ],

                    'primary_color' => [
                        'key' => 'branding.primary_color',

                        'label' => 'Primary Colour',

                        'type' => SettingType::COLOR->value,

                        'default' => '#022963',

                        'public' => true,

                        'sort_order' => 40,

                        'rules' => [
                            'required',
                            'regex:/^#[0-9A-Fa-f]{6}$/',
                        ],
                    ],

                    'secondary_color' => [
                        'key' => 'branding.secondary_color',

                        'label' => 'Secondary Colour',

                        'type' => SettingType::COLOR->value,

                        'default' => '#5C8D3A',

                        'public' => true,

                        'sort_order' => 50,

                        'rules' => [
                            'required',
                            'regex:/^#[0-9A-Fa-f]{6}$/',
                        ],
                    ],
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | Social
            |--------------------------------------------------------------------------
            */

            WebsiteSettingGroup::SOCIAL->value => [
                'label' => 'Social Media',

                'description' => 'Public social-network links.',

                'fields' => [

                    'facebook' => [
                        'key' => 'social.facebook',

                        'label' => 'Facebook URL',

                        'type' => SettingType::URL->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 10,

                        'rules' => [
                            'nullable',
                            'url',
                            'max:1000',
                        ],
                    ],

                    'instagram' => [
                        'key' => 'social.instagram',

                        'label' => 'Instagram URL',

                        'type' => SettingType::URL->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 20,

                        'rules' => [
                            'nullable',
                            'url',
                            'max:1000',
                        ],
                    ],

                    'linkedin' => [
                        'key' => 'social.linkedin',

                        'label' => 'LinkedIn URL',

                        'type' => SettingType::URL->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 30,

                        'rules' => [
                            'nullable',
                            'url',
                            'max:1000',
                        ],
                    ],

                    'youtube' => [
                        'key' => 'social.youtube',

                        'label' => 'YouTube URL',

                        'type' => SettingType::URL->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 40,

                        'rules' => [
                            'nullable',
                            'url',
                            'max:1000',
                        ],
                    ],
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | Footer
            |--------------------------------------------------------------------------
            */

            WebsiteSettingGroup::FOOTER->value => [
                'label' => 'Footer',

                'description' => 'Footer-specific content.',

                'fields' => [

                    'description' => [
                        'key' => 'footer.description',

                        'label' => 'Footer Description',

                        'type' => SettingType::TEXT->value,

                        'default' => 'Connecting quality Indian products with global business opportunities.',

                        'public' => true,

                        'sort_order' => 10,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:1000',
                        ],
                    ],

                    'copyright_name' => [
                        'key' => 'footer.copyright_name',

                        'label' => 'Copyright Name',

                        'type' => SettingType::STRING->value,

                        'default' => 'Aishwarya Exim & Logistics',

                        'public' => true,

                        'sort_order' => 20,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:200',
                        ],
                    ],
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | SEO
            |--------------------------------------------------------------------------
            */

            WebsiteSettingGroup::SEO->value => [
                'label' => 'SEO Defaults',

                'description' => 'Fallback metadata used when a page has no specific SEO values.',

                'fields' => [

                    'default_title' => [
                        'key' => 'seo.default_title',

                        'label' => 'Default SEO Title',

                        'type' => SettingType::STRING->value,

                        'default' => 'Aishwarya Exim & Logistics | Indian Products & B2B Sourcing',

                        'public' => true,

                        'sort_order' => 10,

                        'rules' => [
                            'required',
                            'string',
                            'max:255',
                        ],
                    ],

                    'default_description' => [
                        'key' => 'seo.default_description',

                        'label' => 'Default Meta Description',

                        'type' => SettingType::TEXT->value,

                        'default' => 'Explore Indian handicrafts, biodegradable food packaging, leather goods and garments for B2B sourcing and export enquiries.',

                        'public' => true,

                        'sort_order' => 20,

                        'rules' => [
                            'required',
                            'string',
                            'max:500',
                        ],
                    ],

                    'og_image' => [
                        'key' => 'seo.og_image_media_id',

                        'label' => 'Default Social Share Image',

                        'type' => SettingType::MEDIA->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 30,

                        'rules' => [
                            'nullable',
                        ],
                    ],

                    'robots_default' => [
                        'key' => 'seo.robots_default',

                        'label' => 'Default Robots Directive',

                        'type' => SettingType::STRING->value,

                        'default' => 'index,follow',

                        'public' => true,

                        'sort_order' => 40,

                        'rules' => [
                            'required',
                            'regex:/^(index|noindex),(follow|nofollow)$/',
                        ],
                    ],
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | Analytics
            |--------------------------------------------------------------------------
            */

            WebsiteSettingGroup::ANALYTICS->value => [
                'label' => 'Analytics',

                'description' => 'Public analytics integration identifiers. Never store secret credentials here.',

                'fields' => [

                    'google_analytics_id' => [
                        'key' => 'analytics.google_analytics_id',

                        'label' => 'Google Analytics Measurement ID',

                        'type' => SettingType::STRING->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 10,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:50',
                        ],
                    ],

                    'google_tag_manager_id' => [
                        'key' => 'analytics.google_tag_manager_id',

                        'label' => 'Google Tag Manager Container ID',

                        'type' => SettingType::STRING->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 20,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:50',
                        ],
                    ],

                    'meta_pixel_id' => [
                        'key' => 'analytics.meta_pixel_id',

                        'label' => 'Meta Pixel ID',

                        'type' => SettingType::STRING->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 30,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:100',
                        ],
                    ],
                ],
            ],

            /*
            |--------------------------------------------------------------------------
            | Custom Scripts
            |--------------------------------------------------------------------------
            */

            WebsiteSettingGroup::SCRIPTS->value => [
                'label' => 'Custom Scripts',

                'description' => 'Advanced executable website code. Super Admin access only.',

                'fields' => [

                    'enabled' => [
                        'key' => 'scripts.enabled',

                        'label' => 'Enable Custom Scripts',

                        'type' => SettingType::BOOLEAN->value,

                        'default' => false,

                        'public' => true,

                        'sort_order' => 10,

                        'rules' => [
                            'required',
                            'boolean',
                        ],
                    ],

                    'head_html' => [
                        'key' => 'scripts.head_html',

                        'label' => 'Head Code',

                        'type' => SettingType::CODE->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 20,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:100000',
                        ],
                    ],

                    'body_end_html' => [
                        'key' => 'scripts.body_end_html',

                        'label' => 'Body End Code',

                        'type' => SettingType::CODE->value,

                        'default' => null,

                        'public' => true,

                        'sort_order' => 30,

                        'rules' => [
                            'nullable',
                            'string',
                            'max:100000',
                        ],
                    ],
                ],
            ],
        ];
    }

    public static function group(
        string $group
    ): ?array {
        return self::groups()[
            $group
        ] ?? null;
    }

    public static function fields(
        string $group
    ): array {
        return self::group(
            $group
        )['fields'] ?? [];
    }

    public static function field(
        string $group,
        string $name
    ): ?array {
        return self::fields(
            $group
        )[$name] ?? null;
    }

    public static function allFields(): array
    {
        $fields = [];

        foreach (
            self::groups() as $group => $definition
        ) {
            foreach (
                $definition['fields'] as $name => $field
            ) {
                $fields[] = [
                    'group' => $group,

                    'name' => $name,

                    ...$field,
                ];
            }
        }

        return $fields;
    }
}
