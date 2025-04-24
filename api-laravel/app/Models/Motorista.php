<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Motorista extends Model
{
    use HasFactory;

    protected $fillable = ['nome', 'cpf', 'matricula', 'status'];

    public function vistorias() {
        return $this->hasMany(Vistoria::class);
    }

    public function abastecimentos() {
        return $this->hasMany(Abastecimento::class);
    }

    public function manutencoes() {
        return $this->hasMany(Manutencao::class);
    }

    public function viagens() {
        return $this->hasMany(Viagem::class);
    }
}
