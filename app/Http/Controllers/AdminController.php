<?php

namespace App\Http\Controllers;

use Error;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Providers\Database;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use App\Models\User;
use App\Models\Webcontent;
use App\Models\Approval;
use App\Models\Audit;
use stdClass;
use Throwable;
use Exception;
use Illuminate\Support\Facades\Mail;

class AdminController extends Controller
{
    private $database;
    /**
     * Show a list of all of the application's users.
     *
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function users() {
        try {
        $users = User::where('role', '!=', 'admin')->with('company:id,companyName')->get();
        
        if($users != null) {
          return response()->json([
                'status' => 'success',
                'users' => $users,
            ], 200);
        } else {
            throw new Exception('Null value');
        }
        } catch(Exception $e) {
            error_log($e);
              return response()->json([
                'status' => 'error',
                'message' => 'Unexpected server error',
            ], 401);
        }
        
    }

    public function companies() {
        try {
        $company = Company::where('companyStatus', '!=', 'pending')->with('owner')->with('subscription')->get();
        
        
        if($company != null) {
          return response()->json([
                'status' => 'success',
                'companies' => $company,
            ], 200);
        } else {
            throw new Exception('Null value');
        }
        } catch(Exception $e) {
            error_log($e);
              return response()->json([
                'status' => 'error',
                'message' => 'Unexpected server error',
            ], 401);
        }
    }
    
    public function approvals() {
        try {
            $data = Company::where('companyStatus', '=', 'pending')->with('owner:id,lastName,firstName,email')->with('files')->get();
            //->with(WALANG SPACE DAPAT PARA DI MAGERROR);
            return response()->json($data , 200);
        }
        catch (Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => "Unexpected server error cause: ". $e->getMessage()] , 200);
        }
    }

    public function approveCompany(Request $request) {
        try {
            $obj = (object)json_decode($request->getContent());

            $company = Company::findOrFail($obj->companyId);
            $company->companyStatus = "active";
            $company->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Company created successfully',
            ]);
        }
        catch (Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => "Unexpected server error cause: ". $e->getMessage()] , 200);
        }

    }

    public function audits() {
        $audits = Audit::all();
        return response()->json($audits);
    }

    public function rejectCompany(Request $request) {
        try {
            $user = Auth::user();

            $obj = (object)json_decode($request->getContent());    
            
            $logged = User::findOrFail($obj->ownerId);
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            $logged->companyId = null;
            $logged->save();
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');

            $company = Company::findOrFail($obj->companyId);
            Company::destroy($obj->companyId);

            Mail::raw("Reason: ".$obj->reason.
            "\nAfter a careful review of your company, we decided to reject your company, please provide us more information and documents. Your company has been deleted along with the information and documents, so please register an account and a company again.", function ($message) use($obj) {
                $message->to($obj->ownerEmail)
                    ->subject("Your Company Has Been Rejected");
                });
        }
        catch(Throwable $e) {
            error_log((string)$e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function deactivate(Request $request) {
        try {
            Company::findOrFail($request->id)->update(["companyStatus" => 'inactive',]);
            
            Mail::raw('The admins decided to deactivate your company, if you feel that we had made a mistake. Please contact us', function ($message) use($request) {
                $message->to($request->ownerEmail)
                    ->subject("Your Company Has Been Deactivated");
                });

            return response()->json(['message', 'Succesfully deactivated company']);
        } 
        catch(Throwable $e) {
            error_log((string)$e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function activate(Request $request) {
        try {
            $company = Company::findOrFail($request->id);
            $company->companyStatus = "active";
            $company->reason = null;
            $company->save();  
            
            Mail::raw("The admins had reactivated your company, we appreciate your participation!", function ($message) use($request) {
            $message->to($request->ownerEmail)
                ->subject("Your Company Has Been Reactivated"." from:".$request->email);
            });

            return response()->json(['message', 'Succesfully activated company']);
        } 
        catch(Throwable $e) {
            error_log((string)$e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function deleteUser(Request $request) {
        try {
            error_log($request->id);
            User::findOrFail($request->id)->delete();

            return response()->json(['message' => 'Successfully deleted user']);
        } 
        catch(Throwable $e) {
            error_log((string)$e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }
}
