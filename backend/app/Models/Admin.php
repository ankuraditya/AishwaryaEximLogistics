<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasRoles;
    use Notifiable;

    /**
     * Guard used by Spatie Permission.
     */
    protected string $guard_name =
        'admin';

    protected $fillable = [
        'name',
        'email',
        'password',
        'is_active',
        'last_login_at',
        'last_login_ip',
        'password_changed_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',

            'is_active' => 'boolean',

            'email_verified_at' => 'datetime',

            'last_login_at' => 'datetime',

            'password_changed_at' => 'datetime',
        ];
    }

    /**
     * Force Spatie Permission to use
     * the dedicated administrator guard.
     */
    protected function getDefaultGuardName(): string
    {
        return $this->guard_name;
    }
}
