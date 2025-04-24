<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use App\Models\Vistoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VistoriaController extends Controller
{
    public function index() {
        return response()->json(Vistoria::select('id', 'veiculo_id', 'motorista_id', 'data_vistoria', 'estepe', 'pneu')->get());
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'data_vistoria' => 'required|date',
            'estepe' => 'required|boolean',
            'pneu' => 'required|boolean'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        return response()->json(Vistoria::create($request->only(['veiculo_id', 'motorista_id', 'data_vistoria', 'estepe', 'pneu'])), 201);
    }

    public function show($id) {
        $vistoria = Vistoria::select('id', 'veiculo_id', 'motorista_id', 'data_vistoria', 'estepe', 'pneu')->find($id);
        return $vistoria ? response()->json($vistoria) : response()->json(['error' => 'Vistoria não encontrada'], 404);
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'motorista_id' => 'required|exists:motoristas,id',
            'data_vistoria' => 'required|date',
            'estepe' => 'required|boolean',
            'pneu' => 'required|boolean'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        $vistoria = Vistoria::find($id);
        if (!$vistoria) return response()->json(['error' => 'Vistoria não encontrada'], 404);
        $vistoria->update($request->only(['veiculo_id', 'motorista_id', 'data_vistoria', 'estepe', 'pneu']));
        return response()->json($vistoria);
    }

    public function destroy($id) {
        $vistoria = Vistoria::find($id);
        if (!$vistoria) return response()->json(['error' => 'Vistoria não encontrada'], 404);
        $vistoria->delete();
        return response()->json(['success' => true]);
    }
}
