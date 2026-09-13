<?php

namespace App\Http\Resources\Api\V1\Admin;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminActivityLogResource extends JsonResource
{
    public function toArray(
        Request $request
    ): array {
        return [
            'id' => $this->id,

            'category' => $this->category,

            'action' => $this->action,

            'description' => $this->description,

            'admin' => $this->admin
                    ? [
                        'id' => $this
                            ->admin
                            ->id,

                        'name' => $this
                            ->admin
                            ->name,
                    ]
                    : null,

            'subject' => [
                'type' => $this->subject_type
                        ? class_basename(
                            $this->subject_type
                        )
                        : null,

                'id' => $this->subject_id,
            ],

            'ip_address' => $this->ip_address,

            'user_agent' => $this->user_agent,

            'request_id' => $this->request_id,

            'metadata' => $this->metadata,

            'created_at' => $this
                ->created_at
                ?->toIso8601String(),
        ];
    }
}
