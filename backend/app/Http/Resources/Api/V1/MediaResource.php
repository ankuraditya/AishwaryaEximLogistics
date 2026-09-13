<?php

namespace App\Http\Resources\Api\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MediaResource extends JsonResource
{
    public function toArray(
        Request $request
    ): array {
        $isPublicMedia =
            $this->disk ===
            'media';

        return [
            'id' => $this->id,

            'title' => $this->title,

            'alt_text' => $this->alt_text,

            'original_name' => $this->original_name,

            'mime_type' => $this->mime_type,

            'extension' => $this->extension,

            'size' => $this->size,

            'width' => $this->width,

            'height' => $this->height,

            'url' => $isPublicMedia
                    ? Storage::disk(
                        $this->disk
                    )->url(
                        $this->path
                    )
                    : null,

            'purpose' => $this->metadata[
                    'purpose'
                ] ?? null,

            'created_at' => $this
                ->created_at
                ?->toIso8601String(),
        ];
    }
}
