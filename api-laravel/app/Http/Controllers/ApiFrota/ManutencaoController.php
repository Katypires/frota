<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use App\Models\Manutencao;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ManutencaoController extends Controller
{
    public function index() {
        return response()->json(Manutencao::select('id', 'veiculo_id', 'motorista_id', 'data', 'km', 'tipo_ocorrencia')->get());
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'data' => 'required|date',
            'km' => 'required|integer',
            'tipo_ocorrencia' => 'required|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        return response()->json(Manutencao::create($request->only(['veiculo_id', 'motorista_id', 'data', 'km', 'tipo_ocorrencia'])), 201);
    }

    public function show($id) {
        $manutencao = Manutencao::select('id', 'veiculo_id', 'motorista_id', 'data', 'km', 'tipo_ocorrencia')->find($id);
        return $manutencao ? response()->json($manutencao) : response()->json(['error' => 'Manutenção não encontrada'], 404);
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'data' => 'required|date',
            'km' => 'required|integer',
            'tipo_ocorrencia' => 'required|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        $manutencao = Manutencao::find($id);
        if (!$manutencao) return response()->json(['error' => 'Manutenção não encontrada'], 404);
        $manutencao->update($request->only(['veiculo_id', 'motorista_id', 'data', 'km', 'tipo_ocorrencia']));
        return response()->json($manutencao);
    }

    public function destroy($id) {
        $manutencao = Manutencao::find($id);
        if (!$manutencao) return response()->json(['error' => 'Manutenção não encontrada'], 404);
        $manutencao->delete();
        return response()->json(['success' => true]);
    }
}
