<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\V1\Admin\AdminResource;
use App\Models\Admin;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Spatie\Permission\Models\Role;

class AdminUserController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return ApiResponse::success([
            'administrators' => AdminResource::collection(Admin::with('roles')->latest()->get()),
            'roles' => Role::where('guard_name', 'admin')->orderBy('name')->pluck('name'),
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $request->validate($this->rules());
        $role = $data['role'];
        unset($data['role']);
        $admin = Admin::create($data);
        $admin->syncRoles([$role]);

        return ApiResponse::created(new AdminResource($admin), 'Administrator created successfully.');
    }

    public function update(Request $request, Admin $admin): JsonResponse
    {
        $data = $request->validate($this->rules($admin));
        $role = $data['role'] ?? null;
        unset($data['role']);
        if (empty($data['password'])) {
            unset($data['password']);
        }
        $admin->update($data);
        if ($role) {
            $admin->syncRoles([$role]);
        }

        return ApiResponse::success(new AdminResource($admin->fresh()), 'Administrator updated successfully.');
    }

    private function rules(?Admin $admin = null): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:255', Rule::unique('admins')->ignore($admin)],
            'password' => [$admin ? 'nullable' : 'required', Password::min(12)->mixedCase()->numbers()->symbols()],
            'is_active' => ['sometimes', 'boolean'],
            'role' => ['required', Rule::exists('roles', 'name')->where('guard_name', 'admin')],
        ];
    }
}
