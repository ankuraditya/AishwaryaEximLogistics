<?php

namespace App\Enums;

enum SettingType: string
{
    case STRING = 'string';

    case TEXT = 'text';

    case EMAIL = 'email';

    case URL = 'url';

    case PHONE = 'phone';

    case BOOLEAN = 'boolean';

    case INTEGER = 'integer';

    case COLOR = 'color';

    case MEDIA = 'media';

    case JSON = 'json';

    case CODE = 'code';
}
