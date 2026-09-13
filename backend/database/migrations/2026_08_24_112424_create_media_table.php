<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(
            'media',
            function (
                Blueprint $table
            ) {
                $table->id();

                $table->string(
                    'disk',
                    50
                )->default(
                    'media'
                );

                $table->string(
                    'path'
                )->unique();

                $table->string(
                    'original_name'
                )->nullable();

                $table->string(
                    'mime_type',
                    100
                )->nullable();

                $table->string(
                    'extension',
                    20
                )->nullable();

                $table
                    ->unsignedBigInteger(
                        'size'
                    )
                    ->nullable();

                $table
                    ->unsignedInteger(
                        'width'
                    )
                    ->nullable();

                $table
                    ->unsignedInteger(
                        'height'
                    )
                    ->nullable();

                $table->string(
                    'title'
                )->nullable();

                $table->string(
                    'alt_text',
                    500
                )->nullable();

                $table->json(
                    'metadata'
                )->nullable();

                $table->foreignId(
                    'uploaded_by'
                )
                    ->nullable()
                    ->constrained(
                        'admins'
                    )
                    ->nullOnDelete();

                $table->timestamps();

                $table->index(
                    'disk'
                );
            }
        );
    }

    public function down(): void
    {
        Schema::dropIfExists(
            'media'
        );
    }
};
