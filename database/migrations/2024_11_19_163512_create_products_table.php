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
        Schema::create('products', function (Blueprint $table) {
            $table->id('id_product');
            $table->string('title'); // Título del videojuego
            $table->string('slug')->unique(); // URL amigable
            $table->text('description'); // Descripción
            $table->string('genre'); // Género del videojuego
            $table->string('platform'); // Plataforma
            $table->decimal('price', 10, 2); // Precio
            $table->integer('stock'); // Inventario
            $table->string('image')->nullable(); // URL de la imagen
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id_categorie')->on('categories')->onDelete('cascade');
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
