<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use App\Models\Viagem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ViagemController extends Controller
{
    public function index() {
        return response()->json(Viagem::select('id', 'veiculo_id', 'motorista_id', 'data_viagem', 'data_saida', 'km_saida', 'local_saida', 'local_destino', 'hora_chegada', 'km_chegada', 'km_total', 'nota')->get());
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'data_viagem' => 'required|date',
            'data_saida' => 'required|date',
            'km_saida' => 'required|integer',
            'local_saida' => 'required|string',
            'local_destino' => 'required|string',
            'hora_chegada' => 'required|date',
            'km_chegada' => 'required|integer',
            'km_total' => 'required|integer',
            'nota' => 'nullable|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        return response()->json(Viagem::create($request->only(['veiculo_id', 'motorista_id', 'data_viagem', 'data_saida', 'km_saida', 'local_saida', 'local_destino', 'hora_chegada', 'km_chegada', 'km_total', 'nota'])), 201);
    }

    public function show($id) {
        $viagem = Viagem::select('id', 'veiculo_id', 'motorista_id', 'data_viagem', 'data_saida', 'km_saida', 'local_saida', 'local_destino', 'hora_chegada', 'km_chegada', 'km_total', 'nota')->find($id);
        return $viagem ? response()->json($viagem) : response()->json(['error' => 'Viagem não encontrada'], 404);
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'data_viagem' => 'required|date',
            'data_saida' => 'required|date',
            'km_saida' => 'required|integer',
            'local_saida' => 'required|string',
            'local_destino' => 'required|string',
            'hora_chegada' => 'required|date',
            'km_chegada' => 'required|integer',
            'km_total' => 'required|integer',
            'nota' => 'nullable|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        $viagem = Viagem::find($id);
        if (!$viagem) return response()->json(['error' => 'Viagem não encontrada'], 404);
        $viagem->update($request->only(['veiculo_id', 'motorista_id', 'data_viagem', 'data_saida', 'km_saida', 'local_saida', 'local_destino', 'hora_chegada', 'km_chegada', 'km_total', 'nota']));
        return response()->json($viagem);
    }

    public function destroy($id) {
        $viagem = Viagem::find($id);
        if (!$viagem) return response()->json(['error' => 'Viagem não encontrada'], 404);
        $viagem->delete();
        return response()->json(['success' => true]);
    }
}
