<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('admin.panel');
});

Route::view('/admin/{path?}', 'admin')
    ->where('path', '.*')
    ->name('admin.panel');
