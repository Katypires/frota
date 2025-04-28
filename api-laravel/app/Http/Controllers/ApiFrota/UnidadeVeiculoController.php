<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use App\Models\UnidadeVeiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Unidade;
use App\Models\Veiculo;


class UnidadeVeiculoController extends Controller
{
    public function index() {
        return response()->json(
            UnidadeVeiculo::with(['unidade', 'veiculo'])
                ->select('id', 'unidade_id', 'veiculo_id', 'status')
                ->get()
        );
    }
    

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'unidade_id' => 'required|exists:unidades,id',
            'veiculo_id' => 'required|exists:veiculos,id',
            'status' => 'nullable|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        return response()->json(UnidadeVeiculo::create($request->only(['unidade_id', 'veiculo_id', 'status'])), 201);
    }

    public function show($id) {
        $unidadeVeiculo = UnidadeVeiculo::select('id', 'unidade_id', 'veiculo_id', 'status')->find($id);
        return $unidadeVeiculo ? response()->json($unidadeVeiculo) : response()->json(['error' => 'Registro não encontrado'], 404);
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'unidade_id' => 'required|exists:unidades,id',
            'veiculo_id' => 'required|exists:veiculos,id',
            'status' => 'nullable|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        $unidadeVeiculo = UnidadeVeiculo::find($id);
        if (!$unidadeVeiculo) return response()->json(['error' => 'Registro não encontrado'], 404);
        $unidadeVeiculo->update($request->only(['unidade_id', 'veiculo_id', 'status']));
        return response()->json($unidadeVeiculo);
    }

    public function destroy($id) {
        $unidadeVeiculo = UnidadeVeiculo::find($id);
        if (!$unidadeVeiculo) return response()->json(['error' => 'Registro não encontrado'], 404);
        $unidadeVeiculo->delete();
        return response()->json(['success' => true]);
    }
}
