<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use App\Models\Viagem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ViagemController extends Controller
{
    public function index()
    {
        $viagens = Viagem::with([
            'veiculo',
            'motorista.profissional.user'
        ])->get();

        return response()->json($viagens);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'data_viagem' => 'required|date',
            'nivel_combustivel' => 'nullable|numeric',
            'nota' => 'nullable|string',
            'status' => 'required|in:aberto,finalizado',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => 'Dados inválidos',
                'mensagens' => $validator->errors()
            ], 400);
        }
        return response()->json(Viagem::create($request->only(['veiculo_id', 'motorista_id', 'data_viagem', 'nivel_combustivel', 'nota', 'status'])), 201);
    }

    public function show($id)
    {
        $viagem = Viagem::select('id', 'veiculo_id', 'motorista_id', 'data_viagem', 'nivel_combustivel', 'nota', 'status')->find($id);
        return $viagem ? response()->json($viagem) : response()->json(['error' => 'Viagem não encontrada'], 404);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'data_viagem' => 'required|date',
            'nivel_combustivel' => 'nullable|numeric',
            'nota' => 'nullable|string',
            'status' => 'required|in:aberto,finalizado',
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        $viagem = Viagem::find($id);
        if (!$viagem) return response()->json(['error' => 'Viagem não encontrada'], 404);
        $viagem->update($request->only(['veiculo_id', 'motorista_id', 'data_viagem', 'nivel_combustivel', 'nota', 'status']));
        return response()->json($viagem);
    }

    public function destroy($id)
    {
        $viagem = Viagem::find($id);
        if (!$viagem) return response()->json(['error' => 'Viagem não encontrada'], 404);
        $viagem->delete();
        return response()->json(['success' => true]);
    }
}
