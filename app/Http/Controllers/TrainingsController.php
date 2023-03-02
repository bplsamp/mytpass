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
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

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
            ]);

            if($certificate) {
                $filename = '/trainings'. '/'. $user->id. '/'. $certificate->getClientOriginalName();
                $path = Storage::disk('s3')->put($filename, file_get_contents($certificate),'public');
                //error_log(strval('path'.$path));
                $path = Storage::url($filename);
                $training->certificate = $path;
            }
            
            if(!$training) {
                throw new Error("Failed to create training");
            }

            $trainingUser = TrainingUser::create([
                'trainingId' => $training->id, 
                'userId' => $req->userId,
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

    public function update() 
    {

    }

    public function delete(Request $req)
    {
        try 
        {
            $user = Auth::user();
            TrainingUser::where('trainingId', '=', $req->id)->where('userId', '=', $user->id)->delete();
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
            $trainings = TrainingUser::where('userId', '=', $user->id)->get()->pluck('training')->where('status', '!=', 'pending');

            if(!$trainings) {
                throw new Error("Failed to get training");
            }

            return response()->json($trainings);
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
            $trainings = TrainingUser::where('userId', '=', $user->id)->get()->pluck('training');

            if(!$trainings) {
                throw new Error("Failed to get training");
            }

            return response()->json($trainings);

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

            foreach($req->users as $user) {
                $u = (object)$user;
                TrainingUser::create([
                    'trainingId' => $training->id,
                    'userId' => $u->id,
                ]);
                Attendance::create([
                    'userId' => $u->id,
                    'trainingId' => $training->id,
                    'companyId' => $loggedUser->companyId,
                    'userFullname' => $u->firstName . " " . $u->lastName,
                    'contact' => $u->contact,
                ]);
                
            }

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
                 Attendance::where('userId', '=', $u->userId)->update(['isPresent' => $u->isPresent]);
 
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
}
