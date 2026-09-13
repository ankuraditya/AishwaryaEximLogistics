<?php

$allowedOrigins = array_values(
    array_filter([
        env('FRONTEND_URL'),

        env(
            'ADMIN_FRONTEND_URL'
        ),
    ])
);

if (env('APP_ENV', 'production') === 'local') {
    $allowedOrigins = array_values(array_unique(array_merge($allowedOrigins, [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5173',
        'http://127.0.0.1:5174',
    ])));
}

return [

    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
    ],

    'allowed_methods' => [
        '*',
    ],

    'allowed_origins' => $allowedOrigins,

    'allowed_origins_patterns' => [],

    'allowed_headers' => [
        'Accept',
        'Authorization',
        'Content-Type',
        'Origin',
        'X-Requested-With',
        'X-XSRF-TOKEN',
    ],

    'exposed_headers' => [
        'X-Request-Id',
    ],

    'max_age' => 3600,

    /*
     * Required by Sanctum's
     * stateful SPA authentication.
     */
    'supports_credentials' => true,

];
