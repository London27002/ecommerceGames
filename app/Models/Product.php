<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_product';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'genre',
        'platform',
        'price',
        'stock',
        'image',
        'category_id',
    ];

    public function category() : BelongsTo
    {
        return $this->belongsTo(
            Categorie::class,
            'category_id',
            'id_categorie'
        );
    }
}
