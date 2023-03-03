<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\CategoriesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        // 'defaultCount' => 100
    ]);
});

Route::get('/news', [NewsController::class, 'index'])->name('news.index');
Route::get('/categories', [CategoriesController::class, 'index'])->name('categories.index');
Route::post('/news', [NewsController::class, 'store'])->name('news.store');
Route::post('/categories', [CategoriesController::class, 'store'])->name('categories.store');
Route::delete('/news/{id}', [NewsController::class, 'destroy'])->name('news.destroy');
Route::delete('/categories/{id}', [CategoriesController::class, 'destroy'])->name('categories.destroy');
