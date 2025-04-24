<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use App\Models\Veiculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VeiculoController extends Controller
{
    public function index() {
        return response()->json(Veiculo::select('id', 'nome', 'placa', 'marca', 'modelo', 'status')->get());
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'nome' => 'required', 'placa' => 'required', 'marca' => 'required', 'status' => 'required']);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        return response()->json(Veiculo::create($request->only(['nome', 'placa', 'marca', 'modelo', 'status'])), 201);
    }

    public function show($id) {
        $veiculo = Veiculo::select('id', 'nome', 'placa', 'marca', 'modelo', 'status')->find($id);
        return $veiculo ? response()->json($veiculo) : response()->json(['error' => 'Veículo não encontrado'], 404);
    }
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Veiculo $veiculo)
    {
        //
    }
    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'nome' => 'required', 'placa' => 'required', 'marca' => 'required', 'status' => 'required']);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        $veiculo = Veiculo::find($id);
        if (!$veiculo) return response()->json(['error' => 'Veículo não encontrado'], 404);
        $veiculo->update($request->only(['nome', 'placa', 'marca', 'modelo', 'status']));
        return response()->json($veiculo);
    }

    public function destroy($id) {
        $veiculo = Veiculo::find($id);
        if (!$veiculo) return response()->json(['error' => 'Veículo não encontrado'], 404);
        $veiculo->delete();
        return response()->json(['success' => true]);
    }  
}
