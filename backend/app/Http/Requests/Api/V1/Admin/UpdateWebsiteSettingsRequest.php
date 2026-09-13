<?php

namespace App\Http\Requests\Api\V1\Admin;

use App\Enums\CmsPermission;
use App\Enums\SettingType;
use App\Support\WebsiteSettingsRegistry;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWebsiteSettingsRequest extends FormRequest
{
    public function authorize(): bool
    {
        $admin =
            $this->user();

        if (
            ! $admin
            ||
            ! $admin->can(
                CmsPermission::SETTINGS_UPDATE->value
            )
        ) {
            return false;
        }

        if (
            $this->route(
                'group'
            ) === 'scripts'
        ) {
            return $admin->can(
                CmsPermission::SETTINGS_SCRIPTS_UPDATE->value
            );
        }

        return true;
    }

    public function rules(): array
    {
        $group =
            (string)
            $this->route(
                'group'
            );

        $fields =
            WebsiteSettingsRegistry::fields(
                $group
            );

        $fieldNames =
            array_keys(
                $fields
            );

        $rules = [
            'values' => [
                'required',
                'array:'
                .implode(
                    ',',
                    $fieldNames
                ),
            ],
        ];

        foreach (
            $fields as $name => $definition
        ) {
            if (
                $definition[
                    'type'
                ] ===
                SettingType::MEDIA->value
            ) {
                $rules[
                    'values.'
                    .$name
                ] = [
                    'sometimes',
                    'nullable',
                    'integer',

                    Rule::exists(
                        'media',
                        'id'
                    )->where(
                        fn ($query) => $query->where(
                            'disk',
                            'media'
                        )
                    ),
                ];

                continue;
            }

            $rules[
                'values.'
                .$name
            ] = [
                'sometimes',

                ...$definition[
                    'rules'
                ],
            ];
        }

        return $rules;
    }
}
