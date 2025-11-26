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
          'last_login_date',
        'gender',
        'blood_type',
        'address',
        'phone',
        'email',
    ];

    protected $hidden = [
      
        'email_verified_at',
        'deleted_at'

    ];

    protected $casts = [
          'date_of_birth'=> 'date:Y-m-d'
    ];
}
