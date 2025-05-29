<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\ViagemDestino;

class ViagemDestinoController extends Controller
{
    public function index()
    {
        return response()->json(ViagemDestino::all());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'viagem_id' => 'required|exists:viagems,id',
            'data_saida' => 'nullable|date',
            'data_chegada' => 'nullable|date',
            'km_saida' => 'nullable|integer',
            'km_chegada' => 'nullable|integer',
            'local_saida' => 'nullable|string',
            'local_destino' => 'nullable|string',
            'nota' => 'nullable|string',
            'status' => 'nullable|string',
            'latitude_saida' => 'nullable|numeric',
            'longitude_saida' => 'nullable|numeric',
            'latitude_chegada' => 'nullable|numeric',
            'longitude_chegada' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Dados inválidos'], 400);
        }

        $viagemDestino = ViagemDestino::create($request->all());
        return response()->json($viagemDestino, 201);
    }

    public function show($id)
    {
        $viagemDestino = ViagemDestino::find($id);

        if (!$viagemDestino) {
            return response()->json(['error' => 'Registro não encontrado'], 404);
        }

        return response()->json($viagemDestino);
    }

    public function update(Request $request, $id)
    {
        $viagemDestino = ViagemDestino::find($id);

        if (!$viagemDestino) {
            return response()->json(['error' => 'Registro não encontrado'], 404);
        }

        $viagemDestino->update($request->all());

        return response()->json($viagemDestino);
    }

    public function destroy($id)
    {
        $viagemDestino = ViagemDestino::find($id);

        if (!$viagemDestino) {
            return response()->json(['error' => 'Registro não encontrado'], 404);
        }

        $viagemDestino->delete();

        return response()->json(['success' => true]);
    }
}
