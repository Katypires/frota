<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrocaOleo extends Model
{
    use HasFactory;

    protected $fillable = ['veiculo_id', 'ultima_troca', 'km', 'proxima_troca', 'status'];

    public function veiculo() {
        return $this->belongsTo(Veiculo::class);
    }
}
