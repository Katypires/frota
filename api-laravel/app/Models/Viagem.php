<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Viagem extends Model
{
    use HasFactory;

    protected $table = 'viagems';

    protected $fillable = [
        'veiculo_id', 'motorista_id', 'data_viagem', 'nivel_combustivel', 'nota', 'status'
    ];

    public function motorista() {
        return $this->belongsTo(Motorista::class);
    }

    public function veiculo() {
        return $this->belongsTo(Veiculo::class);
    }
}
