<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Viagem extends Model
{
    use HasFactory;

    protected $fillable = [
        'veiculo_id', 'motorista_id', 'data_viagem', 'data_saida', 'km_saida',
        'local_saida', 'local_destino', 'hora_chegada', 'km_chegada', 'km_total', 'nota'
    ];

    public function motorista() {
        return $this->belongsTo(Motorista::class);
    }

    public function veiculo() {
        return $this->belongsTo(Veiculo::class);
    }
}
