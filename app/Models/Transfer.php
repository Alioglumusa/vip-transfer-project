<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;

    protected $fillable = [
        'passenger_id',
        'car_id',
        'start_location',
        'end_location',
        'date',
        'time',
    ];

    public function passenger()
    {
        return $this->belongsTo(Passenger::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
