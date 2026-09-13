<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Enquiry extends Model
{
    protected $fillable = ['reference', 'type', 'product_id', 'name', 'company', 'country', 'email', 'phone', 'quantity', 'destination_country', 'subject', 'message', 'status', 'assigned_to', 'internal_notes', 'consented_at', 'consent_version', 'ip_hash'];

    protected $hidden = ['ip_hash'];

    protected function casts(): array
    {
        return ['consented_at' => 'datetime'];
    }

    protected static function booted(): void
    {
        static::creating(fn (self $enquiry) => $enquiry->reference ??= (string) Str::ulid());
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function assignee(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'assigned_to');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(EnquiryNote::class)->latest();
    }

    public function statusHistory(): HasMany
    {
        return $this->hasMany(EnquiryStatusHistory::class)->latest();
    }
}
