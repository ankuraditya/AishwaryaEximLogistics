<?php

namespace App\Http\Resources\Api\V1\Admin;

use App\Enums\AdminRole;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{
    public function toArray(
        Request $request
    ): array {
        return [
            'id' => $this->id,

            'name' => $this->name,

            'email' => $this->email,

            'is_active' => $this->is_active,

            'roles' => $this
                ->getRoleNames()
                ->values(),

            'permissions' => $this
                ->getAllPermissions()
                ->pluck(
                    'name'
                )
                ->sort()
                ->values(),

            'is_super_admin' => $this->hasRole(
                AdminRole::SUPER_ADMIN->value
            ),

            'last_login_at' => $this
                ->last_login_at
                ?->toIso8601String(),

            'password_changed_at' => $this
                ->password_changed_at
                ?->toIso8601String(),
        ];
    }
}
