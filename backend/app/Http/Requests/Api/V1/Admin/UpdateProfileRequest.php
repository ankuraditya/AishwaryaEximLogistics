<?php

namespace App\Http\Requests\Api\V1\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        if (
            $this->has(
                'email'
            )
        ) {
            $this->merge([
                'email' => Str::lower(
                    trim(
                        (string)
                        $this->input(
                            'email'
                        )
                    )
                ),
            ]);
        }
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:120',
            ],

            'email' => [
                'required',
                'email',
                'max:255',

                Rule::unique(
                    'admins',
                    'email'
                )->ignore(
                    $this
                        ->user()
                        ?->id
                ),
            ],
        ];
    }
}
