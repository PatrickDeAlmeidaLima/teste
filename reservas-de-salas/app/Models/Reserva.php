<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    protected $fillable = [
        'sala',
        'inicio_reserva',
        'fim_reserva',
        'responsavel',
        'ativo'
    ];


    public $timestamps = true;
}
