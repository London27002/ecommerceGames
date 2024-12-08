<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Categorie;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Http\Request; 

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        // Cargar productos con la relación de categorías
        $products = Product::with('category')->get();
        
        return response()->json($products);
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
    public function show($slug)
    {
        // Buscar el producto por su slug
        $product = Product::where('slug', $slug)->first();
    
        if (!$product) {
            // Si no se encuentra el producto, devolver un error
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    
        // Devolver el producto encontrado con su categoría
        return response()->json($product->load('category'), 200);
    }
    
    

    /**
     * Update the specified product in storage.
     */
    public function update(ProductRequest $request, $slug)
    {
        // Buscar el producto por slug
        $product = Product::where('slug', $slug)->firstOrFail();
    
        // Verificar si hay una nueva imagen y actualizarla si es necesario
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            // Almacenar la nueva imagen y obtener su ruta
            $imagePath = $request->file('image')->store('images', 'public');
            $product->image = $imagePath; // Actualizar la imagen del producto
        }
    
        // Verificar la categoría y asignar el id correspondiente
        if ($request->has('category_slug')) {
            $category = Categorie::where('slug', $request->category_slug)->first();
            if ($category) {
                $product->category_id = $category->id;
            }
        }
    
        // Actualizar los datos del producto con la información validada
        $product->fill($request->validated()); // Esto llena solo los campos validados
    
        // Guardar el producto actualizado
        $product->save();
    
        return response()->json($product, 200); // Devuelve el producto actualizado
    }
    
    /**
     * Remove the specified product from storage.
     */
    public function destroy($slug)
{
    // Buscar el producto por su slug
    $product = Product::where('slug', $slug)->first();

    if (!$product) {
        // Si no se encuentra el producto, devolver un error
        return response()->json(['message' => 'Producto no encontrado'], 404);
    }

    // Eliminar la imagen del almacenamiento si existe
    if ($product->image && Storage::exists('public/' . $product->image)) {
        Storage::delete('public/' . $product->image);
    }

    // Eliminar el producto
    $product->delete();

    // Devolver una respuesta exitosa
    return response()->json(['message' => 'Producto eliminado correctamente'], 200);
}

}
