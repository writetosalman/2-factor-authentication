<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/', function() {
	return redirect('/api/login');
});

Route::post('login',        'API\UserController@login');
Route::post('register',     'API\UserController@register');
Route::post('token',        'API\TwoFactorController@validateTokenForm');

/*
// WEB Login
Route::post('login',        'Auth\LoginController@login');
Route::post('register',     'Auth\RegisterController@register');
Route::post('auth/token',   'Auth\TwoFactorController@validateTokenForm');
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
