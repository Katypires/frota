<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use App\Models\FinalizarViagem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FinalizarViagemController extends Controller
{
    public function index(){
        return response()->json(
            FinalizarViagem::with(['veiculo', 'motorista'])
                ->select('id', 'veiculo_id', 'motorista_id', 'hora_chegada', 'local_chegada', 'km_chegada', 'km_total', 'nivel_combustivel', 'nota', 'status')
                ->get()
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'hora_chegada' => 'required|date_format:Y-m-d H:i',
            'local_chegada' => 'required|string',
            'km_chegada' => 'required|integer',
            'km_total' => 'required|integer',
            'nivel_combustivel' => 'required|integer',
            'nota' => 'nullable|string',
            'status' => 'nullable|string'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => 'Dados inválidos',
                'mensagens' => $validator->errors()
            ], 400);
        }
        return response()->json(FinalizarViagem::create($request->only(['id', 'veiculo_id', 'motorista_id', 'hora_chegada', 'local_chegada', 'km_chegada', 'km_total', 'nivel_combustivel', 'nota', 'status'])), 201);
    }

    public function show($id)
    {
        $viagem = FinalizarViagem::select('id', 'veiculo_id', 'motorista_id', 'hora_chegada', 'local_chegada', 'km_chegada', 'km_total', 'nivel_combustivel', 'nota', 'status')->find($id);
        return $viagem ? response()->json($viagem) : response()->json(['error' => 'Viagem não encontrada'], 404);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'hora_chegada' => 'required|date_format:Y-m-d H:i',
            'local_chegada' => 'required|string',
            'km_chegada' => 'required|integer',
            'km_total' => 'required|integer',
            'nivel_combustivel' => 'required|integer',
            'nota' => 'nullable|string',
            'status' => 'nullable|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        $viagem = FinalizarViagem::find($id);
        if (!$viagem) return response()->json(['error' => 'Viagem não encontrada'], 404);
        $viagem->update($request->only(['id', 'veiculo_id', 'motorista_id', 'hora_chegada', 'local_chegada', 'km_chegada', 'km_total', 'nivel_combustivel', 'nota', 'status']));
        return response()->json($viagem);
    }

    public function destroy($id)
    {
        $viagem = FinalizarViagem::find($id);
        if (!$viagem) return response()->json(['error' => 'Viagem não encontrada'], 404);
        $viagem->delete();
        return response()->json(['success' => true]);
    }
}
