<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Category;
use App\Models\NewsItem;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{

    public function index(Request $request)
    {
        $search = $request->input('search');
        $categories = Category::query()->when($search, function ($query, $search) {
                return $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('id', 'like', '%' . $search . '%');
            })
            ->get(['id', 'name']);

        return Inertia::render('Categories', [
            'categories' => $categories
        ]);
    }


    public function create()
    {
        //
    }


    public function store(Request $request)
    {

        $attributes = $request->validate([
            'name' => ['required', 'max:255', 'min:3', 'string'],
        ]);
        Category::updateOrCreate(
            ['id' => $request->id],
            $attributes
        );

        return back();
    }

    public function show($id)
    {
        //
    }


    public function edit($id)
    {
        //
    }


    public function update(Request $request, $id)
    {
        //
    }


    public function destroy($id)
    {
        Category::find($id)->delete();

        return back();
    }
}
