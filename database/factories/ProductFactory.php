<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * El nombre del modelo que esta fábrica está generando.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Definir el estado predeterminado de la fábrica.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->word, // Genera un título aleatorio
            'slug' => $this->faker->slug, // Genera un slug único
            'description' => $this->faker->paragraph, // Genera una descripción aleatoria
            'genre' => $this->faker->word, // Genera un género aleatorio
            'platform' => $this->faker->word, // Genera una plataforma aleatoria
            'price' => $this->faker->randomFloat(2, 10, 100), // Genera un precio aleatorio entre 10 y 100
            'stock' => $this->faker->numberBetween(1, 100), // Genera un número aleatorio de unidades en stock
            'image' => $this->faker->imageUrl(), // Genera una URL de imagen aleatoria
            'category_slug' => Categorie::factory()->create()->slug, // Asocia un category_slug de una categoría creada aleatoriamente
        ];
    }
}
