<?php

namespace App\Http\Requests\Api\V1\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ActivityLogIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'category' => [
                'nullable',
                'string',
                'max:80',
            ],

            'action' => [
                'nullable',
                'string',
                'max:120',
            ],

            'admin_id' => [
                'nullable',
                'integer',

                Rule::exists(
                    'admins',
                    'id'
                ),
            ],

            'per_page' => [
                'nullable',
                'integer',
                'min:1',
                'max:100',
            ],
        ];
    }
}
