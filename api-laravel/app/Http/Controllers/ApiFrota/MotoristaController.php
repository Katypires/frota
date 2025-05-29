<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Motorista;

class MotoristaController extends Controller
{
    public function index()
    {
        return response()->json(
            Motorista::with('profissional', 'user')->get()
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'profissional_id' => 'required|exists:profissionals,id',
            'cnh' => 'nullable|string',
            'validade' => 'nullable|date',
            'categoria' => 'nullable|array', 
            'user_id' => 'required|exists:users,id',
            'status' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Dados inválidos',
                'messages' => $validator->errors()
            ], 400);
        }

        $motorista = Motorista::create($request->all());

        return response()->json($motorista, 201);
    }

    public function show($id)
    {
        $motorista = Motorista::with('profissional', 'user')->find($id);

        if (!$motorista) {
            return response()->json(['error' => 'Motorista não encontrado'], 404);
        }

        return response()->json($motorista);
    }

    public function update(Request $request, $id)
    {
        $motorista = Motorista::find($id);

        if (!$motorista) {
            return response()->json(['error' => 'Motorista não encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'profissional_id' => 'required|exists:profissionals,id',
            'cnh' => 'nullable|string',
            'validade' => 'nullable|date',
            'categoria' => 'nullable|array',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => 'Dados inválidos',
                'messages' => $validator->errors()
            ], 400);
        }

        $motorista->update($request->all());

        return response()->json($motorista);
    }

    public function destroy($id)
    {
        $motorista = Motorista::find($id);

        if (!$motorista) {
            return response()->json(['error' => 'Motorista não encontrado'], 404);
        }

        $motorista->delete();

        return response()->json(['success' => true]);
    }
}
