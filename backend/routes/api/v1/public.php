<?php

use App\Http\Controllers\Api\V1\Public\ContentController;
use App\Http\Controllers\Api\V1\Public\EnquiryController;
use App\Http\Controllers\Api\V1\Public\WebsiteSettingsController;
use App\Support\ApiResponse;
use Illuminate\Support\Facades\Route;

Route::get(
    '/health',
    function () {
        return ApiResponse::success(
            [
                'status' => 'ok',

                'service' => 'Aishwarya Exim & Logistics API',

                'api_version' => 'v1',
            ],
            'API is running.'
        );
    }
)->name('api.health');

Route::get(
    '/settings',
    WebsiteSettingsController::class
)
    ->name(
        'api.settings'
    );

Route::controller(ContentController::class)->group(function () {
    Route::get('/categories', 'categories');
    Route::get('/categories/{category:slug}', 'category');
    Route::get('/products', 'products');
    Route::get('/products/{product:slug}', 'product');
    Route::get('/gallery', 'gallery');
    Route::get('/blogs', 'blogs');
    Route::get('/blogs/{blog:slug}', 'blog');
    Route::get('/certifications', 'certifications');
    Route::get('/pages/{page:slug}', 'page');
});

Route::post('/enquiries/{type}', [EnquiryController::class, 'store'])
    ->whereIn('type', ['contact', 'product', 'quote'])
    ->middleware('throttle:enquiries');
