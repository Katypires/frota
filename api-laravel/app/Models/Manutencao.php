<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manutencao extends Model
{
    use HasFactory;

    protected $fillable = ['veiculo_id', 'motorista_id', 'data', 'km', 'tipo_ocorrencia', 'status'];

    public function motorista() {
        return $this->belongsTo(Motorista::class);
    }

    public function veiculo() {
        return $this->belongsTo(Veiculo::class);
    }
}
