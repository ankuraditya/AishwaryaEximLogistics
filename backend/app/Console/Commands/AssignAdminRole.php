<?php

namespace App\Console\Commands;

use App\Enums\AdminRole;
use App\Models\Admin;
use Illuminate\Console\Command;
use Spatie\Permission\Models\Role;

class AssignAdminRole extends Command
{
    protected $signature =
        'admin:assign-role
        {email : Administrator email}
        {role : Role name}';

    protected $description =
        'Assign a CMS role to an administrator';

    public function handle(): int
    {
        $email =
            strtolower(
                trim(
                    (string)
                    $this->argument(
                        'email'
                    )
                )
            );

        $roleName =
            trim(
                (string)
                $this->argument(
                    'role'
                )
            );

        $role =
            AdminRole::tryFrom(
                $roleName
            );

        if (! $role) {
            $this->error(
                'Invalid role.'
            );

            $this->line(
                'Available roles:'
            );

            foreach (
                AdminRole::cases() as $availableRole
            ) {
                $this->line(
                    ' - '
                    .$availableRole->value
                );
            }

            return self::FAILURE;
        }

        $admin =
            Admin::where(
                'email',
                $email
            )->first();

        if (! $admin) {
            $this->error(
                'Administrator not found.'
            );

            return self::FAILURE;
        }

        if (
            ! Role::where(
                'name',
                $role->value
            )
                ->where(
                    'guard_name',
                    'web'
                )
                ->exists()
        ) {
            $this->error(
                'Role does not exist. Run the RolePermissionSeeder first.'
            );

            return self::FAILURE;
        }

        $admin->syncRoles([
            $role->value,
        ]);

        $this->info(
            sprintf(
                '%s now has the %s role.',
                $admin->email,
                $role->value
            )
        );

        return self::SUCCESS;
    }
}
