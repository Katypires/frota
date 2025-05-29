<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Motorista extends Model
{
    use HasFactory;

    protected $fillable = [
        'profissional_id',
        'cnh',
        'validade',
        'categoria',
        'user_id',
        'status'
    ];

    protected $casts = [
        'categoria' => 'array',
        'validade' => 'date',
        'status' => 'boolean',
    ];

    public function profissional()
    {
        return $this->belongsTo(Profissional::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vistorias()
    {
        return $this->hasMany(Vistoria::class);
    }

    public function abastecimentos()
    {
        return $this->hasMany(Abastecimento::class);
    }

    public function manutencoes()
    {
        return $this->hasMany(Manutencao::class);
    }

    public function viagens()
    {
        return $this->hasMany(Viagem::class);
    }
}
