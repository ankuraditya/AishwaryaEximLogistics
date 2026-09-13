<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EnquiryStatusHistory extends Model
{
    protected $fillable = ['enquiry_id', 'admin_id', 'from_status', 'to_status'];

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }
}
