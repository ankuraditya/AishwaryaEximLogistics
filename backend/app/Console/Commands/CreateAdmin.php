<?php

namespace App\Console\Commands;

use App\Models\Admin;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class CreateAdmin extends Command
{
    protected $signature =
        'admin:create';

    protected $description =
        'Create a new CMS administrator';

    public function handle(): int
    {
        $name = trim(
            (string)
            $this->ask(
                'Admin name'
            )
        );

        $email = trim(
            (string)
            $this->ask(
                'Admin email'
            )
        );

        if (
            Admin::where(
                'email',
                $email
            )->exists()
        ) {
            $this->error(
                'An administrator with this email already exists.'
            );

            return self::FAILURE;
        }

        $password =
            (string)
            $this->secret(
                'Password'
            );

        $confirmation =
            (string)
            $this->secret(
                'Confirm password'
            );

        if (
            $password !==
            $confirmation
        ) {
            $this->error(
                'Passwords do not match.'
            );

            return self::FAILURE;
        }

        $validator =
            Validator::make(
                [
                    'name' => $name,

                    'email' => $email,

                    'password' => $password,
                ],
                [
                    'name' => [
                        'required',
                        'string',
                        'max:120',
                    ],

                    'email' => [
                        'required',
                        'email',
                        'max:255',
                    ],

                    'password' => [
                        'required',

                        Password::min(12)
                            ->mixedCase()
                            ->numbers()
                            ->symbols(),
                    ],
                ]
            );

        if (
            $validator->fails()
        ) {
            foreach (
                $validator
                    ->errors()
                    ->all() as $error
            ) {
                $this->error(
                    $error
                );
            }

            return self::FAILURE;
        }

        Admin::create([
            'name' => $name,

            'email' => $email,

            /*
             * Admin model automatically
             * hashes this through the
             * "hashed" cast.
             */
            'password' => $password,

            'is_active' => true,
        ]);

        $this->info(
            'Administrator created successfully.'
        );

        return self::SUCCESS;
    }
}
