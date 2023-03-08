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
use Illuminate\Validation\Rule;
use App\Models\Subscription;

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

            //validate inputs
            try {
                $validator = (object)$request->validate([
                    'firstName' => 'required|string|max:50',
                    'lastName' => 'required|string|max:50',
                    'middleInitial' => 'string|max:5',
                    'contact' => [
                        'required',
                        'numeric',
                        'digits_between:10,15',
                        Rule::unique('users')->ignore($obj->id)
                    ]
                ]);
            } catch (Throwable $e) {
                error_log($e->getMessage());
                return response()->json(['message' => "Unexpected server error cause: ". $e->getMessage()] , 200);
            }

            $avatar = $request->file('avatar');
            $path = '';
            if($avatar) {
                $filename = "users/".$obj->id."/avatar"."/".$avatar->getClientOriginalName();
                $path = Storage::disk('s3')->put($filename, file_get_contents($avatar),'public');
                //error_log(strval('path'.$path));
                $path = Storage::url($filename);
            }

            $user = User::findOrFail($obj->id);
            if($user) {
                //$user->email = $request->password;
                if ($request->bio == null) {
                    $user->bio = '';
                } else {
                    $user->bio = $request->bio;
                }
                $user->lastName = $request->lastName;
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

                //our subscription model
                $subscription = Subscription::where('companyId', '=', $notif->companyId)->first();
                $max = $subscription->maxEmployee;
                error_log($max);

                //get our company
                $companyCount = Company::findOrFail($notif->companyId);

                //check number of employees in company
                //if this goes thru, the invitation will not push through,
                //and the notification will be deleted.
                if($companyCount->users->count() + 1 > $max) {
                    Notification::where('companyId', '=', $notif->companyId)->where('userId', '=', $user->id)->delete();
                    return response()->json([
                        'message' => 'The company is already full.', 
                        'status' => "failed", 
                        400]);
                }

                //accepts invitation and deletes all company invite notification
                if ($user->companyId == null) {
                    $user->companyId = $notif->companyId;
                    $user->isSearchable = false;
                    $user->save();
                    Notification::where('companyId', '!=', null)
                    ->where('userId', '=', $user->id)
                    ->where('trainingId', '=', null)
                    ->delete();
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
