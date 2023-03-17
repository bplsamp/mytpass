<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use CaliCastle\Cuid;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;
use Illuminate\Auth\Events\Registered;
use App\Custom\AuditHelper;
use Throwable;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Log;

use Exception;



class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',  ['except' => ['login', 'register', 'validateToken', 'resetPassword']]);
    }

    public function register(Request $request)
    {
        error_log("call_API");
        try {
            /*
            try {
                $validator = (object)$request->validate([
                    'email' => 'required|string|max:100|email|unique:users',
                    'password' => 'required|string|min:8|regex:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/',
                    'firstName' => 'required|string|max:50',
                    'lastName' => 'required|string|max:50',
                    'middleInitial' => 'string|max:5',
                    'contact' => 'required|numeric|digits_between:10,15|unique:users',
                    'specify' => 'required|string|max:50',
                ]);
            } catch (Throwable $e) {
                error_log($e->getMessage());
                return response()->json(['message' => "Unexpected server error cause: ". $e->getMessage()] , 200);
            }
            */
            

            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'expertise' => $request->expertise,
                'firstName' => $request->firstName,
                'lastName' => $request->lastName,
                'middleInitial' => $request->middleInitial,
                'contact' => $request->contact,
                'specify' => $request->specify,
                'isSearchable' => true,
                'bio' => '',
                'companyId' => null,
                'liked' => '',
            ]);

            //if failed, send response fail
            if(!$user) {
                return response()->json([
                   'status' => 'failed',
                   'message' => 'Failed to create user',
           ]);
           }
    
            event(new Registered($user));

            AuditHelper::audit('create', 'user', 'created user account', $user);

            return response()->json([
                'status' => 'success',
                'message' => 'User created successfully',
                'user' => $user,
                'authorisation' => [
                    'type' => 'bearer',
                ]
            ]);
        }
        catch (Exception $e){
            error_log($e);
        }
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);

        if (!$token || $token == '' || $token == null) {
            return response()->json([
                'message' => 'Invalid email or password'
            ], 401);
        }

        $user = Auth::user();
        error_log($token);

        //store session
        //Session::put('mytpass_session', $token);
    
        //setToken
        return response()
        ->json([
                'status' => 'success',
                'message' => 'Login Successfully',
                'user' => $user,
                'authorisation' => [
                    'token' => $token,
                    'type' => 'bearer',
                ]
            ])->cookie(
            'mytpass_session', $token, 60, "/", "", false, false
        );

    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ])->cookie("mytpass_session", null);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function resetPassword(Request $req) 
    {
        try {          
            error_log("CALLED");
            $init = User::where('email', '=', $req->email)->first();

            error_log($init);
            $user = User::findOrFail($init->id);
            $user->password = Hash::make($req->newPassword);
            $user->save();
            return response()->json([
                'message' => 'Successfully changed password',

                'status'=> 'success'
            ], 200);         
            } catch(Exception $e) {
                return response()->json([
                'message' => 'Exception: ' + $e->getMessage(),
                'status'=> 'error'
                ], 400);
        }
    }
    
    public function validateToken(Request $request) 
    {
        try {
          $user = Auth::userOrFail();
          // returns user if existing user, else fail api

          $company = User::findOrFail($user->id)->company;
          error_log(strval($company));
        
          return response()->json([
                'user' => $user,
                'company' => $company,
                'status'=> 'success'
             ], 200);
        }catch(Exception $e) {
            error_log($e->getMessage());
            return response()->json([
                'message' => 'Exception: ' + $e->getMessage(),
                'status'=> 'error'
             ], 400);
        }
        //validate
    }
    

    static public function createDefaultUsers() {
        $g_password = 'mytpassbenilde2023!';
        
        try {
            //Admin
            $admin = User::create([
            'email' => 'mytpasscsb@gmail.com',
            'password' =>  Hash::make($g_password),
            'role' => strtolower('admin'),
            'expertise' => strtolower('admin'),
            'firstName' => 'Admin',
            'lastName' => 'MyTPass',
            'middleInitial' => 'N',
            'contact' => '09053172342',
            'specify' => 'admin',
            'isSearchable' => false,
            'bio' => '',
            'companyId' => '',
            'liked' => '',
            ]);

            if(!$admin) {
                throw new Exception("Failed to create admin");
            }

            if($admin->markEmailAsVerified()) {
                error_log('called');
                event(new Verified($admin));
            }
        } catch(Exception $e) {
                error_log($e->getMessage());
                return response()->json([
                    'message' => 'Exception: ' + $e->getMessage(),
                    'status'=> 'error'
                 ], 400);
            }
        }
}
