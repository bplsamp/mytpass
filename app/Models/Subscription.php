<?php

namespace App\Models;

use CaliCastle\Concerns\HasCuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory, HasCuid;

    
    protected $fillable = [
            'type',
            'expiryDate',
            'startDate',
            'companyId',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class, 'companyId', 'id');
    }
}
