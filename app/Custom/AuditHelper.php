<?php
namespace App\Custom;

use App\Helpers\Help;
use App\Models\Notification;
use App\Providers\Database;
use App\Models\Audit;
use Exception;
use Illuminate\Support\Facades\Auth;
use Error;

class AuditHelper {

    public static function audit(string $operation, string $targetModel, string $description = null, $user) {
        try {
            $audit = Audit::create([
            'operation' => $operation,
            'targetModel'  => $targetModel,
            'description'  => $description,
            'by'  => $user->firstName . " " . $user->lastName,
            'userId'  => $user->id,
            ]);

            
            if(!$audit) {
                throw new Error("Failed to create audit");
            }

            error_log('created audit');

            return $audit;

        }catch(Exception $e) {
            error_log($e);
            return null;
        }
    }
}