<?php

namespace Database\Factories;

use App\Models\Categorie;
use Illuminate\Database\Eloquent\Factories\Factory;

class CategorieFactory extends Factory
{
    /**
     * El nombre del modelo que esta fábrica está generando.
     *
     * @var string
     */
    protected $model = Categorie::class;

    /**
     * Definir el estado predeterminado de la fábrica.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word, // Genera una palabra aleatoria para el nombre
            'slug' => $this->faker->slug, // Genera un slug único
            'description' => $this->faker->paragraph, // Genera una descripción aleatoria
            'priority' => $this->faker->numberBetween(1, 5), // Genera un número aleatorio entre 1 y 5
        ];
    }
}
