<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    function getBrand()
    {
        return $this->hasOne("App/Models/Brands", "id", "brand");
    }
}
