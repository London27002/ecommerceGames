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
public function show(string $id_category)
{
    $category = Categorie::findOrFail($id_category);
    $products = $category->products; // Obtén los productos asociados a esta categoría

    return Inertia::render('Categories/Show', [
        'category' => $category,
        'products' => $products, // Pasa los productos a la vista
    ]);
}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
            $categorie = Categorie::find($id);
            return Inertia::render('Categories/Edit', [
                'category' => $categorie
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieRequest $request, string $id)
    {
        $categorie = Categorie::findOrFail($id);

        // Actualizar la categoría con datos validados
        $categorie->update($request->validated());

        return redirect()->route('categories.index')->with('success', 'Category updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //Eliminar la categoria
        Categorie::destroy($id);
        return redirect()->route('categories.index');
        
    }
}
