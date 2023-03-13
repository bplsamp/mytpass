<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use CaliCastle\Concerns\HasCuid;
class Webcontents extends Model
{

    use HasFactory, HasCuid;


      protected $fillable = [
            'content',
            'imageUrl',
    ];


}
