<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{

    public function index(Request $request)
    {

        return Inertia::render('Categories', [

            'categories' => Category::all(['id', 'name']),
        ]);
    }
}
