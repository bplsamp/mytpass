<?php
namespace App\Custom;

use App\Models\Notification;
use App\Providers\Database;

class NotificationHelper {
   
    private $database;


    public function __construct() {
        $this->database = new Database();
    }

    public function createNotif($notificationArray) {
         return $this->database->createRow(Notification::class, $notificationArray, false, 'Successfully notified user');
    }

    public function deleteNotif($id) {
         return $this->database->deleteRow(Notification::class, $id);
    }

    public function updateNotif($notificationArray) {
        return $this->database->updateRow(Notification::class, $notificationArray, null, 'Successfully sent notification');
    }

}