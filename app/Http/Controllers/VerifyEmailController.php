<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Models\User;

class VerifyEmailController extends Controller
{

    public function __invoke(Request $request): RedirectResponse
    {
        //find user, and put into $user if user is logged in and existing
        $user = User::find($request->route('id'));

        //if user is already email verified, direct sa already-success component
        if ($user->hasVerifiedEmail()) {
            return redirect(env('APP_URL') . '/email/verify/already-success');
        }

        if ($user->markEmailAsVerified()) {
                event(new Verified($user));
        }
            return redirect(env('APP_URL') . '/email/verify/success');
    }
}