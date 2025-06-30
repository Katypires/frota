<?php

namespace App\Http\Controllers\ApiFrota;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Profissional;

class ProfissionalController extends Controller
{
    public function index()
    {
        return response()->json(
            Profissional::with('user')
                ->select('id', 'nome', 'cpf', 'matricula', 'celular', 'codigo', 'user_id', 'status')
                ->get()
        );
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required',
            'cpf' => 'required',
            'matricula' => 'required',
            'celular' => 'required',
            'codigo' => 'required',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Dados inválidos'], 400);
        }

        $profissional = Profissional::create($request->all());
        return response()->json($profissional, 201);
    }

    public function show($id)
    {
        $profissional = Profissional::find($id);

        if (!$profissional) {
            return response()->json(['error' => 'Profissional não encontrado'], 404);
        }

        return response()->json($profissional);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nome' => 'required',
            'cpf' => 'required',
            'matricula' => 'required',
            'celular' => 'required',
            'codigo' => 'required',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Dados inválidos'], 400);
        }

        $profissional = Profissional::find($id);

        if (!$profissional) {
            return response()->json(['error' => 'Profissional não encontrado'], 404);
        }

        $profissional->update($request->all());

        return response()->json($profissional);
    }

    public function destroy($id)
    {
        $profissional = Profissional::find($id);

        if (!$profissional) {
            return response()->json(['error' => 'Profissional não encontrado'], 404);
        }

        $profissional->delete();

        return response()->json(['success' => true]);
    }

    public function getByUserId($user_id)
    {
        $profissional = Profissional::where('user_id', $user_id)->first();

        if (!$profissional) {
            return response()->json(['message' => 'Profissional não encontrado'], 404);
        }

        return response()->json($profissional);
    }
}
