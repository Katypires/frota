<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Abastecimento;
use Illuminate\Http\Request;

class AbastecimentoController extends Controller
{
    public function index() {
        return response()->json(Abastecimento::select('id', 'veiculo_id', 'motorista_id', 'data_abastecimento', 'km', 'litros', 'tipo', 'status')->get());
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'data_abastecimento' => 'required|date',
            'km' => 'required|integer',
            'litros' => 'required|integer',
            'tipo' => 'required|string',
            'status' => 'required|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        return response()->json(Abastecimento::create($request->only(['veiculo_id', 'motorista_id', 'data_abastecimento', 'km', 'litros', 'tipo', 'status'])), 201);
    }

    public function show($id) {
        $abastecimento = Abastecimento::select('id', 'veiculo_id', 'motorista_id', 'data_abastecimento', 'km', 'litros', 'tipo', 'status')->find($id);
        return $abastecimento ? response()->json($abastecimento) : response()->json(['error' => 'Abastecimento não encontrado'], 404);
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'data_abastecimento' => 'required|date',
            'km' => 'required|integer',
            'litros' => 'required|integer',
            'tipo' => 'required|string',
            'status' => 'required|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        $abastecimento = Abastecimento::find($id);
        if (!$abastecimento) return response()->json(['error' => 'Abastecimento não encontrado'], 404);
        $abastecimento->update($request->only(['veiculo_id', 'motorista_id', 'data_abastecimento', 'km', 'litros', 'tipo', 'status']));
        return response()->json($abastecimento);
    }

    public function destroy($id) {
        $abastecimento = Abastecimento::find($id);
        if (!$abastecimento) return response()->json(['error' => 'Abastecimento não encontrado'], 404);
        $abastecimento->delete();
        return response()->json(['success' => true]);
    }
}
