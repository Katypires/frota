<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
   // public function __construct()
   // {
   //    $this->middleware("auth:api", ['except' => ['create', 'login']]);
   // }

   public function create(Request $request)
   {
      $array = ["error" => ""];

      $validator = Validator::make($request->all(), [
         'name' => 'required',
         'email' => 'required|email',
         'password' => 'required'
      ]);

      if (!$validator->fails()) {
         $name = $request->input("name");
         $email = $request->input("email");
         $password = $request->input("password");

         $emailExists = User::where("email", $email)->count();

         if ($emailExists === 0) {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $newUser = new User();

            $newUser->name = $name;
            $newUser->email = $email;
            $newUser->password = $hash;

            $newUser->save();

            $token = auth()->attempt([
               'email' => $email,
               'password' => $password,
            ]);

            if (!$token) {
               $array['error'] = "Ocorreu um erro";
               return $array;
            }

            $info = auth()->user();
            $array['data'] = [
               'user' => $info,
               'token' => $token
            ];
         } else {
            $array['error'] = "Email ja cadastrado";
            return $array;
         }
      } else {
         $array['error'] = "Dados incorretos";
         return $array;
      }

      return $array;
   }

   public function login(Request $request)
   {
      $array = ['error' => ''];

      $email = $request->input("email");
      $password = $request->input("password");

      $token = auth()->attempt([
         'email' => $email,
         "password" => $password,
      ]);

      if (!$token) {
         $array['error'] = "Usuario e/ou senha errado";
         return $array;
      }

      $info = auth()->user();
      $array['data'] = [
         'user' => $info,
         'token' => $token
      ];

      return $array;
   }

   public function logout()
   {
      try {
         auth()->logout();
         return response()->json(['success' => true]);
      } catch (\Exception $e) {
         return response()->json([
            'error' => 'Erro ao sair',
            'message' => $e->getMessage(),
         ], 500);
      }
   }

   public function register(Request $request)
   {
      $validated = $request->validate([
         'name' => 'required',
         'email' => 'required|email|unique:users',
         'password' => 'required|min:6',
      ]);

      $user = User::create([
         'name' => $validated['name'],
         'email' => $validated['email'],
         'password' => bcrypt($validated['password']),
      ]);

      $token = auth()->attempt([
         'email' => $validated['email'],
         'password' => $validated['password'],
      ]);

      return response()->json([
         'data' => [
            'user' => $user,
            'token' => $token,
         ]
      ]);
   }
}
