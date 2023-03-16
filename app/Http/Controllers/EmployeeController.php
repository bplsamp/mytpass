<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use stdClass;
use Throwable;
use App\Models\Company;
use App\Models\User;
use App\Models\Training;
use Error;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;
use Illuminate\Filesystem\AwsS3V3Adapter;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Exception;
use Illuminate\Validation\Rule;
use App\Models\Subscription;
use App\Models\TrainingUser;

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
            $user = User::findOrFail($obj->id);

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

            //if avatar exist (attached), upload image to s3 and url to db
            $avatar = $request->file('avatar');
            $path = '';
            if($avatar) {
                $filename = "users/".$obj->id."/avatar"."/".$avatar->getClientOriginalName();
                $path = Storage::disk('s3')->put($filename, file_get_contents($avatar),'public');
                Storage::disk('s3')->delete(parse_url($user->avatar));
                //error_log(strval('path'.$path));
                $path = Storage::url($filename);
            }
 
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
            $notifs = Notification::where('userId', '=' ,$user->id)->where('trash', '!=', 1)->with('from:id,firstName,lastName,avatar')->get();
            
            return response()->json($notifs, 200);
        }
            catch(Throwable $e) {
                error_log($e->getMessage());
        }
    }

    public function getExpiringTraining(Request $request)
    {
        try {
            $user = Auth::user();
            $date = Carbon::now();
            //get all training where there is expiry
            $trainings = Training::where('expiryDate', '!=', null)->get();            

            $expiry_trainings = [];
            $array_trainings = [];

            //get all training (expiring) where user has this training
            foreach($trainings as $training) {
                $expiryTrainings = TrainingUser::where('trainingId', '=', $training->id)->where('userId', '=', $user->id)->get()->pluck('training')->where('expiryDate', '!=', null);
                array_push($expiry_trainings, $expiryTrainings);
            }

            //Filter and get only the training and not empty values from array
            $results = collect($expiry_trainings)
            ->filter()
            ->flatten()
            ->all();
            
            //check if user already has expiring notification
            // if not, make a notification
            foreach($results as $result) {
                $notif = Notification::where('trainingId', '=', $result->id)
                ->where('userId', '=', $user->id)
                ->where('content', 'like', '%EXPIR%')
                ->get();
                
                error_log("HAS NOTIF ALREADY ".$notif);

                if(count($notif)>0){
                    array_push($array_trainings, $notif);
                } else {
                    array_push($array_trainings, "ITO YUNG EMPTY HUHUHUHU".$result->id);
                    $expiryDate = Carbon::parse($result->expiryDate);
                    $weekBeforeExpiry = Carbon::parse($result->expiryDate)->subDays(7);

                    if($date > $weekBeforeExpiry) {
                        if($date > $expiryDate) {
                            Notification::create([
                                'userId' => $user->id,
                                'content' => "Training"." [".$result->title."] "."has EXPIRED.",
                                'trainingId' => $result->id,
                            ]);
                            return response()->json(["message" => "Expired, added notif."]);
                        }
                        Notification::create([
                            'userId' => $user->id,
                            'content' => "Training"." [".$result->title."] "."is EXPIRING soon.",
                            'trainingId' => $result->id,
                        ]);
                        return response()->json(["message" => "Expiring, added notif."]);
                    } 
                }
            }

            return response()->json(["message" => "No Expiring or Expired Training."]);
        }
            catch(Throwable $e) {
                error_log($e->getMessage());
        }
    }

    public function trashNotif(Request $request)
    {
        try {
            $notif = Notification::findOrFail($request->id);

            $notif->trash = 1;
            $notif->save();

            return response()->json([
                'message' => 'The notification has been deleted.', 
                'status' => "success", 
                400]);
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
