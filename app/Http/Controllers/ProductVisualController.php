<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia; 
use Illuminate\Support\Facades\Mail;
use App\Mail\StoreProductNotification;

class ProductVisualController extends Controller
{

    public function indexByCategory($id_categorie)
    {
        $category = Categorie::findOrFail($id_categorie);
        $products = Product::where('category_id', $id_categorie)->get();

        return Inertia::render('Home', [
            'categories' => Categorie::all(),
            'products' => $products,
            'selectedCategory' => $category,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    /**
     * Display a listin g of the resource.
     */
    public function index()
    {
        return Inertia::render('Products/Index', [
            'products' => Product::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
{
    // Verificar si la imagen fue cargada y es válida
    $imagePath = null;
    if ($request->hasFile('image') && $request->file('image')->isValid()) {
        // Almacenar la imagen en el disco 'public' y obtener su ruta
        $imagePath = $request->file('image')->store('images', 'public');
    }

    // Crear el producto con los datos validados y la imagen almacenada
    $product = Product::create([
        'title' => $request->title,
        'slug' => $request->slug,
        'description' => $request->description,
        'genre' => $request->genre,
        'platform' => $request->platform,
        'price' => $request->price,
        'stock' => $request->stock,
        'category_id' => $request->category_id,
        'image' => $imagePath, // Guardar la ruta de la imagen en la base de datos
    ]);

    
    Mail::to($request->user())->send(new StoreProductNotification($product));

    // Redirigir a la lista de productos
    return redirect()->route('products.index');
}

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
{
    $product = Product::where('slug', $slug)->firstOrFail();
    
    return Inertia::render('Products/ProductShow', [
        'product' => $product->load('category')
    ]);
}
    
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id); // Buscar el producto por ID o devolver un error 404
    
        return Inertia::render('Products/Edit', [
            'product' => $product, // Pasar el producto a la vista de edición
        ]);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $id)
    {
        $product = Product::findOrFail($id);
        
        $data = $request->validated();
    
        // Si hay una nueva imagen, maneja la carga de la imagen
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            // Eliminar la imagen anterior si existe
            if ($product->image && \Storage::exists('public/' . $product->image)) {
                \Storage::delete('public/' . $product->image);
            }
    
            // Subir la nueva imagen
            $data['image'] = $request->file('image')->store('images', 'public');
        } else {
            // Si no hay nueva imagen, mantener la imagen existente
            unset($data['image']);
        }
    
        // Actualizar el producto con los datos validados
        $product->update($data);
    
        return redirect()->route('products.index')->with('success', 'Product updated successfully!');
    }
    
    
    
    /**
     * Remove the specified resource from storage.
     */
   /**
 * Remove the specified resource from storage.
 */
public function destroy($id)
{
    // Encontrar el producto por ID
    $product = Product::findOrFail($id);

    // Eliminar la imagen asociada si existe
    if ($product->image && \Storage::exists('public/' . $product->image)) {
        \Storage::delete('public/' . $product->image);
    }

    // Eliminar el producto de la base de datos
    $product->delete();

    // Redirigir con un mensaje de éxito
    return redirect()->route('products.index')->with('success', 'Product deleted successfully!');
}


}
