<?php

namespace App\Models;

use App\Models\NewsItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function newsItems()
    {
        return $this->hasMany(NewsItem::class);
    }
}
