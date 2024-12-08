<?php

namespace App\Http\Controllers;


use App\Models\Categorie;
use App\Http\Requests\StoreCategorieRequest;
use App\Http\Requests\UpdateCategorieRequest;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Categorie::all();
    }

    /**


    
     * Store a newly created resource in storage.
     */
    public function store(StoreCategorieRequest $request)
    {
        $categorie = new Categorie($request->all());
        $categorie->save();
        return response()->json($categorie, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
{
    // Buscar la categoría por slug
    $categorie = Categorie::where('slug', $slug)->firstOrFail();
    return $categorie;
}

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategorieRequest $request, $slug)
    {
        $categorie = Categorie::where('slug', $slug)->firstOrFail();
        
        // Actualiza los campos de la categoría
        $categorie->update($request->validated());

        return response()->json($categorie);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($slug)
    {
        // Buscar la categoría por slug
        $categorie = Categorie::where('slug', $slug)->first();
    
        if (!$categorie) {
            // Si no se encuentra la categoría, devolver un error
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    
        // Eliminar productos asociados a la categoría
        $categorie->products()->delete();
    
        // Eliminar la categoría
        $categorie->delete();
    
        // Devolver respuesta exitosa
        return response()->json(['message' => 'Categoría y productos eliminados correctamente'], 200);
    }
    
}
