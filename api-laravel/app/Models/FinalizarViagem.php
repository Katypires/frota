<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinalizarViagem extends Model
{
    use HasFactory;

    protected $table = 'finalizar_viagems';

    protected $fillable = [
        'veiculo_id', 'motorista_id', 'hora_chegada', 'local_chegada', 'km_chegada', 
        'km_total', 'nivel_combustivel', 'nota', 'status'
    ];

    public function motorista() {
        return $this->belongsTo(Motorista::class);
    }

    public function veiculo() {
        return $this->belongsTo(Veiculo::class);
    }
}
