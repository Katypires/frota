<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'), // Lembre-se de usar bcrypt para a senha
        ]);

        // Inserir mais usuários, se necessário
        User::create([
            'name' => 'Another User',
            'email' => 'another@example.com',
            'password' => bcrypt('password123'),
        ]);
    }
}
