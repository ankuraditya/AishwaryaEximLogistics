<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'group',
        'type',
        'value',
        'is_public',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'is_public' => 'boolean',

            'sort_order' => 'integer',
        ];
    }

    public function scopePublic(
        Builder $query
    ): Builder {
        return $query->where(
            'is_public',
            true
        );
    }

    public function scopeForGroup(
        Builder $query,
        string $group
    ): Builder {
        return $query->where(
            'group',
            $group
        );
    }
}
