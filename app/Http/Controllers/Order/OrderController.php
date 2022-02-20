<?php

namespace App\Http\Controllers\Order;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = DB::table('orders')
                ->join('clients', 'clients.id', '=', 'orders.client_id')
                ->join('products', 'products.id', '=', 'orders.product_id')
                ->join('brands', 'brands.id', '=', 'orders.brand_id')
                ->get(['clients.client_name', 'orders.id', 'orders.sale_progression', 'products.product_name', 'brands.brand_name', 'products.price', 'orders.discount', 'orders.amount', 'orders.confirm', 'orders.updated_at' ]);

        return response()->json($orders, 200);
    }
}
