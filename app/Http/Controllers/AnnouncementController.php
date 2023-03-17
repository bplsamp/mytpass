<?php
 
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Exception;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Webcontents;
use Illuminate\Http\Request;
use App\Models\Approval;
use stdClass;
use Throwable;
use Illuminate\Support\Facades\Storage;
use App\Models\Audit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use App\Helpers\Help;

class AnnouncementController extends Controller
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

    public function create(Request $request) {
        try {
            //if avatar exist (attached), upload image to s3 and url to db
            $image = $request->file('image');
            $path = '';
            if($image) {
                $filename = "announcements/".$image->getClientOriginalName();
                $path = Storage::disk('s3')->put($filename, file_get_contents($image),'public');
                $path = Storage::url($filename);
            }

            Webcontents::create([
                "content" => $request->content,
                "imageUrl" => $path,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Successfully uploaded announcement',
            ], 200);

        } catch(Throwable $e) {
            error_log((string)$e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }

    public function delete(Request $req) {
        try {
            Webcontents::findOrFail($req->id)->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'Successfully deleted announcement',
            ], 200);
        }
        catch(Throwable $e) {
            error_log((string)$e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
     }
  
    public function get(Request $req) {
        try {
            error_log('called');
            $res = Webcontents::all();
            
            //error_log($res);
            if ($res == null) {
                return response()->json(['message' => 'No Webcontent'], 200);
            }
            return response()->json($res);
        } catch(Throwable $e) {
            error_log((string)$e->getMessage());
            return response()->json(['message' => $e->getMessage()], 401);
        }
    }
}