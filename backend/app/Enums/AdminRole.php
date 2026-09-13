<?php

namespace App\Enums;

enum AdminRole: string
{
    case SUPER_ADMIN = 'super-admin';

    case ADMINISTRATOR = 'administrator';

    case CATALOGUE_MANAGER = 'catalogue-manager';

    case CONTENT_MANAGER = 'content-manager';

    case LEAD_MANAGER = 'lead-manager';

    case VIEWER = 'viewer';
}
