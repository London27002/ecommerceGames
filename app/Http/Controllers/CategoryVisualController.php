<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;
use App\Models\Categorie;
use Inertia\Inertia; 
use Illuminate\Http\Request;


class CategoryVisualController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('Categories/Index', [
            'categories' => Categorie::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store( StoreCategorieRequest $request)
    {
        $categorie = Categorie::create($request->all());
        return redirect()->route('categories.index');
    }

    /**
     * Display the specified resource.
     */
  // Controller: CategoryVisualController
  public function show(string $slug)
  {
      $category = Categorie::where('slug', $slug)->firstOrFail();
      $products = $category->products; // Obtén los productos asociados a esta categoría

      return Inertia::render('Categories/Show', [
          'category' => $category,
          'products' => $products,
      ]);
  }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $slug)
    {
        $categorie = Categorie::where('slug', $slug)->firstOrFail(); // Buscar por slug
        return Inertia::render('Categories/Edit', [
            'category' => $categorie
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieRequest $request, string $slug)
    {
        $categorie = Categorie::where('slug', $slug)->firstOrFail();

        // Actualizar la categoría con los datos validados
        $categorie->update($request->validated());

        return redirect()->route('categories.index')->with('success', 'Category updated successfully!');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        // Eliminar la categoría por slug
        Categorie::where('slug', $slug)->firstOrFail()->delete();
        return redirect()->route('categories.index');
    }
}
