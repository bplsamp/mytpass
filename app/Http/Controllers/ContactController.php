<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Helpers\Help;
use App\Models\Attendance;
use Illuminate\Support\Facades\Mail;
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
            } catch (Throwable $e) {
            error_log($e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }
}
