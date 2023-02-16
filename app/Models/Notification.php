<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use CaliCastle\Concerns\HasCuid;
use App\Models\Company;
use App\Models\User;

class Notification extends Model
{
    use HasFactory, HasCuid;

    protected $fillable = [
        'userId',
        'read',
        'trash',
        'content',
        'status',
        'reason',
        'companyId',
        'senderId',
        'trainingId'
    ];

    public function company() {
        return $this->hasOne(Company::class, 'companyId', 'id');
    }

   public function from() {
        return $this->belongsTo(User::class, 'senderId', 'id');
    }

   public function to() {
        return $this->belongsTo(User::class, 'userId', 'id');
    }
}
