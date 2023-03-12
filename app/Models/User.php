<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use CaliCastle\Concerns\HasCuid;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use App\Models\Company;


class User extends Authenticatable implements JWTSubject, MustVerifyEmail
{
    use HasFactory, Notifiable, HasCuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
            'email',
            'password',
            'role',
            'expertise',
            'firstName',
            'lastName',
            'middleInitial',
            'contact',
            'specify',
            'isSearchable',
            'bio' => '',
            'companyId' => '',
            'liked' => '',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function company() {
        return $this->belongsTo(Company::class, 'companyId', 'id');
    }
    
    public function mycompany() {
        return $this->hasOne(Company::class);
    }

    public function  notifications() {
        return $this->hasMany(Notification::class, 'userId', 'id');
    }

    public function trainings() {
        return $this->hasMany(Training::class, 'userId', 'id');
    }

    public function trainingUsers() {
        return $this->hasMany(TrainingUser::class, 'userId', 'id');
   }

}
