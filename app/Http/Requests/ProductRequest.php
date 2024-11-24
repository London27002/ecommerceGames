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
        return [
      
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'genre' => ['required', 'string', 'max:255'],
            'platform' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'stock' => ['required', 'integer'],
            'image' => ['nullable', 'string'],
            'category_id' => ['required', 'integer']
        ];
  
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
            'image.string' => 'El campo imagen debe ser un texto',
            'category_id.required' => 'El campo categoría es obligatorio',
            'category_id.integer' => 'El campo categoría debe ser un número entero'
        ];
    }
}
