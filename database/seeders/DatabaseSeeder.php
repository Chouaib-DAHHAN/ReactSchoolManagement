<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Teacher;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'chouaib',
            'email' => 'chouaibdahhan@gmail.com',
              'password' => 'azerty2003',
        ]);

        Admin::factory()->create([
            'firstname' => 'admin',
            'lastname' => 'admin',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => '0612345678',
            'email' => 'admin@admin.admin',
            'password' => '$2y$12$eOOHMVbDqKi2vEpjAvASqeAXXQVf5ItmeOATEREDpfDksFcdqb.YK',
        ]);

        Teacher::factory()->create([
            'firstname' => 'teacher',
            'lastname' => 'teacher',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => '0698765432',
            'email' => 'teacher@teacher.teacher',
            'password' => '$2y$12$eOOHMVbDqKi2vEpjAvASqeAXXQVf5ItmeOATEREDpfDksFcdqb.YK',
        ]);
    }
}
