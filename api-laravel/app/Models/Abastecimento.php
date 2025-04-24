<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Abastecimento extends Model
{
    use HasFactory;

    protected $fillable = ['veiculo_id', 'motorista_id', 'data_abastecimento', 'km', 'litros', 'tipo', 'status'];

    public function motorista() {
        return $this->belongsTo(Motorista::class);
    }

    public function veiculo() {
        return $this->belongsTo(Veiculo::class);
    }
}
