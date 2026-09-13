<?php

namespace App\Http\Requests\Api\V1\Admin;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;

class ConfirmPasswordRequest extends FormRequest
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
        ];
    }
}
