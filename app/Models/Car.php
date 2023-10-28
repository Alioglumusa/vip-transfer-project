<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = ['car_name', 'driver_name', 'plate_number', 'brand', 'model'];

    //yeni?
    public function Transfer()
{
    return $this->belongsToMany(Transfer::class, 'car_test_transfer');
}

}

?>