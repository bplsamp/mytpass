<?php

namespace App\Models;

use CaliCastle\Concerns\HasCuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Training;

class TrainingUser extends Model
{
    use HasFactory, HasCuid;

     protected $fillable = [
            'trainingId',
            'userId',
    ];


    public function user() {
        return $this->belongsTo(User::class, 'userId', 'id');
    }

    public function training() {
        return $this->belongsTo(Training::class, 'trainingId', 'id');
    }

}
