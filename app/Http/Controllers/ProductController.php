<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Categorie;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        // Cargar los productos con la relación de categorías
        $products = Product::with('category')->get();
        return inertia('Products/Index', ['products' => $products]);
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(ProductRequest $request)
    {
        // Verificar si la imagen fue cargada y es válida
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            // Almacenar la imagen en el disco 'public' y obtener su ruta
            $imagePath = $request->file('image')->store('images', 'public');
        } else {
            // Si la imagen no es válida o no se ha cargado, asignar un valor por defecto o manejar el error
            $imagePath = null;
        }
    
        // Crear el producto con los datos validados y la imagen almacenada
        $product = new Product($request->all());
        $product->image = $imagePath; // Guardar la ruta de la imagen en la base de datos
        $product->save();
    
        return response()->json($product, 201);
    }
    


    /**
     * Display the specified product.
     */
    public function show(Product $product)
    {
        return $product->load('category');
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
    {
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $imagePath = $request->file('image')->store('images', 'public');
            $product->update(['image' => $imagePath]);
        }

        $product->update($request->except(['image']));

        return response()->json($product, 200);
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        // Eliminar la imagen del almacenamiento si existe
        if ($product->image && Storage::exists('public/' . $product->image)) {
            Storage::delete('public/' . $product->image);
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted'], 200);
    }
}
