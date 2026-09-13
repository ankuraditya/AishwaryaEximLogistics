<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certification extends Model
{
    protected $fillable = [
        'media_id', 'code', 'title', 'description', 'registration_number',
        'issued_at', 'expires_at', 'is_active', 'sort_order',
    ];

    protected function casts(): array
    {
        return ['issued_at' => 'date', 'expires_at' => 'date', 'is_active' => 'boolean'];
    }

    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class);
    }
}
