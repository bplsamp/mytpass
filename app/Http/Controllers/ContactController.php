<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
<<<<<<< HEAD
use Error;
=======

use App\Helpers\Help;
use App\Models\Attendance;
>>>>>>> parent of fbe3c0a (LAST PUSH WORKING ALL)
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use Error;
use Throwable;

class ContactController extends Controller
{
    public function sendEmail(Request $req)
    {
        try {
            Mail::raw($req->message." from: ".$req->email, function ($message) use($req) {
                $message->to('mytpasscsb@gmail.com')
                    ->subject("A Customer Wants To Contact You"." from:".$req->email);
                });
            return response()->json(['message'=> 'Successfully sent email to MyTPass']);
            } 
        catch (Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function forgotPassword(Request $req) {
        try {
            $user = User::where('email', '=', $req->email)->first();

            if($user) {
            Mail::html("Please click here to reset your password <a>http:localhost:8000/reset-password?token=".$req->token. "</a>" , function ($message) use($req) {
                    $message->to($req->email)
                        ->subject("Forgot Password MyTPass");
                    });
            return response()->json([
                'message' => "Successfully emailed your reset password link",
            ]);
            } else {
                return response()->json([
                    'message' => 'Failed to send email',
                ], 400);
            }

            } 
        catch (Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }
}
