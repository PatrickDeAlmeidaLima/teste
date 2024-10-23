<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reserva;

class ReservaController extends Controller
{
    // Retorna todas as reservas
    public function index()
    {
        return Reserva::all();
    }

    // Cria uma nova reserva
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'sala' => 'required',
            'inicio_reserva' => 'required|date|after:now',
            'fim_reserva' => 'required|date|after:inicio_reserva',
            'responsavel' => 'required'
        ]);

        // Verificar se já existe uma reserva no mesmo horário
        $reservasConflitantes = Reserva::where('sala', $request->sala)
            ->where(function ($query) use ($request) {
                $query->whereBetween('inicio_reserva', [$request->inicio_reserva, $request->fim_reserva])
                    ->orWhereBetween('fim_reserva', [$request->inicio_reserva, $request->fim_reserva]);
            })
            ->exists();

        if ($reservasConflitantes) {
            return response()->json(['error' => 'A sala já está reservada nesse horário.'], 400);
        }

        // Criar a nova reserva
        $reserva = Reserva::create($validatedData);

        return response()->json($reserva, 201);
    }


    // Exibe uma reserva específica
    public function show($id)
    {
        return Reserva::find($id);
    }

    // Atualiza uma reserva
    public function update(Request $request, $id)
    {
        $reserva = Reserva::find($id);
        $reserva->update($request->all());
        return $reserva;
    }

    // Remove uma reserva
    public function destroy($id)
    {
        return Reserva::destroy($id);
    }

    //desativa reserva
    public function desativar($id)
    {
        $reserva = Reserva::find($id);
        if (!$reserva) {
            return response()->json(['error' => 'Reserva não encontrada.'], 404);
        }

        $reserva->ativo = false; // Marcar como inativa
        $reserva->save();

        return response()->json(['message' => 'Reserva desativada com sucesso.'], 200);
    }
}
