<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Company;
use App\Models\User;
use App\Models\Subscription;
use App\Models\File;
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
            //Store our fileUrls and filesArray in an array
            // in case of error, we will delete them
            $filesArray = array();
            $fileUrls = array();
            $path = '';
        
        $company = json_decode($request->input("company"));
    
            //retrieve data from FormData
            $icon = $request->file("icon");
            $company = json_decode($request->input("company"));

            try {

            //upload Icon
            if($icon) {
                $filename = '/companies/images/'. str_replace(" ", "_",$company->companyName). '/'. $icon->getClientOriginalName();
                $pathicon = Storage::disk('s3')->put($filename, file_get_contents($icon),'public');
                //error_log(strval('path'.$path));
                $pathicon = Storage::url($filename);
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
                'icon' => $pathicon,
                'ownerId' => $companyOwner,
            ]);      
            
            
            //Create File::model and bind each supporting file url to our company
            foreach($request->file('files') as $file) {   
                $filename = '/companies/documents/'. str_replace(" ", "_",$company->companyName). '/'. $file->getClientOriginalName();
                $pathfile = Storage::disk('s3')->put($filename, file_get_contents($file),'public');
                $pathfile = Storage::url($filename);

                $fileCreated = File::create([
                    'companyId' => $company->id,
                    'url' => $pathfile,
                    'extension' => $file->getClientOriginalExtension(),
                    'filename' => $file->getClientOriginalName(),
                ]);
                //push in array just in case of error,
                //we can use these arrays to delete everything
                // and display error message
                array_push($filesArray, $fileCreated->id);
                array_push($fileUrls, $pathfile);
            }
            
            //Now create our subscription
            $sub = Subscription::create([
                'companyId' => $company->id 
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
                
        } catch (Throwable $e){
            //if anything fails we delete the files and icon from S3 first then delete the company
            //1st we need to delete icon
            Storage::disk('s3')->delete($pathicon);

            //2nd delete company if exist
            if(property_exists($company, 'id')) {
                try {
                    $data = Company::destroy($company->id);
                    return $data;

                    } catch(Throwable $e) {
                        error_log($e->getMessage());
                        return null;
                    }
            }


            //3rd delete sub if exist
            if(property_exists($sub, 'id')) {
                try {
                    $data = Subscription::destroy($sub->id);
                    return $data;
                    
                    } catch(Throwable $e) {
                        error_log($e->getMessage());
                        return null;
                    }
            }

            //4th delete files from s3 and db
            if(count($filesArray) > 0) {
                for ($i = 0; $i < count($filesArray); $i++) {
                    try {
                        //Delete Files::class from database
                        File::destroy($filesArray[$i]);
                        //Delete uploaded files from s3
                        Storage::disk('s3')->delete($fileUrls[$i]);
                    } catch(Throwable $e) {
                        error_log($e->getMessage());
                    }
                }
            }
            return response()->json(['message' => "Failed to create company cause: ". $e->getMessage()] , 401);
        }
    }
}
