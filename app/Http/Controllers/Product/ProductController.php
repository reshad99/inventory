<?php

namespace App\Http\Controllers\Product;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = DB::table("products")->join("brands", "brands.id", "=", "products.brand_id")->get();

        return response()->json($products, 200);
    }
}
