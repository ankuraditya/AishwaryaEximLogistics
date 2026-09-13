<?php

namespace App\Services;

use App\Models\Admin;
use App\Models\Media;
use App\Models\Setting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Throwable;

class SettingsMediaService
{
    public function __construct(
        private readonly AdminActivityLogger $activityLogger,
        private readonly WebsiteSettingService $settingService
    ) {}

    public function upload(
        UploadedFile $file,
        string $purpose,
        Admin $admin,
        ?string $title = null,
        ?string $altText = null
    ): Media {
        $directory =
            match (
                $purpose
            ) {
                'logo',
                'logo_white' => 'website/logo',

                'favicon' => 'website/favicon',

                'seo_og' => 'website/seo',

                default => 'website',
            };

        $extension =
            strtolower(
                $file->extension()
            );

        $filename =
            Str::ulid()
            .'.'
            .$extension;

        $path = null;

        try {
            $path =
                $file->storeAs(
                    $directory,
                    $filename,
                    'media'
                );

            $dimensions =
                @getimagesize(
                    $file->getRealPath()
                );

            $media =
                DB::transaction(
                    function () use (
                        $file,
                        $purpose,
                        $admin,
                        $title,
                        $altText,
                        $path,
                        $extension,
                        $dimensions
                    ) {
                        return Media::create([
                            'disk' => 'media',

                            'path' => $path,

                            'original_name' => basename(
                                $file
                                    ->getClientOriginalName()
                            ),

                            'mime_type' => $file->getMimeType(),

                            'extension' => $extension,

                            'size' => $file->getSize(),

                            'width' => is_array(
                                $dimensions
                            )
                                    ? $dimensions[
                                        0
                                    ]
                                    : null,

                            'height' => is_array(
                                $dimensions
                            )
                                    ? $dimensions[
                                        1
                                    ]
                                    : null,

                            'title' => $title,

                            'alt_text' => $altText,

                            'metadata' => [
                                'purpose' => $purpose,
                            ],

                            'uploaded_by' => $admin->id,
                        ]);
                    }
                );
        } catch (Throwable $exception) {
            if ($path) {
                Storage::disk(
                    'media'
                )->delete(
                    $path
                );
            }

            throw $exception;
        }

        $this
            ->activityLogger
            ->log(
                action: 'settings.media_uploaded',

                category: 'media',

                description: 'A website settings media file was uploaded.',

                admin: $admin,

                subject: $media,

                metadata: [
                    'purpose' => $purpose,

                    'media_id' => $media->id,
                ]
            );

        return $media;
    }

    public function delete(
        Media $media,
        Admin $admin
    ): bool {
        if (
            $media->disk !==
            'media'
        ) {
            return false;
        }

        $inUse =
            Setting::query()
                ->where(
                    'type',
                    'media'
                )
                ->where(
                    'value',
                    (string)
                    $media->id
                )
                ->exists();

        if ($inUse) {
            return false;
        }

        $mediaId =
            $media->id;

        $path =
            $media->path;

        $disk =
            $media->disk;

        $media->delete();

        Storage::disk(
            $disk
        )->delete(
            $path
        );

        $this
            ->settingService
            ->clearPublicCache();

        $this
            ->activityLogger
            ->log(
                action: 'settings.media_deleted',

                category: 'media',

                description: 'A website settings media file was deleted.',

                admin: $admin,

                metadata: [
                    'media_id' => $mediaId,
                ]
            );

        return true;
    }
}
