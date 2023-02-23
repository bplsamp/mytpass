<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Company;
use App\Models\User;
use Throwable;

use Exception;

class CompanyController extends Controller
{
    private $database;
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __construct()
    {
        $this->middleware("auth:api");
    }

    public function createCompany(Request $request)
    {
        try {
            //set status
            $companyStatus = "pending";
            $companyOwner = $request->ownerId;

            //Create our company
            $company = Company::create([
                'companyName' => $request->companyName,
                'address' => $request->address,
                'dtiNumber' => $request->dtiNumber,
                'companyEmail' => $request->companyEmail,
                'companyContact' => $request->companyContact,
                'companyStatus' => $companyStatus,
                'icon' => "",
                'ownerId' => $companyOwner,
            ]);

            //update user - input companyId
            $user = User::findOrFail($companyOwner);
            $user->companyId = $company->id;
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Company created successfully',
            ]);
                
        } catch (Exception $e){
            error_log($e);
        }
    }
}
