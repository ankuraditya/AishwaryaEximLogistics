<?php

use App\Enums\WebsiteSettingGroup;
use App\Http\Controllers\Api\V1\Admin\ActivityLogController;
use App\Http\Controllers\Api\V1\Admin\AdminUserController;
use App\Http\Controllers\Api\V1\Admin\AuthController;
use App\Http\Controllers\Api\V1\Admin\BlogController;
use App\Http\Controllers\Api\V1\Admin\CatalogueController;
use App\Http\Controllers\Api\V1\Admin\CertificationController;
use App\Http\Controllers\Api\V1\Admin\DashboardController;
use App\Http\Controllers\Api\V1\Admin\EnquiryController;
use App\Http\Controllers\Api\V1\Admin\GalleryController;
use App\Http\Controllers\Api\V1\Admin\PageController;
use App\Http\Controllers\Api\V1\Admin\ProfileController;
use App\Http\Controllers\Api\V1\Admin\SettingsMediaController;
use App\Http\Controllers\Api\V1\Admin\WebsiteSettingsController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->name('admin.')
    ->middleware(
        'admin.no-cache'
    )
    ->group(
        function () {

            /*
            |--------------------------------------------------------------------------
            | Authentication
            |--------------------------------------------------------------------------
            */

            Route::prefix('auth')
                ->name('auth.')
                ->controller(
                    AuthController::class
                )
                ->group(
                    function () {

                        Route::post(
                            '/login',
                            'login'
                        )
                            ->middleware(
                                'throttle:admin-login'
                            )
                            ->name(
                                'login'
                            );
                    }
                );

            /*
            |--------------------------------------------------------------------------
            | Authenticated CMS
            |--------------------------------------------------------------------------
            */

            Route::middleware([
                'auth:sanctum',
                'admin.active',
                'throttle:admin',
            ])
                ->group(
                    function () {

                        /*
                        |--------------------------------------------------------------------------
                        | Session
                        |--------------------------------------------------------------------------
                        */

                        Route::get(
                            '/auth/me',
                            [
                                AuthController::class,
                                'me',
                            ]
                        )
                            ->name(
                                'auth.me'
                            );

                        Route::get('/administrators', [AdminUserController::class, 'index'])
                            ->middleware('can:admins.view');
                        Route::post('/administrators', [AdminUserController::class, 'store'])
                            ->middleware('can:admins.create');
                        Route::patch('/administrators/{admin}', [AdminUserController::class, 'update'])
                            ->middleware('can:admins.update');

                        Route::post(
                            '/auth/logout',
                            [
                                AuthController::class,
                                'logout',
                            ]
                        )
                            ->name(
                                'auth.logout'
                            );

                        /*
                        |--------------------------------------------------------------------------
                        | Dashboard
                        |--------------------------------------------------------------------------
                        */

                        Route::get(
                            '/dashboard',
                            [
                                DashboardController::class,
                                'index',
                            ]
                        )
                            ->middleware(
                                'can:dashboard.view'
                            )
                            ->name(
                                'dashboard'
                            );

                        Route::controller(CatalogueController::class)->group(function () {
                            Route::get('/categories', 'categories')->middleware('can:categories.view');
                            Route::post('/categories', 'storeCategory')->middleware('can:categories.create');
                            Route::patch('/categories/{category}', 'updateCategory')->middleware('can:categories.update');
                            Route::delete('/categories/{category}', 'destroyCategory')->middleware('can:categories.delete');
                            Route::get('/subcategories', 'subcategories')->middleware('can:categories.view');
                            Route::post('/subcategories', 'storeSubcategory')->middleware('can:categories.create');
                            Route::patch('/subcategories/{subcategory}', 'updateSubcategory')->middleware('can:categories.update');
                            Route::delete('/subcategories/{subcategory}', 'destroySubcategory')->middleware('can:categories.delete');
                            Route::get('/products', 'products')->middleware('can:products.view');
                            Route::post('/products', 'storeProduct')->middleware('can:products.create');
                            Route::patch('/products/{product}', 'updateProduct')->middleware('can:products.update');
                            Route::delete('/products/{product}', 'destroyProduct')->middleware('can:products.delete');
                        });

                        Route::controller(GalleryController::class)->prefix('gallery')->group(function () {
                            Route::get('/categories', 'categories')->middleware('can:gallery.view');
                            Route::post('/categories', 'storeCategory')->middleware('can:gallery.create');
                            Route::patch('/categories/{galleryCategory}', 'updateCategory')->middleware('can:gallery.update');
                            Route::delete('/categories/{galleryCategory}', 'destroyCategory')->middleware('can:gallery.delete');
                            Route::get('/items', 'items')->middleware('can:gallery.view');
                            Route::post('/items', 'storeItem')->middleware('can:gallery.create');
                            Route::patch('/items/{galleryItem}', 'updateItem')->middleware('can:gallery.update');
                            Route::delete('/items/{galleryItem}', 'destroyItem')->middleware('can:gallery.delete');
                        });

                        Route::controller(BlogController::class)->prefix('blogs')->group(function () {
                            Route::get('/categories', 'categories')->middleware('can:blogs.view');
                            Route::post('/categories', 'storeCategory')->middleware('can:blogs.create');
                            Route::patch('/categories/{blogCategory}', 'updateCategory')->middleware('can:blogs.update');
                            Route::delete('/categories/{blogCategory}', 'destroyCategory')->middleware('can:blogs.delete');
                            Route::get('/', 'posts')->middleware('can:blogs.view');
                            Route::post('/', 'store')->middleware('can:blogs.create');
                            Route::patch('/{blog}', 'update')->middleware('can:blogs.update');
                            Route::delete('/{blog}', 'destroy')->middleware('can:blogs.delete');
                        });

                        Route::controller(EnquiryController::class)->prefix('enquiries')->group(function () {
                            Route::get('/', 'index')->middleware('can:leads.view');
                            Route::get('/export/csv', 'export')->middleware('can:leads.export');
                            Route::get('/assignees/list', 'assignees')->middleware('can:leads.update');
                            Route::get('/{enquiry}', 'show')->middleware('can:leads.view');
                            Route::patch('/{enquiry}', 'update')->middleware('can:leads.update');
                            Route::post('/{enquiry}/notes', 'storeNote')->middleware('can:leads.update');
                        });

                        Route::apiResource('certifications', CertificationController::class)
                            ->except(['show'])
                            ->middlewareFor('index', 'can:pages.view')
                            ->middlewareFor(['store', 'update', 'destroy'], 'can:pages.update');

                        Route::apiResource('pages', PageController::class)
                            ->except(['show'])
                            ->middlewareFor('index', 'can:pages.view')
                            ->middlewareFor(['store', 'update', 'destroy'], 'can:pages.update');

                        /*
                        |--------------------------------------------------------------------------
                        | Profile
                        |--------------------------------------------------------------------------
                        */

                        Route::get(
                            '/profile',
                            [
                                ProfileController::class,
                                'show',
                            ]
                        )
                            ->name(
                                'profile.show'
                            );

                        Route::patch(
                            '/profile',
                            [
                                ProfileController::class,
                                'update',
                            ]
                        )
                            ->name(
                                'profile.update'
                            );

                        Route::put(
                            '/profile/password',
                            [
                                ProfileController::class,
                                'changePassword',
                            ]
                        )
                            ->name(
                                'profile.password'
                            );

                        Route::post(
                            '/profile/logout-other-sessions',
                            [
                                ProfileController::class,
                                'logoutOtherSessions',
                            ]
                        )
                            ->name(
                                'profile.logout-other-sessions'
                            );

                        /*
                        |--------------------------------------------------------------------------
                        | Website Settings
                        |--------------------------------------------------------------------------
                        */

                        Route::prefix(
                            'settings'
                        )
                            ->name(
                                'settings.'
                            )
                            ->group(
                                function () {

                                    /*
                                     * Settings Media
                                     */

                                    Route::get(
                                        '/media',
                                        [
                                            SettingsMediaController::class,
                                            'index',
                                        ]
                                    )
                                        ->middleware(
                                            'can:media.view'
                                        )
                                        ->name(
                                            'media.index'
                                        );

                                    Route::post(
                                        '/media',
                                        [
                                            SettingsMediaController::class,
                                            'store',
                                        ]
                                    )
                                        ->middleware(
                                            'can:media.upload'
                                        )
                                        ->name(
                                            'media.store'
                                        );

                                    Route::delete(
                                        '/media/{media}',
                                        [
                                            SettingsMediaController::class,
                                            'destroy',
                                        ]
                                    )
                                        ->middleware(
                                            'can:media.delete'
                                        )
                                        ->name(
                                            'media.destroy'
                                        );

                                    /*
                                     * Settings
                                     */

                                    Route::get(
                                        '/',
                                        [
                                            WebsiteSettingsController::class,
                                            'index',
                                        ]
                                    )
                                        ->middleware(
                                            'can:settings.view'
                                        )
                                        ->name(
                                            'index'
                                        );

                                    Route::get(
                                        '/{group}',
                                        [
                                            WebsiteSettingsController::class,
                                            'show',
                                        ]
                                    )
                                        ->middleware(
                                            'can:settings.view'
                                        )
                                        ->where(
                                            'group',
                                            WebsiteSettingGroup::routePattern()
                                        )
                                        ->name(
                                            'show'
                                        );

                                    Route::patch(
                                        '/{group}',
                                        [
                                            WebsiteSettingsController::class,
                                            'update',
                                        ]
                                    )
                                        ->middleware(
                                            'can:settings.update'
                                        )
                                        ->where(
                                            'group',
                                            WebsiteSettingGroup::routePattern()
                                        )
                                        ->name(
                                            'update'
                                        );
                                }
                            );

                        /*
                        |--------------------------------------------------------------------------
                        | Activity / Security
                        |--------------------------------------------------------------------------
                        */

                        Route::get(
                            '/activity-logs',
                            [
                                ActivityLogController::class,
                                'index',
                            ]
                        )
                            ->middleware(
                                'can:activity.view'
                            )
                            ->name(
                                'activity.index'
                            );
                    }
                );
        }
    );
