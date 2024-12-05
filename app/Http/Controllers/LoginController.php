<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth; // Asegúrate de importar esta línea
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Response;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        // Intentar autenticar al usuario con los datos proporcionados
        if (Auth::attempt($request->only(['email', 'password']))) {
            $user = $request->user();

            return response()->json([
                'token' => $user->createToken('API Token')->plainTextToken,
                'user' => $user,
                'message' => 'Login successful',
                'status' => true,
            ]);
        }

        // Respuesta en caso de error de autenticación
        return response()->json([
            'message' => 'Invalid credentials',
            'status' => false,
        ], Response::HTTP_UNAUTHORIZED);
    }
}
