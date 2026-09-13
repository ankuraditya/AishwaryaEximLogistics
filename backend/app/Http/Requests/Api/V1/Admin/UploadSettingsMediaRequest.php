<?php

namespace App\Http\Requests\Api\V1\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class UploadSettingsMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $purpose =
            $this->input(
                'purpose'
            );

        $fileRule =
            File::image()
                ->types([
                    'jpg',
                    'jpeg',
                    'png',
                    'webp',
                ]);

        if (
            $purpose ===
            'favicon'
        ) {
            $fileRule =
                $fileRule
                    ->max('1mb')
                    ->dimensions(
                        Rule::dimensions()
                            ->minWidth(32)
                            ->minHeight(32)
                            ->maxWidth(1024)
                            ->maxHeight(1024)
                    );
        } else {
            $fileRule =
                $fileRule
                    ->max('5mb')
                    ->dimensions(
                        Rule::dimensions()
                            ->maxWidth(6000)
                            ->maxHeight(6000)
                    );
        }

        return [
            'purpose' => [
                'required',

                Rule::in([
                    'logo',
                    'logo_white',
                    'favicon',
                    'seo_og',
                    'product',
                    'gallery',
                    'blog',
                    'general',
                ]),
            ],

            'file' => [
                'required',
                $fileRule,
            ],

            'title' => [
                'nullable',
                'string',
                'max:255',
            ],

            'alt_text' => [
                'nullable',
                'string',
                'max:500',
            ],
        ];
    }
}
