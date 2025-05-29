<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profissional extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'cpf',
        'matricula',
        'celular',
        'codigo',
        'user_id',
        'status'
    ];

    public function motorista()
    {
        return $this->hasOne(Motorista::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
