<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Company;
use App\Models\User;
use Throwable;
use Illuminate\Support\Facades\Storage;

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
            //retrieve data from inputs
            $icon = $request->file("icon");
            $company = json_decode($request->input("company"));

            //upload Icon
            $path = '';
            if($icon) {
                $filename = '/companies/images/'. str_replace(" ", "_",$company->companyName). '/'. $icon->getClientOriginalName();
                $path = Storage::disk('s3')->put($filename, file_get_contents($icon),'public');
                //error_log(strval('path'.$path));
                $path = Storage::url($filename);
            }
            
            
            //set status
            $companyStatus = "pending";
            $companyOwner = $company->ownerId;

            //Create our company
            $company = Company::create([
                'companyName' => $company->companyName,
                'address' => $company->address,
                'dtiNumber' => $company->dtiNumber,
                'companyEmail' => $company->companyEmail,
                'companyContact' => $company->companyContact,
                'companyStatus' => $companyStatus,
                'icon' => $path,
                'ownerId' => $companyOwner,
            ]);            

            //update user - input companyId
            $user = User::findOrFail($companyOwner);
            $user->companyId = $company->id;
            $user->isSearchable = false;
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
