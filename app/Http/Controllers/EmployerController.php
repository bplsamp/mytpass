<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use stdClass;
use Throwable;
use App\Models\Company;
use App\Models\User;
use Error;
use Illuminate\Support\Facades\Auth;
use App\Custom\NotificationHelper;
use App\Models\Notification;
use App\Models\TrainingUser;
use App\Models\Attendance;
use App\Models\Training;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EmployerController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function dashboard(Request $request) 
    {

    }

    public function editcompany(Request $request)
    {
        try {
            $icon = $request->file('icon');
            $obj = (object)json_decode($request->input('company'));
            $company = (object)Company::findOrFail($obj->id); 
    
            if($icon) {
                $deletefile = parse_url($company->icon);
                $isDeleted = Storage::disk('s3')->delete($deletefile);
                error_log('DELETED'. $isDeleted);

                $filename = '/companies/images/'. str_replace(" ", "_",$company->companyName). '/'. $icon->getClientOriginalName();
                $pathicon = Storage::disk('s3')->put($filename, file_get_contents($icon),'public');
                //error_log(strval('path'.$path));
                $pathicon = Storage::url($filename);

                $company->icon = $pathicon;
                $company->save(); 
            } 

            if($company) {
                $company->companyEmail = $request->companyEmail;
                $company->companyContact = $request->companyContact;
                $company->save();
            }
           
            return response()->json(['message' => "Successfully updated company"], 200);
    
            } 
            catch(Throwable $e) {
                error_log((string)$e->getMessage());
                return response()->json(['message' => "Failed to update company cause: ". $e->getMessage()] , 401);
            }
    }

    public function search(Request $request) 
    {
        try {
            $user = Auth::user();
            $obj = (object)json_decode($request->getContent());
            
            if(isset($obj->query) && $obj->query != '') {

            $data = User::where(function($query) use ($user) {
                $query->whereNull('companyId')
                ->where("isSearchable", '=', true);
            })
                ->where('firstName', 'like', "%$obj->query%")
                ->orWhere('lastName', 'like', "%$obj->query%")
                ->paginate($perPage = 5, $columns = ['*'], $pageName = 'page', $page = $obj->page);
             return response()->json($data);
            }
            else {
            $data = User::whereNull('companyId')
            ->where("isSearchable", '=', true)
            ->paginate($perPage = 5, $columns = ['*'], $pageName = 'page', $page = $obj->page);
            return response()->json($data);
            }
        }
            catch(Throwable $e) {
                error_log($e->getMessage());
        }
    }

    public function user(Request $request) {
        try {
            $obj = (object)json_decode($request->getContent());
            $data = User::findOrFail($obj->id);
            $company = User::findOrFail($obj->id)->company;


            return response()->json(['user' => $data, 'company' => $company]);
        }
        catch(Throwable $e) {
              error_log($e->getMessage());
        }
    }

    public function searchUser(Request $request)
    {

    }

    public function inviteUser(Request $request)
    {
        try {
            $obj = (object)json_decode($request->getContent());
            
            $n = new NotificationHelper();

            error_log(json_encode($obj));

            //get our company
            $company = Company::findOrFail($obj->companyId, ['companyName']);

            //get our sender
            $sender = User::findOrFail($obj->senderId, ['firstName', 'lastName']);

            //build our notif
            $user = $sender->firstName . ' '. $sender->lastName;
            $obj->content = $user . ' has invited you to their company ' . $company->companyName;


            //is user already invited? checker
            /*$user = User::find($obj->userId, ['id']);
            $notifs = Notification::where('content', 'like', '%invited%')
            ->orWhere('userId', '!=', $user);

            if($notifs){
                error_log($user);
                error_log("failed");
                return response()->json(['message' => 'fail']);
            }*/
           
            return $n->createNotif($obj);
            error_log("success invite user");
        }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        } 
    }

    public function transferOwnership(Request $request)
    {
        try {
            $user = Auth::user();

            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            $company = Company::findOrFail($user->companyId)->update(['ownerId' => $request->targetId]);

            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
            return response()->json(['message' => 'Successfully transferred ownership']);
        } 
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        } 
    }

    public function myEmployees(Request $request)
    {
        try {
            $user = Auth::user();
            $obj = (object)json_decode($request->getContent());
            $data = User::where('companyId', '=', $user->companyId)
                ->where('role', '!=', 'business owner')
                ->where('role', '!=', 'human resource')
                ->paginate($perPage = 5, $columns = ['*'], $pageName = 'page', $page = $obj->page);
                return response()->json($data);
            }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        } 
    }

    public function myEmployers(Request $request)
    {
        try {
            $user = Auth::user();
            $obj = (object)json_decode($request->getContent());
            $data = User::where('companyId', '=', $user->companyId)
                ->where('role', '!=', 'employee')
                ->where('id', '!=', $user->id)
                ->paginate($perPage = 5, $columns = ['*'], $pageName = 'page', $page = $obj->page);
                return response()->json($data);
            }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        } 
    }

    public function myCompanyUsers()
    {
        try {
            $user = Auth::user();
            $users = User::where('companyId', '=', $user->companyId)
            ->where('id', '!=', $user->id)
            ->where('role', '!=', 'business owner')->get();

            if(!$users) {
                throw new Error('Failed to find company users');
            }

            return response()->json($users);
            }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        } 
    }

    public function removeUser(Request $request)
    {
        try {
            $user = User::findOrFail($request->id);
            $companyId = $user->companyId;
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');

            $user->companyId = null;
            $user->isSearchable = true;
            $user->save();

            //Attendance::where('companyId', '=', $companyId)
            //->where('userId', '=', $user->id)->delete();

            //TrainingUser::where('userId', '=', $user->id)->get()->pluck('training')->where('status', '=', 'pending')->delete();

            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    
            return response()->json(['message' => 'Successfully removed user from company', 200]);
        }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        } 
    }

    public function getEmployeeTPass(Request $request)
    {

    }

    public function mytrainings(Request $request) {
        try {
            $user = Auth::user();

            $trainings = Training::where('inputtedBy', '=', $user->id)->where('isScheduled', '=', 1)->get();
 
            if(!$trainings) {
             throw new Error("Failed to fetch my trainings");
            }
 
            return response()->json($trainings);
        }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        } 
    }

}
