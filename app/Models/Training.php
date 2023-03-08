<?php

namespace App\Models;

use CaliCastle\Concerns\HasCuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    use HasFactory, HasCuid;

      protected $fillable = [
            'title',
            'speaker',
            'provider',
            'completionDate',
            'expiryDate',
            'result',
            'feedback',
            'inputtedBy',
            'certificate',
            'status',
            'venueUrl',
            'type',
            'category',
            'inputtedName',
            'isScheduled',
            'companyId'
    ];

  public function user() {
      return $this->belongsTo(User::class, 'userId', 'id');
  }

  public function trainingUsers() {
    return $this->hasMany(TrainingUser::class, 'trainingId', 'id');
  }

  public function attendances() {
    return $this->hasMany(Attendance::class, "trainingId", "id");
  }
    
}
