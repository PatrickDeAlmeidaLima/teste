<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservaController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('reservas', [ReservaController::class, 'index']);
Route::post('reservas', [ReservaController::class, 'store']);
Route::get('reservas/{id}', [ReservaController::class, 'show']);
Route::put('reservas/{id}', [ReservaController::class, 'update']);
Route::delete('reservas/{id}', [ReservaController::class, 'destroy']);
Route::put('reservas/{id}/desativar', [ReservaController::class, 'desativar']);
