<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transfer;

class TransferController extends Controller
{
    public function index()
    {
        $transfers = Transfer::with(['passenger', 'car'])->get();
        return response()->json(['transfers' => $transfers], 200); // HTTP 200 - OK
    }

    public function store(Request $request)
    {
        $request->validate([
            'passenger_id' => 'required|exists:passengers,id',
            'car_id' => 'required|exists:cars,id',
            'start_location' => 'required',
            'end_location' => 'required',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        $transfer = Transfer::create($request->all());

        return response()->json([
            'message' => 'Transfer Created Successfully!',
            'transfer' => $transfer,
        ], 201); // HTTP 201 - Created
    }

    public function show(Transfer $transfer)
    {
        return response()->json(['transfer' => $transfer], 200); // HTTP 200 - OK
    }

    public function update(Request $request, Transfer $transfer)
    {
        $request->validate([
            'passenger_id' => 'required|exists:passengers,id',
            'car_id' => 'required|exists:cars,id',
            'start_location' => 'required',
            'end_location' => 'required',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
        ]);

        $transfer->fill($request->all())->save();

        return response()->json([
            'message' => 'Transfer Updated Successfully!',
            'transfer' => $transfer,
        ], 200); // HTTP 200 - OK
    }

    public function destroy(Transfer $transfer)
    {
        $transfer->delete();

        return response()->json(['message' => 'Transfer Deleted Successfully!'], 200); // HTTP 200 - OK
    }
}
