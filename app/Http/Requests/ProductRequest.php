<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'slug' => 'required|string|max:255|unique:categories,slug,' . $this->route('slug') . ',slug', // Excluye el slug actual durante la actualización
            'description' => ['required', 'string'],
            'genre' => ['required', 'string', 'max:255'],
            'platform' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'stock' => ['required', 'integer'],
            'category_slug' =>['required', 'string', 'max:255'],
        ];
    
        // Solo aplicar la regla de imagen si se está subiendo una nueva imagen
        if ($this->hasFile('image')) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg,gif,svg|max:2048';
        }
    
        return $rules;
    }
    
    public function messages(): array
    {
        return[
            'title.required' => 'El campo título es obligatorio',
            'title.string' => 'El campo título debe ser un texto',
            'title.max' => 'El campo título no debe superar los 255 caracteres',
            'slug.required' => 'El campo slug es obligatorio',
            'slug.string' => 'El campo slug debe ser un texto',
            'slug.max' => 'El campo slug no debe superar los 255 caracteres',
            'description.required' => 'El campo descripción es obligatorio',
            'description.string' => 'El campo descripción debe ser un texto',
            'genre.required' => 'El campo género es obligatorio',
            'genre.string' => 'El campo género debe ser un texto',
            'genre.max' => 'El campo género no debe superar los 255 caracteres',
            'platform.required' => 'El campo plataforma es obligatorio',
            'platform.string' => 'El campo plataforma debe ser un texto',
            'platform.max' => 'El campo plataforma no debe superar los 255 caracteres',
            'price.required' => 'El campo precio es obligatorio',
            'price.numeric' => 'El campo precio debe ser un número',
            'stock.required' => 'El campo inventario es obligatorio',
            'stock.integer' => 'El campo inventario debe ser un número entero',
            'image.image' => 'El campo imagen debe ser un archivo de imagen válido', 
            'image.mimes' => 'El campo imagen debe ser de tipo: jpg, jpeg, png, gif',
            'category_slug.required' => 'El campo categoría es obligatorio',
        
        ];
    }
}
