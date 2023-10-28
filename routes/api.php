    <?php

    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\ProductController;
    use App\Http\Controllers\PassengerController;
    use App\Http\Controllers\CarController;
    use App\Http\Controllers\TransferController;


    /*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | is assigned the "api" middleware group. Enjoy building your API!
    |
    */

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    Route::resource('products',ProductController::class);
    Route::resource('passengers', PassengerController::class);
    Route::resource('cars', CarController::class);
    Route::resource('transfers', TransferController::class);



