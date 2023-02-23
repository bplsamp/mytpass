<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use stdClass;
use Throwable;
use App\Models\Company;
use App\Models\User;
use Error;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;
use Illuminate\Support\Facades\DB;

class EmployeeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function updateProfile(Request $request)
    {

    }

    public function getNotif(Request $request)
    {
        try {
            $user = Auth::user();
            $notifs = Notification::where('userId', '=' ,$user->id)->with('from:id,firstName,lastName,avatar')->get();
          
            return response()->json($notifs, 200);
        }
            catch(Throwable $e) {
                error_log($e->getMessage());
        }
    }

    public function acceptCompany(Request $request)
    {
        try {
            $notif = Notification::findOrFail($request->id);
            error_log(strval($notif));

            if(isset($notif->companyId)) {
                error_log('pasok');
                $user = User::findOrFail($notif->userId);
                $user->companyId = $notif->companyId;
                $user->save();
                Notification::where('companyId', '=', $notif->companyId)->delete();
            }
        }
            catch(Throwable $e) {
                error_log($e->getMessage());
        }
    }

    public function rejectCompany(Request $request)
    {
        try {
            $notif = Notification::findOrFail($request->id);
            error_log(strval($notif));

            
            if(isset($notif->companyId)) {
                error_log('rejeccion');
                Notification::where('companyId', '=', $notif->companyId)->delete();
            }
        }
            catch(Throwable $e) {
                error_log($e->getMessage());
        }
    }

}
