<?php

namespace App\Http\Requests\Api\V1\Admin;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class ChangePasswordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'current_password' => [
                'required',
                'string',

                function (
                    string $attribute,
                    mixed $value,
                    Closure $fail
                ): void {
                    $admin =
                        $this->user();

                    if (
                        ! $admin
                        ||
                        ! Hash::check(
                            (string)
                            $value,
                            $admin->password
                        )
                    ) {
                        $fail(
                            'The current password is incorrect.'
                        );
                    }
                },
            ],

            'password' => [
                'required',
                'string',
                'confirmed',
                'different:current_password',
                'max:255',

                Password::min(12)
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
        ];
    }
}
