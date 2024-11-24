<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Categorie>
 */
class CategorieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
            'name' => $this->faker->words(5, true),
            'description' => $this->faker->sentence(10),
            'priority' => $this->faker->numberBetween(1, 5), // Prioridad entre 1 y 5
        ];
    }
}
