<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{

    public function Index()
    {
        $categories = Category::all(["id", "name"]);
    

        return Inertia::render("Categories", ["categories" => $categories]);
    }

        /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      
        //dd($request->all());
        $attributes = $request->validate([
            'name' => ['required', 'max:255', 'min:3', 'string'],
        ]);

        Category::updateOrCreate(
            ['id' => $request->id],
            $attributes
        );

        return back();
    }
     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Category::find($id)->delete();

        return back();
    }
}
