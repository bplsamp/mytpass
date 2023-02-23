<?php

namespace App\Providers;

use Exception;
use Throwable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
class Database
{
    public function createRow($model, $array, $return_variable = false, $msg = '')
    {
        error_log("TYPE".gettype($array));

        if(gettype($array) == 'object') {
            error_log("TARGET OBJECT" . json_encode($array));
            $array = json_decode(json_encode($array), true);
        }else if(gettype($array) == 'array') {
            error_log("TARGET ARRAY".json_encode($array));
        }

        try {
            $data = $model::create($array);

            if ($data != null) {
                if ($return_variable) {
                    return $data;
                }

                return response()->json(
                    [
                        "status" => "success",
                        "result" => $data,
                        'message' => $msg,
                    ],
                    200
                );
            } else {
                throw new Exception("Null value");
            }
        } catch (Throwable $e) {
            error_log($e);
            if ($return_variable) {
                return null;
            }

            return response()->json(
                [
                    "status" => "error",
                    "message" => "Unexpected server error" . $e,
                ],
                401
            );
        }
    }

    public function selectAll($model)
    {
        try {
            $data = $model::all();

            if ($data != null) {
                return response()->json($data, 200);
            } else {
                throw new Exception("Null value");
            }
        } catch (Exception $e) {
            error_log($e);
            return response()->json(
                [
                    "status" => "error",
                    "message" => "Unexpected server error",
                ],
                401
            );
        }
    }

    public function selectById($model, $obj) {
        return $model::findOrFail($obj->id);
    }

    public function selectJoin(string $table, string $foreignKey, string $foreignTable) {
        try {
       
        $data = (object)DB::table($table)->join($foreignTable, $table.'.'. $foreignKey, '=', $foreignTable.'.id')->get();
            

         return response()->json($data, 200);
        }
        catch(Throwable $e) {
            error_log($e->getMessage());
            return response()->json([
                'message' => 'Unexpected server error cause: '. $e->getMessage(),
            ], 401);
        }
    }

    public function updateRow($model, $array, $path, $message)
    {
       error_log("TYPE".gettype($array));

       if(gettype($array) == 'array') {
            //error_log("TARGET ARRAY".json_encode($array));
            $array = (object)$array;
          
        }

            $targetModel = $model::findOrFail($array->id);
            error_log("targetUser" . $targetModel);

            foreach ($array as $k => $v) {
                $targetModel->$k = $v;
            }

            error_log("updatedUser" . $targetModel);
            if ($path) {  
                $targetModel->avatar = $path;
            }

            $targetModel->save();

            return response()->json(
                ["message" => $message],
                200
            );
        
    }

    public function uploadFileS3($folder, $file, $id, $is_public =false)
    {
        $path = "";
        if ($file) {
            $filename =
                $folder .
                $id .
                "/" .
                $file->getClientOriginalName();
            if ($is_public) {
                $path = Storage::disk("s3")->put(
                    $filename,
                    file_get_contents($file),
                    "public"
                );
            } else {
                $path = Storage::disk("s3")->put(
                    $filename,
                    file_get_contents($file)
                );
            }
            $path = Storage::url($filename);
        }
        return $path;
    }

    public function deleteFileS3($url) {
        try {
      if(Storage::disk('s3')->exists($url)) {
        Storage::disk('s3')->delete($url);
      }
    } catch(Throwable $e) {
        error_log($e);
        Log::error($e);
    }
    }

    public function deleteRow($model, $id) {
        try {
        $data = $model::destroy($id);
        return $data;
        } catch(Throwable $e) {
            error_log($e->getMessage());
            return null;
        }
    }

    public function response($code, $message) {
         return response()->json(
                [
                    "message" => $message,
                ],
                $code
            );
    }

    public function getS3Object(string $path) {
        if (Storage::disk('s3')->exists($path)) {
            return Storage::download($path);
        }
    }


}
