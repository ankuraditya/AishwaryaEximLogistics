<?php

use App\Models\Admin;

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | The backend currently authenticates CMS administrators. The dedicated
    | "admin" guard is therefore the default authentication guard, while the
    | "admins" password broker handles administrator password resets.
    |
    */

    'defaults' => [
        'guard' => env(
            'AUTH_GUARD',
            'admin'
        ),

        'passwords' => env(
            'AUTH_PASSWORD_BROKER',
            'admins'
        ),
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | The dedicated admin guard uses Laravel's session driver and the admins
    | Eloquent provider. The web guard is retained for compatibility with
    | Laravel / Sanctum components that may still reference it.
    |
    */

    'guards' => [

        'web' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],

        'admin' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | Administrators are loaded from the App\Models\Admin Eloquent model.
    |
    */

    'providers' => [

        'admins' => [
            'driver' => 'eloquent',
            'model' => Admin::class,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    |
    | Administrator password reset tokens are stored in Laravel's standard
    | password_reset_tokens table.
    |
    */

    'passwords' => [

        'admins' => [
            'provider' => 'admins',

            'table' => env(
                'AUTH_PASSWORD_RESET_TOKEN_TABLE',
                'password_reset_tokens'
            ),

            'expire' => 60,

            'throttle' => 60,
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    */

    'password_timeout' => env(
        'AUTH_PASSWORD_TIMEOUT',
        10800
    ),

];
