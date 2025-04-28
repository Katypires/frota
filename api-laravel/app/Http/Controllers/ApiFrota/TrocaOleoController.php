<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use App\Models\TrocaOleo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TrocaOleoController extends Controller
{
    public function index() {
        return response()->json(TrocaOleo::select('id', 'veiculo_id', 'ultima_troca', 'km', 'proxima_troca')->get());
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'ultima_troca' => 'required|date',
            'km' => 'required|integer',
            'proxima_troca' => 'required|integer'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        return response()->json(TrocaOleo::create($request->only(['veiculo_id', 'ultima_troca', 'km', 'proxima_troca'])), 201);
    }

    public function show($id) {
        $troca = TrocaOleo::select('id', 'veiculo_id', 'ultima_troca', 'km', 'proxima_troca')->find($id);
        return $troca ? response()->json($troca) : response()->json(['error' => 'Troca de óleo não encontrada'], 404);
    }

    public function update(Request $request, $id) {
        $validator = Validator::make($request->all(), [
            'veiculo_id' => 'required|exists:veiculos,id',
            'ultima_troca' => 'required|date',
            'km' => 'required|integer',
            'proxima_troca' => 'required|integer'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        $troca = TrocaOleo::find($id);
        if (!$troca) return response()->json(['error' => 'Troca de óleo não encontrada'], 404);
        $troca->update($request->only(['veiculo_id', 'ultima_troca', 'km', 'proxima_troca']));
        return response()->json($troca);
    }

    public function destroy($id) {
        $troca = TrocaOleo::find($id);
        if (!$troca) return response()->json(['error' => 'Troca de óleo não encontrada'], 404);
        $troca->delete();
        return response()->json(['success' => true]);
    }
}
