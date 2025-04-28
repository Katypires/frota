<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use App\Models\Unidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UnidadeController extends Controller
{
    public function index()
    {
        return response()->json(Unidade::select('id', 'nome', 'status')->get());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string',
            'status' => 'required|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        return response()->json(Unidade::create($request->only(['nome', 'status'])), 201);
    }

    public function show($id)
    {
        $unidade = Unidade::select('id', 'nome', 'status')->find($id);
        return $unidade ? response()->json($unidade) : response()->json(['error' => 'Unidade não encontrada'], 404);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required|string',
            'status' => 'required|string'
        ]);
        if ($validator->fails()) return response()->json(['error' => 'Dados inválidos'], 400);
        $unidade = Unidade::find($id);
        if (!$unidade) return response()->json(['error' => 'Unidade não encontrada'], 404);
        $unidade->update($request->only(['nome', 'status']));
        return response()->json($unidade);
    }

    public function destroy($id)
    {
        $unidade = Unidade::find($id);
        if (!$unidade) return response()->json(['error' => 'Unidade não encontrada'], 404);
        $unidade->delete();
        return response()->json(['success' => true]);
    }
}
