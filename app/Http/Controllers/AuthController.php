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

use Exception;



class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api',  ['except' => ['login', 'register', 'validateToken']]);
    }

    public function register(Request $request)
    {
        error_log("call_API");
        try {
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
                'companyId' => '',
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
        error_log($request);
        $credentials = $request->only('email', 'password');

        error_log("ERROR1");
        $token = Auth::attempt($credentials);
        error_log("ERROR2");
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid email or password',
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

}
