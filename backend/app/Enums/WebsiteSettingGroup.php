<?php

namespace App\Enums;

enum WebsiteSettingGroup: string
{
    case COMPANY =
        'company';

    case CONTACT =
        'contact';

    case BRANDING =
        'branding';

    case SOCIAL =
        'social';

    case FOOTER =
        'footer';

    case SEO =
        'seo';

    case ANALYTICS =
        'analytics';

    case SCRIPTS =
        'scripts';

    public static function values(): array
    {
        return array_map(
            fn (self $group) => $group->value,
            self::cases()
        );
    }

    public static function routePattern(): string
    {
        return implode(
            '|',
            self::values()
        );
    }
}
