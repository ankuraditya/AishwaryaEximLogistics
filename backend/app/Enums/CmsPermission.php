<?php

namespace App\Enums;

enum CmsPermission: string
{
    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    case DASHBOARD_VIEW =
        'dashboard.view';

    /*
    |--------------------------------------------------------------------------
    | Administrators
    |--------------------------------------------------------------------------
    */

    case ADMINS_VIEW =
        'admins.view';

    case ADMINS_CREATE =
        'admins.create';

    case ADMINS_UPDATE =
        'admins.update';

    case ADMINS_DEACTIVATE =
        'admins.deactivate';

    case ADMINS_ASSIGN_ROLES =
        'admins.roles.assign';

    /*
    |--------------------------------------------------------------------------
    | Website Settings
    |--------------------------------------------------------------------------
    */

    case SETTINGS_VIEW =
        'settings.view';

    case SETTINGS_UPDATE =
        'settings.update';

    case SETTINGS_SCRIPTS_UPDATE =
        'settings.scripts.update';
    /*
    |--------------------------------------------------------------------------
    | Categories
    |--------------------------------------------------------------------------
    */

    case CATEGORIES_VIEW =
        'categories.view';

    case CATEGORIES_CREATE =
        'categories.create';

    case CATEGORIES_UPDATE =
        'categories.update';

    case CATEGORIES_DELETE =
        'categories.delete';

    /*
    |--------------------------------------------------------------------------
    | Products
    |--------------------------------------------------------------------------
    */

    case PRODUCTS_VIEW =
        'products.view';

    case PRODUCTS_CREATE =
        'products.create';

    case PRODUCTS_UPDATE =
        'products.update';

    case PRODUCTS_DELETE =
        'products.delete';

    /*
    |--------------------------------------------------------------------------
    | Gallery
    |--------------------------------------------------------------------------
    */

    case GALLERY_VIEW =
        'gallery.view';

    case GALLERY_CREATE =
        'gallery.create';

    case GALLERY_UPDATE =
        'gallery.update';

    case GALLERY_DELETE =
        'gallery.delete';

    /*
    |--------------------------------------------------------------------------
    | Blogs
    |--------------------------------------------------------------------------
    */

    case BLOGS_VIEW =
        'blogs.view';

    case BLOGS_CREATE =
        'blogs.create';

    case BLOGS_UPDATE =
        'blogs.update';

    case BLOGS_DELETE =
        'blogs.delete';

    case BLOGS_PUBLISH =
        'blogs.publish';

    /*
    |--------------------------------------------------------------------------
    | CMS Pages
    |--------------------------------------------------------------------------
    */

    case PAGES_VIEW =
        'pages.view';

    case PAGES_UPDATE =
        'pages.update';

    /*
    |--------------------------------------------------------------------------
    | Enquiries / Leads
    |--------------------------------------------------------------------------
    */

    case LEADS_VIEW =
        'leads.view';

    case LEADS_UPDATE =
        'leads.update';

    case LEADS_EXPORT =
        'leads.export';

    /*
    |--------------------------------------------------------------------------
    | Media Library
    |--------------------------------------------------------------------------
    */

    case MEDIA_VIEW =
        'media.view';

    case MEDIA_UPLOAD =
        'media.upload';

    case MEDIA_DELETE =
        'media.delete';

    /*
    |--------------------------------------------------------------------------
    | SEO
    |--------------------------------------------------------------------------
    */

    case SEO_VIEW =
        'seo.view';

    case SEO_UPDATE =
        'seo.update';

    /*
    |--------------------------------------------------------------------------
    | Audit / Security
    |--------------------------------------------------------------------------
    */

    case ACTIVITY_VIEW =
        'activity.view';
}
