<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia; 
use Illuminate\Support\Facades\Mail;
use App\Mail\StoreProductNotification;
use App\Models\Categorie;

class ProductVisualController extends Controller
{

    public function indexByCategory($slug)
    {
        $category = Categorie::where('slug', $slug)->firstOrFail();
        $products = Product::where('category_slug', $category->slug)->get();

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
        $categories = Categorie::all(['name', 'slug']); // Fetch only name and slug

        return Inertia::render('Products/Create', [
            'categories' => $categories,
        ]);
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

    // Obtener el id de la categoría a partir del slug
    $category = Categorie::where('slug', $request->category_slug)->firstOrFail();

    // Crear el producto con los datos validados y la imagen almacenada
    $product = Product::create([
        'title' => $request->title,
        'slug' => $request->slug,
        'description' => $request->description,
        'genre' => $request->genre,
        'platform' => $request->platform,
        'price' => $request->price,
        'stock' => $request->stock,
        'category_slug' => $category->slug, // Usar category_slug
        'category_id' => $category->id, // Usar category_id también si lo necesitas
        'image' => $imagePath, // Guardar la ruta de la imagen en la base de datos
    ]);

    // Enviar el correo si es necesario
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
    public function edit($slug)
    {
        $product = Product::where('slug', $slug)->with('category')->firstOrFail();
        $categories = Categorie::all([ 'name', 'slug']);

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $slug)
    {
        $product = Product::where('slug', $slug)->firstOrFail();

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

        // Actualizar la categoría si se proporciona
        if (isset($data['category_slug'])) {
            $category = Categorie::where('slug', $data['category_slug'])->first();
            if ($category) {
                $data['category_slug'] = $category->slug;
            }
        }

        $product->update($data);

        return redirect()->route('products.index')->with('success', 'Product updated successfully!');
    }
    
    /**
     * Remove the specified resource from storage.
     */
   /**
 * Remove the specified resource from storage.
 */
public function destroy(string $slug)
    {
        // Encontrar el producto por slug
        $product = Product::where('slug', $slug)->firstOrFail();

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
