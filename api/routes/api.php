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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


/*
|--------------------------------------------------------------------------
| Pet Routes
|--------------------------------------------------------------------------
|
| Here we define our Pet Model routes
|
*/

/*

Route::get('/', function() {
    return redirect('/api/pets');
});

Route::get('pets',			'PetController@index');
Route::get('pet/{pet}',		'PetController@show');
Route::post('pet',			'PetController@store');
Route::put('pet/{pet}',		'PetController@update');
Route::delete('pet/{pet}',	'PetController@delete');

*/