<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EnquiryNote extends Model
{
    protected $fillable = ['enquiry_id', 'admin_id', 'note'];

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }
}
