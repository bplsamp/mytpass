<?php

namespace App\Models;

use CaliCastle\Concerns\HasCuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscriptionContent extends Model
{
    use HasFactory, HasCuid;

    
    protected $fillable = [
            'type',
            'desc',
            'price',
            'style',
            'button',
    ];
}
