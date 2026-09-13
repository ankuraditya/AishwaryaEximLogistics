<?php

use App\Http\Middleware\AssignRequestId;
use App\Http\Middleware\EnsureAdminIsActive;
use App\Http\Middleware\PreventAdminResponseCaching;
use App\Http\Middleware\SecurityHeaders;
use App\Support\ApiResponse;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

return Application::configure(
    basePath: dirname(__DIR__)
)
    ->withRouting(
        web: __DIR__.'/../routes/web.php',

        api: __DIR__.'/../routes/api.php',

        commands: __DIR__.'/../routes/console.php',

        health: '/up',

        apiPrefix: 'api/v1',
    )

    ->withMiddleware(
        function (
            Middleware $middleware
        ): void {

            /*
             * First-party SPA authentication
             * through Laravel Sanctum.
             */
            $middleware->statefulApi();

            /*
             * Global API limiter.
             */
            $middleware->throttleApi(
                'api'
            );

            /*
             * Add a request UUID to
             * every API response.
             */
            $middleware->api(
                prepend: [
                    AssignRequestId::class,
                    SecurityHeaders::class,
                ]
            );

            /*
             * Custom middleware aliases.
             */
            $middleware->alias([
                'admin.active' => EnsureAdminIsActive::class,

                'admin.no-cache' => PreventAdminResponseCaching::class,
            ]);
        }
    )

    ->withExceptions(
        function (
            Exceptions $exceptions
        ): void {

            /*
             * API requests should always
             * receive JSON errors.
             */
            $exceptions
                ->shouldRenderJsonWhen(
                    function (
                        Request $request,
                        Throwable $e
                    ): bool {
                        return
                            $request->is(
                                'api/*'
                            ) ||
                            $request
                                ->expectsJson();
                    }
                );

            /*
             * Validation
             */
            $exceptions->render(
                function (
                    ValidationException $e,
                    Request $request
                ) {
                    if (
                        ! $request->is(
                            'api/*'
                        )
                    ) {
                        return null;
                    }

                    return ApiResponse::error(
                        'The given data was invalid.',
                        $e->errors(),
                        422
                    );
                }
            );

            /*
             * Authentication
             */
            $exceptions->render(
                function (
                    AuthenticationException $e,
                    Request $request
                ) {
                    if (
                        ! $request->is(
                            'api/*'
                        )
                    ) {
                        return null;
                    }

                    return ApiResponse::error(
                        'Unauthenticated.',
                        null,
                        401
                    );
                }
            );

            /*
             * Model not found
             */
            $exceptions->render(
                function (
                    ModelNotFoundException $e,
                    Request $request
                ) {
                    if (
                        ! $request->is(
                            'api/*'
                        )
                    ) {
                        return null;
                    }

                    return ApiResponse::error(
                        'The requested resource was not found.',
                        null,
                        404
                    );
                }
            );

            /*
             * Invalid / expired CSRF
             */
            $exceptions->render(
                function (
                    TokenMismatchException $e,
                    Request $request
                ) {
                    if (
                        ! $request->is(
                            'api/*'
                        )
                    ) {
                        return null;
                    }

                    return ApiResponse::error(
                        'Your session has expired. Please refresh and try again.',
                        null,
                        419
                    );
                }
            );

            /*
             * Authorization / Permissions
             */
            $exceptions->render(
                function (
                    AuthorizationException $e,
                    Request $request
                ) {
                    if (
                        ! $request->is(
                            'api/*'
                        )
                    ) {
                        return null;
                    }

                    return ApiResponse::error(
                        'You are not authorised to perform this action.',
                        null,
                        403
                    );
                }
            );

            /*
             * 403 / 404 / 405 / 429 etc.
             */
            $exceptions->render(
                function (
                    HttpExceptionInterface $e,
                    Request $request
                ) {
                    if (
                        ! $request->is(
                            'api/*'
                        )
                    ) {
                        return null;
                    }

                    $status =
                        $e->getStatusCode();

                    $message = match (
                        $status
                    ) {
                        403 => 'You are not authorised to perform this action.',

                        404 => 'The requested endpoint was not found.',

                        405 => 'HTTP method not allowed.',

                        429 => 'Too many requests. Please try again later.',

                        default => $e->getMessage()
                            ?: 'The request could not be completed.',
                    };

                    return ApiResponse::error(
                        $message,
                        null,
                        $status
                    );
                }
            );

            /*
             * Unexpected server errors.
             *
             * Never expose exception traces
             * or database details to clients.
             */
            $exceptions->render(
                function (
                    Throwable $e,
                    Request $request
                ) {
                    if (
                        ! $request->is(
                            'api/*'
                        )
                    ) {
                        return null;
                    }

                    return ApiResponse::error(
                        'An unexpected server error occurred.',
                        null,
                        500
                    );
                }
            );
        }
    )

    ->create();
