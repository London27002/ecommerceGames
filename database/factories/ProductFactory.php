<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
            'title' => $this->faker->words(5, true),
            'slug' => $this->faker->words(5, true),
            'description' => $this->faker->sentence(10),
            'genre' => $this->faker->words(5, true),
            'platform' => $this->faker->words(5, true),
            'price' => $this->faker->randomFloat(2, 0, 999),
            'stock' => $this->faker->numberBetween(1, 100),
            'image' => $this->faker->imageUrl(),
            'category_id' => $this->faker->numberBetween(1, 5),

        ];
    }
}
