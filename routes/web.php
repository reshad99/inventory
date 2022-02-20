<?php


use Illuminate\Support\Facades\Route;
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
    return view('front.homepage');
})->name("index");
Route::get('/products', function () {
    return view('front.product');
})->name("product");
Route::get('/brands', function () {
    return view('front.brand');
})->name("brand");
Route::get('/orders', function () {
    return view('front.order');
})->name("order");
Route::get('/clients', function () {
    return view('front.client');
})->name("client");
Route::get("/product-list", "App\Http\Controllers\Product\ProductController@index")->name("products");
Route::get("/brand-list", "App\Http\Controllers\Brand\BrandController@index")->name("b");
Route::get("/client-list", "App\Http\Controllers\Client\ClientController@index")->name("clients");
Route::get("/order-list", "App\Http\Controllers\Order\OrderController@index")->name("orders");
Route::post("/brand-list/store", "App\Http\Controllers\Brand\BrandController@store");
Route::post("brand-list/order", "App\Http\Controllers\Brand\BrandController@order")->name('order');
Route::get("/brand-list/{id}", "App\Http\Controllers\Brand\BrandController@indexById");
Route::get("/brand-list/delete/{id}", "App\Http\Controllers\Brand\BrandController@destroy")->name("delete");
Route::post("/brand-list/search", "App\Http\Controllers\Brand\BrandController@search")->name("search");
