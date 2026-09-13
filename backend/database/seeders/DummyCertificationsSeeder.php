<?php

namespace Database\Seeders;

use App\Models\Certification;
use App\Models\Media;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DummyCertificationsSeeder extends Seeder
{
    public function run(): void
    {
        $documents = [
            ['GST', 'GST Registration', 'SAMPLE GST registration document for layout demonstration.', '00SAMPLE0000X0ZX', 'certifications/sample-gst-registration.png', 1054, 1492],
            ['MSME', 'MSME / Udyam Registration', 'SAMPLE MSME credential for layout demonstration.', 'SAMPLE-BR-00-0000000', 'certifications/sample-msme-udyam.png', 1055, 1491],
            ['IEC', 'Import Export Code', 'SAMPLE import-export credential for layout demonstration.', 'SAMPLE0000', 'certifications/sample-import-export-code.png', 1055, 1491],
            ['DEMO', 'Business Compliance Certificate', 'SAMPLE business document for layout demonstration.', 'DEMO-0001', 'certifications/sample-business-compliance.png', 1055, 1491],
        ];

        foreach ($documents as $sortOrder => [$code, $title, $description, $number, $path, $width, $height]) {
            if (! Storage::disk('media')->exists($path)) {
                $source = database_path('seeders/assets/'.$path);

                if (! is_file($source)) {
                    continue;
                }

                Storage::disk('media')->put($path, file_get_contents($source));
            }

            $media = Media::updateOrCreate(
                ['path' => $path],
                [
                    'disk' => 'media',
                    'original_name' => basename($path),
                    'mime_type' => 'image/png',
                    'extension' => 'png',
                    'size' => Storage::disk('media')->size($path),
                    'width' => $width,
                    'height' => $height,
                    'title' => $title.' — Sample',
                    'alt_text' => $title.' sample document; not a legal document',
                    'metadata' => ['purpose' => 'general', 'sample' => true],
                ]
            );

            Certification::updateOrCreate(
                ['code' => $code],
                [
                    'media_id' => $media->id,
                    'title' => $title,
                    'description' => $description,
                    'registration_number' => $number,
                    'is_active' => true,
                    'sort_order' => ($sortOrder + 1) * 10,
                ]
            );
        }
    }
}
