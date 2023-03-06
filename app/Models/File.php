<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use CaliCastle\Concerns\HasCuid;
use App\Models\Company;
class File extends Model
{
    use HasFactory, HasCuid;

    protected $fillable = [
            'filename',
            'url',
            'extension',
            'companyId',
    ];

    public function company() {
        return $this->belongsTo(Company::class, 'companyId', 'id');
    }

}
