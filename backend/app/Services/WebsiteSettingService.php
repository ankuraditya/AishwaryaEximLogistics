<?php

namespace App\Services;

use App\Enums\SettingType;
use App\Models\Admin;
use App\Models\Media;
use App\Models\Setting;
use App\Support\SettingValueCaster;
use App\Support\WebsiteSettingsRegistry;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class WebsiteSettingService
{
    public const PUBLIC_CACHE_KEY =
        'website.settings.public.v1';

    public function __construct(
        private readonly AdminActivityLogger $activityLogger
    ) {}

    public function publicSettings(): array
    {
        return Cache::remember(
            self::PUBLIC_CACHE_KEY,
            now()->addHour(),
            fn () => $this->buildPublicSettings()
        );
    }

    public function adminSettings(
        ?string $onlyGroup = null
    ): array {
        $definitions =
            WebsiteSettingsRegistry::groups();

        if ($onlyGroup !== null) {
            $definition =
                WebsiteSettingsRegistry::group(
                    $onlyGroup
                );

            if (! $definition) {
                return [];
            }

            $definitions = [
                $onlyGroup => $definition,
            ];
        }

        $settings =
            Setting::query()
                ->whereIn(
                    'group',
                    array_keys(
                        $definitions
                    )
                )
                ->get()
                ->keyBy('key');

        $media =
            $this->loadReferencedMedia(
                $settings
            );

        $groups = [];

        foreach (
            $definitions as $group => $groupDefinition
        ) {
            $fields = [];

            foreach (
                $groupDefinition['fields'] as $name => $fieldDefinition
            ) {
                $setting =
                    $settings->get(
                        $fieldDefinition[
                            'key'
                        ]
                    );

                $rawValue =
                    $setting
                        ? SettingValueCaster::decode(
                            $setting->value,
                            $setting->type
                        )
                        : $fieldDefinition[
                            'default'
                        ];

                $field = [
                    'name' => $name,

                    'key' => $fieldDefinition[
                            'key'
                        ],

                    'label' => $fieldDefinition[
                            'label'
                        ],

                    'type' => $fieldDefinition[
                            'type'
                        ],

                    'is_public' => $fieldDefinition[
                            'public'
                        ],

                    'value' => $rawValue,
                ];

                if (
                    $fieldDefinition[
                        'type'
                    ] ===
                    SettingType::MEDIA->value
                ) {
                    $field['media'] =
                        $this->mediaArray(
                            $rawValue
                                ? $media->get(
                                    (int)
                                    $rawValue
                                )
                                : null
                        );
                }

                $fields[] =
                    $field;
            }

            $groups[] = [
                'key' => $group,

                'label' => $groupDefinition[
                        'label'
                    ],

                'description' => $groupDefinition[
                        'description'
                    ],

                'fields' => $fields,
            ];
        }

        return [
            'groups' => $groups,
        ];
    }

    public function updateGroup(
        string $group,
        array $values,
        Admin $admin
    ): array {
        $fields =
            WebsiteSettingsRegistry::fields(
                $group
            );

        $changedKeys = [];

        DB::transaction(
            function () use (
                $group,
                $values,
                $fields,
                &$changedKeys
            ): void {
                foreach (
                    $values as $name => $value
                ) {
                    $definition =
                        $fields[
                            $name
                        ];

                    $encoded =
                        SettingValueCaster::encode(
                            $value,
                            $definition[
                                'type'
                            ]
                        );

                    $setting =
                        Setting::firstOrNew([
                            'key' => $definition[
                                    'key'
                                ],
                        ]);

                    $setting->fill([
                        'group' => $group,

                        'type' => $definition[
                                'type'
                            ],

                        'value' => $encoded,

                        'is_public' => $definition[
                                'public'
                            ],

                        'sort_order' => $definition[
                                'sort_order'
                            ],
                    ]);

                    if (
                        $setting->isDirty()
                    ) {
                        $changedKeys[] =
                            $definition[
                                'key'
                            ];
                    }

                    $setting->save();
                }
            }
        );

        Cache::forget(
            self::PUBLIC_CACHE_KEY
        );

        if (
            count(
                $changedKeys
            ) > 0
        ) {
            $this
                ->activityLogger
                ->log(
                    action: 'settings.updated',

                    category: 'settings',

                    description: sprintf(
                        'Website settings group "%s" was updated.',
                        $group
                    ),

                    admin: $admin,

                    metadata: [
                        'group' => $group,

                        'changed_keys' => $changedKeys,
                    ]
                );
        }

        return $this->adminSettings(
            $group
        );
    }

    public function clearPublicCache(): void
    {
        Cache::forget(
            self::PUBLIC_CACHE_KEY
        );
    }

    private function buildPublicSettings(): array
    {
        $settings =
            Setting::query()
                ->public()
                ->get()
                ->keyBy(
                    'key'
                );

        $media =
            $this->loadReferencedMedia(
                $settings
            );

        $result = [];

        foreach (
            WebsiteSettingsRegistry::groups() as $group => $definition
        ) {
            $groupValues = [];

            foreach (
                $definition['fields'] as $name => $field
            ) {
                if (
                    ! $field[
                        'public'
                    ]
                ) {
                    continue;
                }

                $setting =
                    $settings->get(
                        $field['key']
                    );

                $value =
                    $setting
                        ? SettingValueCaster::decode(
                            $setting->value,
                            $setting->type
                        )
                        : $field[
                            'default'
                        ];

                if (
                    $field['type']
                    ===
                    SettingType::MEDIA->value
                ) {
                    $groupValues[
                        $name
                    ] =
                        $this->mediaArray(
                            $value
                                ? $media->get(
                                    (int)
                                    $value
                                )
                                : null
                        );
                } else {
                    $groupValues[
                        $name
                    ] =
                        $value;
                }
            }

            /*
             * If custom scripts are
             * disabled, never deliver
             * their code to the frontend.
             */
            if (
                $group ===
                    'scripts'
                &&
                ! (
                    $groupValues[
                        'enabled'
                    ] ?? false
                )
            ) {
                $groupValues[
                    'head_html'
                ] = null;

                $groupValues[
                    'body_end_html'
                ] = null;
            }

            $result[
                $group
            ] =
                $groupValues;
        }

        return $result;
    }

    private function loadReferencedMedia(
        Collection $settings
    ): Collection {
        $ids =
            $settings
                ->filter(
                    fn (Setting $setting) => $setting->type ===
                        SettingType::MEDIA->value
                        &&
                        filled(
                            $setting->value
                        )
                )
                ->pluck('value')
                ->map(
                    fn ($id) => (int) $id
                )
                ->filter()
                ->unique()
                ->values();

        if (
            $ids->isEmpty()
        ) {
            return collect();
        }

        return Media::query()
            ->whereIn(
                'id',
                $ids
            )
            ->where(
                'disk',
                'media'
            )
            ->get()
            ->keyBy('id');
    }

    private function mediaArray(
        ?Media $media
    ): ?array {
        if (! $media) {
            return null;
        }

        return [
            'id' => $media->id,

            'title' => $media->title,

            'alt_text' => $media->alt_text,

            'url' => Storage::disk(
                $media->disk
            )->url(
                $media->path
            ),

            'width' => $media->width,

            'height' => $media->height,

            'mime_type' => $media->mime_type,
        ];
    }
}
