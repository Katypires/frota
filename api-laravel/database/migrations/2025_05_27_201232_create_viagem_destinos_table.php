<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('viagem_destinos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('viagem_id')->constrained('viagems');
            $table->dateTime('data_saida')->nullable();
            $table->dateTime('data_chegada')->nullable();
            $table->integer('km_saida')->nullable();
            $table->integer('km_chegada')->nullable();
            $table->integer('km_total')->nullable();
            $table->string('local_saida')->nullable();
            $table->string('local_destino')->nullable();
            $table->text('nota')->nullable();
            $table->decimal('latitude_saida', 10, 7)->nullable();
            $table->decimal('longitude_saida', 10, 7)->nullable();
            $table->decimal('latitude_chegada', 10, 7)->nullable();
            $table->decimal('longitude_chegada', 10, 7)->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('viagem_destinos');
    }
};
