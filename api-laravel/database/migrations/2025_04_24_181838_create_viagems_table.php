<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('viagems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('veiculo_id')->constrained()->onDelete('cascade');
            $table->foreignId('motorista_id')->constrained()->onDelete('cascade');
            $table->date('data_viagem');
            $table->dateTime('data_saida');
            $table->integer('km_saida');
            $table->string('local_saida');
            $table->string('local_destino');
            $table->dateTime('hora_chegada');
            $table->integer('km_chegada');
            $table->integer('km_total');
            $table->text('nota')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('viagems');
    }
};
