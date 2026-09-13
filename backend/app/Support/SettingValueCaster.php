<?php

namespace App\Support;

use App\Enums\SettingType;
use JsonException;

final class SettingValueCaster
{
    public static function encode(
        mixed $value,
        string $type
    ): ?string {
        if ($value === null) {
            return null;
        }

        return match ($type) {
            SettingType::BOOLEAN->value => $value
                    ? '1'
                    : '0',

            SettingType::INTEGER->value,
            SettingType::MEDIA->value => (string) (int) $value,

            SettingType::JSON->value => json_encode(
                $value,
                JSON_THROW_ON_ERROR
            ),

            default => (string) $value,
        };
    }

    /**
     * @throws JsonException
     */
    public static function decode(
        ?string $value,
        string $type
    ): mixed {
        if ($value === null) {
            return null;
        }

        return match ($type) {
            SettingType::BOOLEAN->value => $value === '1'
                ||
                strtolower(
                    $value
                ) === 'true',

            SettingType::INTEGER->value,
            SettingType::MEDIA->value => (int) $value,

            SettingType::JSON->value => json_decode(
                $value,
                true,
                flags: JSON_THROW_ON_ERROR
            ),

            default => $value,
        };
    }
}
