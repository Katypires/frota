<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ItemController;
use App\Http\Controllers\ApiFrota\AbastecimentoController;
use App\Http\Controllers\ApiFrota\FinalizarViagemController;
use App\Http\Controllers\ApiFrota\ManutencaoController;
use App\Http\Controllers\ApiFrota\MotoristaController;
use App\Http\Controllers\ApiFrota\TrocaOleoController;
use App\Http\Controllers\ApiFrota\VeiculoController;
use App\Http\Controllers\ApiFrota\VistoriaController;
use App\Http\Controllers\ApiFrota\ViagemController;
use App\Http\Controllers\ApiFrota\UnidadeController;
use App\Http\Controllers\ApiFrota\UnidadeVeiculoController;
use App\Http\Controllers\ApiFrota\ProfissionalController;
use App\Http\Controllers\ApiFrota\ViagemDestinoController;
use Illuminate\Support\Facades\Route;


Route::get("/teste", function(){
    return ['teste' => true];
});

//ROTAS USUARIO
Route::post("/auth/login", [AuthController::class, 'login']);
Route::middleware('auth:api')->post("/auth/logout", [AuthController::class, 'logout']);
Route::post("/auth/refresh", [AuthController::class, 'refresh']);
Route::post("/user", [AuthController::class, 'create']);
Route::get("/user", [UserController::class, 'read']);
Route::post('/register', [AuthController::class, 'register']);

//ROTAS ITEM
Route::resource('/item', ItemController::class);

Route::resources([
    'abastecimento' => AbastecimentoController::class,
    'manutencao' => ManutencaoController::class,
    'motorista' => MotoristaController::class,
    'troca_oleo' => TrocaOleoController::class,
    'veiculo' => VeiculoController::class,
    'vistoria' => VistoriaController::class,
    'viagem' => ViagemController::class,
    'unidade' => UnidadeController::class,
    'unidade_veiculo' => UnidadeVeiculoController::class,
    'finalizar_viagem' => FinalizarViagemController::class,
    'profissional' => ProfissionalController::class,
    'viagem_destino' => ViagemDestinoController::class,
]);
