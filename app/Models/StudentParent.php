<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentParent extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'date_of_birth',
        
        'gender',
        'blood_type',
        'address',
        'phone',
        'email',
    ];

    protected $hidden = [
        'last_login_date',
        'email_verified_at',
        'deleted_at'

    ];
}
