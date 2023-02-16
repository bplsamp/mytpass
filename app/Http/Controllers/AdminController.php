<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use App\Providers\Database;
use Illuminate\Support\Facades\Storage;
use App\Models\Company;
use App\Models\User;
use App\Models\Webcontent;
use App\Models\Approval;
use stdClass;
use Throwable;
use Exception;

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
        $users = User::with('company:id,companyName')->get();
        
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
        $company = Company::where('companyStatus', '!=', 'Requested Approval')->with('owner')->get();
        
        
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
    
}
