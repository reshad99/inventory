<?php

namespace App\Http\Controllers\Brand;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\Brand;
use File;
use Maatwebsite\Excel\Concerns\ToArray;

class BrandController extends Controller
{
    public function index()
    {
        $brands = DB::table("brands")->orderByDesc("id")->paginate(5);
        return response()->json($brands, 200);
    }

    public function store(Request $request)
    {
        $rules = [
            'name' => 'required|min:2',
            'photo' => 'image|mimes:png,jpg,jpeg|max:4096'
        ];
        if(!$request->id)
        {
            $rules['photo'] = 'required';
        }
        $name = $request->input("name");
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) 
        {
            return response()->json(['status' => 0, 'errors' => $validator->errors()]);
        }

        if ($files = $request->file('photo')) 
        {

            //delete old file
            \File::delete('public/images/brands'.$request->hidden_image);
 
            //insert new file
            $destinationPath = 'public/images/brands'; // upload path
            $profileImage = 'public/images/brands/'.date('YmdHis') . "." . $files->getClientOriginalExtension();
            $files->move($destinationPath, $profileImage);
         }
         else 
         {
             $profileImage = $request->input('hidden_image');    
         }

        DB::table("brands")->upsert(['id' => $request->id, 'brand_name' => $name, 'brand_image' => $profileImage], ['id'], ['brand_name', 'brand_image']);
        return response()->json(["message" => "Brand has been added"], 200);
    }

    public function indexById($id)
    {
        $check = DB::table('brands')->where('id', '=', $id)->first();
        if ($check) 
        {
            return response()->json($check, 200);
        }
        return response()->json(["message" => "This record has not found"], 404);
    }

    public function destroy($id)
    {
            DB::table('brands')->where('id', $id)->delete();
    }

    public function search(Request $request){
        $value = $request->input("value");
        $brands = DB::table('brands')->where('brand_name', 'like', ''.$value.'%')->paginate(5);
        return response()->json($brands, 200);
    }

    public function order(Request $request)
    {
        $order  = $request->input("order");
        $column = $request->input("column");
        $search = $request->input("search");
        if(!isset($search))
        $brands = DB::table('brands')->orderBy($column, $order)->paginate(5);
        else
        $brands = DB::table('brands')->where('brand_name', 'like', ''.$search.'%')->orderBy($column, $order)->paginate(5);
        return response()->json($brands, 200);
    }
}
