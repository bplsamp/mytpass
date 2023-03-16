<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Helpers\Help;
use Error;
use App\Providers\Database;
use App\Custom\NotificationHelper;
use Throwable;
use App\Models\User;
use App\Models\Company;
use App\Models\Training;
use App\Models\TrainingUser;
use App\Models\Attendance;
use App\Models\Notification;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\DB;

class TrainingsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function create(Request $request)
    {
        try {
            $user = Auth::user();
            $req = json_decode($request->input("training"));
            $certificate = $request->file('certificate');
            
            if ($req->expiryDate == null) $expiryDate = null;
            else $expiryDate = $req->expiryDate;
            
            try {
                $training = Training::create([
                    'title' => $req->title, 
                    'speaker' => $req->speaker,
                    'provider' => $req->provider,
                    'date' => null,
                    'completionDate' => $req->completionDate,
                    'expiryDate' => $expiryDate,
                    'inputtedBy' => $user->id,
                    'inputtedName' => $user->firstName." ".$user->lastName,
                    'status' => 'completed',
                    'result' => $req->result,
                    'venueUrl' => $req->venueUrl,
                    'type' => $req->type,
                    'category' => $req->category,
                    'feedback' => $req->feedback,
                    'companyId' =>$user->companyId,
                ]);
            } catch(Throwable $e) {
                error_log($e->getMessage());
                return response()->json(['message' => $e->getMessage()]);
            }
            

            if($certificate) {
                //get watermark
                $waterMark = public_path('images/cert.png');
                $image = Image::make(file_get_contents($certificate));
                $image->insert($waterMark, 'center');
                $fileWatermarked = $image->encode('png');
                //make path and put into s3 bucket
                $filename = '/trainings'. '/'. $user->id. '/'. $certificate->getClientOriginalName()."_wm";
                $path = Storage::disk('s3')->put($filename, $fileWatermarked,'public');
                //get url of image
                $path = Storage::url($filename);
                //store url into training certificate (DB)
                $training->certificate = $path;
            }
            
            if(!$training) {
                throw new Error("Failed to create training");
            }

            $trainingUser = TrainingUser::create([
                'trainingId' => $training->id, 
                'userId' => $req->userId,
                'userName' => $req->userName,
            ]);
            
            if(!$trainingUser) {
                throw new Error("Failed to create training_user");
            }

            $trainingUser->save();
            $training->save();

            /*$path = $this->database->uploadFileWatermarked(
                '/trainings'. '/',
                $request->file("certificate"),
                $training->id,
                true
            );

            if(!$path) {
                Training::find($training->id)->delete();
                throw new Error("Failed to upload certificate");
            }*/

            return response()->json(['message' => 'Successfully added training'], 200);

        }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }         
    }

    public function update(Request $req) 
    {
        try 
        {
            $training = Training::findOrFail($req->id)->update($req->training);
            error_log('status'.$training);
               
            return response()->json(['message' => 'Successfully updated training'], 200);
        }
        catch(Throwable $e) 
        {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function delete(Request $req)
    {
        try 
        {
            $user = Auth::user();
            TrainingUser::where('trainingId', '=', $req->id)->where('userId', '=', $user->id)->delete();
            Training::where('id', '=', $req->id)->where('isScheduled', '=', 0)->delete();
            //Delete Training URL
            
            return response()->json(['message' => 'Successfully deleted training'], 200);
        }
        catch(Throwable $e) 
        {
                error_log($e->getMessage());
        }
    }

    public function get()
    {
        try 
        {
            $user = Auth::user();
            $trainings = TrainingUser::where('userId', '=', $user->id)->with('training')->get()->pluck('training')->where('status', '!=', 'pending');
            $array_trainings = [];

            foreach($trainings as $key => $value) {
                array_push($array_trainings, $value);
            }

            if(!$trainings) {
                throw new Error("Failed to get training");
            }

            return response()->json($array_trainings);
        }
        catch (Throwable $e)
        {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function getSchedule()
    {

            $user = Auth::user();
            $trainings = TrainingUser::where('userId', '=', $user->id)->get()->pluck('training')->where('status', '=', 'pending');
            $array_trainings = [];

            foreach($trainings as $key => $value) {
                array_push($array_trainings, $value);
            }

            if(!$trainings) {
                throw new Error("Failed to get training");
            }

            return response()->json($array_trainings);

    }

    public function getUsersByTraining(Request $req) {
        try{
            $users = Attendance::where('trainingId', '=', $req->trainingId)->get();
            if(!$users) {
                throw New Error("Failed to get users");
            }

            return response()->json($users);
        }  
        catch (Throwable $e)
        {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function bulkInsert(Request $req) {
        try {
            $loggedUser = Auth::user();
            $training = (object)Training::create($req->training);

            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            foreach($req->users as $user) {
                $u = (object)$user;
                $userName = $u->firstName." ".$u->middleInitial.". ".$u->lastName;
                TrainingUser::create([
                    'trainingId' => $training->id,
                    'userId' => $u->id,
                    'companyId' => $loggedUser->companyId,
                    'userName' => $userName,
                ]);
                Attendance::create([
                    'userId' => $u->id,
                    'trainingId' => $training->id,
                    'companyId' => $loggedUser->companyId,
                    'userFullname' => $u->firstName . " " . $u->lastName,
                    'contact' => $u->contact,
                ]);

                Notification::create([
                    'senderId' => $loggedUser->id,
                    'userId' => $u->id,
                    'trainingId' => $training->id,
                    'content' => ' has invited you to a scheduled training ' . ucwords($training->title),
                ]);
                
            }
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');

            return response()->json(['message' => 'Successfully notified users'], 200);
        }
        catch (Throwable $e)
        {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function completeTraining(Request $req) {
        try {
             //Update training to completed
             $t = (object)$req->training;
             $training = Training::find($t->id);
             $training->status = 'completed';
             $training->feedback = $t->feedback;
             $training->result = $t->result;
             $training->completionDate = Carbon::now();
             $training->save();
            
             //Update all attendance
             foreach ($req->users as $user) {
                 $u = (object)$user;
                 Attendance::where('userId', '=', $u->userId)->where('trainingId', '=', $t->id)->update(['isPresent' => $u->isPresent]);
 
                 //if absent
                 if($u->isPresent == false) {
                     TrainingUser::where('trainingId', '=', $training->id)->where('userId', '=', $u->userId)->delete();
                 }
             }
 
             return response()->json(['message' => 'Successfully completed training'], 200);
        }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }    
    }

    public function deleteTraining(Request $req) {
        try {
            $user = Auth::user();
            $training = Training::where('id', "=", $req->trainingId)->delete();
            $trainingUser = TrainingUser::where('trainingId', '=', $req->trainingId)->delete();
            $attendances = Attendance::where('trainingId', '=', $req->trainingId)->delete();
            $expiringNotif = Notification::where('trainingId', '=', $req->trainingId)->where('userId', '=', $user->id);


            return response()->json([
                'message' => 'Successfully deleted scheduled training',
                'training' => $training,
                'trainingUser' => $trainingUser,
                'attendances' => $attendances]
                , 200
            );
        }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }    
    } 

    public function getById(Request $req) {
        try {
            $trainings = TrainingUser::where('userId', '=', $req->id)->get()->pluck('training')->where('status', '!=', 'pending');
            error_log("TRAININGS");
            $array_trainings = [];

            
            if(!$trainings) {
                throw new Error("Failed to get training");
            }

            foreach($trainings as $key => $value) {
                array_push($array_trainings, $value);
            }
            
            return response()->json($array_trainings);
        }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }    
    } 

    public function getAllCompanyTrainings(Request $req) {
        try {
            $user = Auth::user();
            error_log($user->companyId);
            
            $trainingPlucked = Training::where('companyId', '=', $user->companyId)->where('status', '!=', 'pending')->get();
            //error_log($trainingPlucked);
         
            $trainingPush = [];
            $array_trainings = [];
            
            foreach ($trainingPlucked as $obj) {
                array_push($trainingPush, TrainingUser::where('trainingId', '=', $obj->id)
                ->with('training')
                ->with('user')
                ->get());
            }

            foreach ($trainingPush as $obj2) {
                array_push($array_trainings, $obj2);
            }



            return response()->json($array_trainings);
        }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }
}
