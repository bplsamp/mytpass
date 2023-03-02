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
use Illuminate\Filesystem\AwsS3V3Adapter;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Exception;

class EmployeeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function updateProfile(Request $request)
    {
        try {
            $obj = json_decode($request->input('user'));

            $avatar = $request->file('avatar');
            $path = '';
            if($avatar) {
                $filename = $obj->id."/avatar"."/".$avatar->getClientOriginalName();
                $path = Storage::disk('s3')->put($filename, file_get_contents($avatar),'public');
                error_log(strval('path'.$path));
                $path = Storage::url($filename);
            }

            $user = User::findOrFail($obj->id);
            if($user) {
                $user->email = $request->email;
                //$user->email = $request->password;
                if ($request->bio == null) {
                    $user->bio = '';
                } else {
                    $user->bio = $request->bio;
                }
                $user->expertise = $request->expertise;
                $user->specify = $request->specify;
                $user->firstName = $request->firstName;
                $user->middleInitial = $request->middleInitial;
                $user->contact = $request->contact;
                if ($request->isSearchable == 0 || $request->isSearchable == "false") {
                    $user->isSearchable = 0;
                } else {
                    $user->isSearchable = 1;
                }
                if($path) {
                    $user->avatar = $path;
                }
            }

            if ($user) {
                $user->save();
            }
           
            return response()->json(['message' => "Successfully updated profile"], 200);
        }
        catch(Throwable $e) {
            error_log($e->getMessage());
        }
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
                $user = User::findOrFail($notif->userId);
                if ($user->companyId == null) {
                    $user->companyId = $notif->companyId;
                    $user->isSearchable = false;
                    $user->save();
                    Notification::where('companyId', '=', $notif->companyId)->where('userId', '=', $user->id)->delete();
                    return response()->json([
                        'message' => "Successfully accepted company invitation.",
                        'status' => "success",
                    ], 200);
                } else {
                    Notification::where('companyId', '=', $notif->companyId)->where('userId', '=', $user->id)->delete();
                    return response()->json([
                        'message' => "User already part of a company.",
                        'status' => "failed",
                    ], 200);
                }
                
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
