<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    public function index()
    {
        return Car::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'car_name' => 'required',
            'driver_name' => 'required',
            'plate_number' => 'required',
            'brand' => 'required',
            'model' => 'required',
        ]);

        $car = Car::create($request->all());

        return response()->json([
            'message' => 'Car Created Successfully!',
            'car' => $car,
        ]);
    }

    public function show(Car $car)
    {
        return response()->json(['car' => $car]);
    }

    public function update(Request $request, Car $car)
    {
        $request->validate([
            'car_name' => 'required',
            'driver_name' => 'required',
            'plate_number' => 'required',
            'brand' => 'required',
            'model' => 'required',
        ]);

        $car->fill($request->all())->save();

        return response()->json([
            'message' => 'Car Updated Successfully!',
            'car' => $car,
        ]);
    }

    public function destroy(Car $car)
    {
        $car->delete();

        return response()->json(['message' => 'Car Deleted Successfully!']);
    }
}
