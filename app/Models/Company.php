<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use CaliCastle\Concerns\HasCuid;
use App\Models\User;
class Company extends Model
{

    use HasFactory, HasCuid;


   protected $fillable = [
            'companyName',
            'address',
            'dtiNumber',
            'companyEmail',
            'companyContact',
            'companyStatus',
            'icon',
            'ownerId',
];

     public function users()
    {
        return $this->hasMany(User::class, 'companyId', 'id');
    }

    public function owner() {
        return $this->belongsTo(User::class, 'ownerId', 'id');
    }
    
    public function files()
    {
        return $this->hasMany(File::class,'companyId', 'id');
    }

    public function subscription()
    {
        return $this->hasOne(Subscription::class, 'companyId', 'id');
    }
}
