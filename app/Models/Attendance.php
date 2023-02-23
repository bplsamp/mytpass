<?php

namespace App\Models;

use CaliCastle\Concerns\HasCuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Training;
use App\Models\User;

class Attendance extends Model
{
    use HasFactory, HasCuid;

        protected $fillable = [
            'userId',
            'userFullname',
            'trainingId',
            'isPresent',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'userId', 'id');
    }

     public function training() {
        return $this->belongsTo(Training::class, 'trainingId', 'id');
    }
}
