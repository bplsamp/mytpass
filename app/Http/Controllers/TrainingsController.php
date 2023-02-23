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
         
            $training = Training::create([
                'title' => $req->title, 
                'speaker' => $req->speaker,
                'provider' => $req->provider,
                'date' => null,
                'completionDate' => $req->completionDate,
                'expiryDate' => null,
                'inputtedBy' => $user->id,
                'inputtedName' => $user->firstName." ".$user->lastName,
                'status' => 'completed',
                'result' => $req->result,
                'venueUrl' => $req->venueUrl,
                'type' => $req->type,
                'category' => $req->category,
                'feedback' => $req->feedback,
                'certificate' => ""
            ]);
            
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

            return response()->json(['message' => 'Successfully created training'], 200);

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
            Training::where('id', '=', $req->id)->where('inputtedBy', '=', $user->id)->delete();
            
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

    public function getSchedule(Request $req)
    {

            $user = Auth::user();
            $trainings = TrainingUser::where('userId', '=', $user->id)->get()->pluck('training')->where('status', '=', 'pending');

            if(!$trainings) {
                throw new Error("Failed to get training");
            }

            return response()->json($trainings);

    }
}
