<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViagemDestino extends Model
{
    use HasFactory;

    protected $fillable = [
        'viagem_id',
        'data_saida',
        'data_chegada',
        'km_saida',
        'km_chegada',
        'km_total',
        'local_saida',
        'local_destino',
        'nota',
        'latitude_saida',
        'longitude_saida',
        'latitude_chegada',
        'longitude_chegada',
        'status'
    ];

    public function viagem()
    {
        return $this->belongsTo(Viagem::class);
    }
}
