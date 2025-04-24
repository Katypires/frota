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
        return response()->json(Motorista::select('id', 'nome', 'cpf', 'matricula', 'status')->get());
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required',
            'cpf' => 'required',
            'matricula' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Dados inválidos'], 400);
        }

        $motorista = Motorista::create($request->only(['nome', 'cpf', 'matricula', 'status']));
        return response()->json($motorista, 201);
    }

    public function show($id)
    {
        $motorista = Motorista::select('id', 'nome', 'cpf', 'matricula', 'status')->find($id);

        if (!$motorista) {
            return response()->json(['error' => 'Motorista não encontrado'], 404);
        }

        return response()->json($motorista);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required',
            'cpf' => 'required',
            'matricula' => 'required',
            'status' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Dados inválidos'], 400);
        }

        $motorista = Motorista::find($id);

        if (!$motorista) {
            return response()->json(['error' => 'Motorista não encontrado'], 404);
        }

        $motorista->update($request->only(['nome', 'cpf', 'matricula', 'status']));

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
