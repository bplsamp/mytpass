<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use CaliCastle\Concerns\HasCuid;
use App\Models\Company;
class Receipt extends Model
{
      use HasFactory, HasCuid;

       protected $fillable = [
            'userId',
            'companyId',
            'subscriptionId'
    ];

    public function subscription() {
        return $this->belongsTo(Subscription::class, 'subscriptionId', 'id');
    }

    
}
