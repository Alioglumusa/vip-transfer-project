<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passenger extends Model
{
    use HasFactory;

    protected $fillable = ['first_name', 'last_name', 'phone_number', 'passenger_type'];
    
    //yeni?
    public function Transfers()
{
    return $this->belongsToMany(Transfer::class, 'passenger_test_transfer');
}

}

?>