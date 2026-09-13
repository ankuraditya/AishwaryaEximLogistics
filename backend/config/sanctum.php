<?php

use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Laravel\Sanctum\Http\Middleware\AuthenticateSession;
use Laravel\Sanctum\Sanctum;

return [

    /*
    |--------------------------------------------------------------------------
    | Stateful Domains
    |--------------------------------------------------------------------------
    |
    | Requests from the following domains / hosts will receive stateful API
    | authentication cookies. These should include the local and production
    | frontend domains that communicate with this Laravel API.
    |
    | The admin SPA currently runs on localhost:5174 and should also be
    | present in the SANCTUM_STATEFUL_DOMAINS environment variable.
    |
    */

    'stateful' => explode(
        ',',
        env(
            'SANCTUM_STATEFUL_DOMAINS',
            sprintf(
                '%s%s',
                'localhost,localhost:3000,localhost:5174,127.0.0.1,127.0.0.1:8000,::1',
                Sanctum::currentApplicationUrlWithPort(),
            )
        )
    ),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Guards
    |--------------------------------------------------------------------------
    |
    | Sanctum will check the dedicated admin session guard when resolving
    | authentication for first-party SPA requests.
    |
    | If the session guard cannot authenticate the request, Sanctum may
    | subsequently inspect a Bearer token when one is supplied.
    |
    */

    'guard' => [
        'admin',
    ],

    /*
    |--------------------------------------------------------------------------
    | Expiration Minutes
    |--------------------------------------------------------------------------
    |
    | This value controls the number of minutes until an issued personal
    | access token is considered expired. First-party session authentication
    | is not affected by this value.
    |
    */

    'expiration' => null,

    /*
    |--------------------------------------------------------------------------
    | Token Prefix
    |--------------------------------------------------------------------------
    |
    | Personal access tokens may optionally be prefixed so secret-scanning
    | systems can identify accidentally committed credentials.
    |
    */

    'token_prefix' => env(
        'SANCTUM_TOKEN_PREFIX',
        ''
    ),

    /*
    |--------------------------------------------------------------------------
    | Sanctum Middleware
    |--------------------------------------------------------------------------
    |
    | Middleware used when Sanctum handles first-party SPA authentication.
    |
    */

    'middleware' => [

        'authenticate_session' => AuthenticateSession::class,

        'encrypt_cookies' => EncryptCookies::class,

        'validate_csrf_token' => ValidateCsrfToken::class,

    ],

];
