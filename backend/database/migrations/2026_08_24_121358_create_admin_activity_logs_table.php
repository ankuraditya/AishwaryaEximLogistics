<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(
            'admin_activity_logs',
            function (
                Blueprint $table
            ) {
                $table->id();

                $table
                    ->foreignId(
                        'admin_id'
                    )
                    ->nullable()
                    ->constrained(
                        'admins'
                    )
                    ->nullOnDelete();

                $table->string(
                    'category',
                    80
                )->index();

                $table->string(
                    'action',
                    120
                )->index();

                $table->string(
                    'description',
                    500
                );

                $table
                    ->nullableMorphs(
                        'subject'
                    );

                $table->string(
                    'ip_address',
                    45
                )->nullable();

                $table->text(
                    'user_agent'
                )->nullable();

                $table->uuid(
                    'request_id'
                )->nullable()
                    ->index();

                $table->json(
                    'metadata'
                )->nullable();

                $table
                    ->timestamp(
                        'created_at'
                    )
                    ->useCurrent()
                    ->index();
            }
        );
    }

    public function down(): void
    {
        Schema::dropIfExists(
            'admin_activity_logs'
        );
    }
};
