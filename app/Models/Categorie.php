<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categorie extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_categorie';

    protected $fillable = [
        'name',
        'description',
        'priority',
    ];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class,
            'category_id',
            'id_categorie'
        );
    }
}
