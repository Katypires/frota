<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Veiculo extends Model
{
    use HasFactory;

    protected $fillable = ['nome', 'placa', 'marca', 'modelo', 'status'];

    public function vistorias() {
        return $this->hasMany(Vistoria::class);
    }

    public function manutencoes() {
        return $this->hasMany(Manutencao::class);
    }

    public function abastecimentos() {
        return $this->hasMany(Abastecimento::class);
    }

    public function trocasDeOleo() {
        return $this->hasMany(TrocaOleo::class);
    }

    public function viagens() {
        return $this->hasMany(Viagem::class);
    }

    public function unidades() {
        return $this->belongsToMany(Unidade::class, 'unidade_veiculo');
    }
}
