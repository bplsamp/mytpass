<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Subscription;
use Illuminate\Support\Carbon;
use App\Helpers\Help;
use Illuminate\Support\Facades\Auth;
use App\Models\Receipt;
use Throwable;


class PaymentController extends Controller
{  
    public function __construct()
    {
        $this->middleware('auth:api');
    
    }

    public function getMaxEmployee(string $type) : int {
        switch($type) {
            case "basic":
                return 30;
            case "premium":
                return 100;
            case "platinum":
                return 1000;
            default:
                return 30;
        }
    }

    public function isNewSubscription(string $type1, string $type2) {
        if($type1 == $type2) {
            return false;
        } else {
            return true;
        }
    }

    public function upgrade(Request $req) {
        try{
            $user = Auth::user();
            $sub = Subscription::where('companyId', '=', $user->companyId)->first();
            $expiry = Carbon::now()->addDays(30);

            if(!is_null($sub->expiryDate)) {
                if($this->isNewSubscription($sub->type, $req->type)) {
                    $expiry = Carbon::now()->addDays(30);
                } else {
                    $expiry = Carbon::parse($sub->expiryDate)->addDays(30);
                }
            }

            $subscription = Subscription::where('companyId', '=', $user->companyId)->update(['type' => $req->type, 'expiryDate' => $expiry, 'startDate' => Carbon::now(), 'maxEmployee' => $this->getMaxEmployee($req->type)]);
         
            Receipt::create([
                'userId' => $user->id,
                'companyId' => $user->companyId,
                'subscriptionId' => $sub->id
             
            ]);

            return response()->json(['message', 'Successfully upgraded business']);
        } catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    

    }


    public function updateSubscription(Request $req) {
        
    }
}
