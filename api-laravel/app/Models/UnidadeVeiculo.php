<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnidadeVeiculo extends Model
{
    use HasFactory;

    protected $table = 'unidade_veiculos';

    protected $fillable = ['unidade_id', 'veiculo_id', 'status'];

    public function unidade() {
        return $this->belongsTo(Unidade::class);
    }

    public function veiculo() {
        return $this->belongsTo(Veiculo::class);
    }
}
