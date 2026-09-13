<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    public function store(Request $request, string $type): JsonResponse
    {
        $type = str_replace('-', '_', $type);
        abort_unless(in_array($type, ['contact', 'product', 'quote'], true), 404);
        $data = $request->validate(['product_id' => ['nullable', 'exists:products,id'], 'name' => ['required', 'string', 'max:150'], 'company' => ['nullable', 'string', 'max:180'], 'country' => ['nullable', 'string', 'max:120'], 'email' => ['required', 'email', 'max:255'], 'phone' => ['nullable', 'string', 'max:50'], 'quantity' => ['nullable', 'string', 'max:100'], 'destination_country' => ['nullable', 'string', 'max:120'], 'subject' => ['nullable', 'string', 'max:180'], 'message' => ['required', 'string', 'max:5000'], 'consent' => ['accepted'], 'website' => ['nullable', 'max:0']]);
        unset($data['consent'], $data['website']);
        $data += ['type' => $type, 'consented_at' => now(), 'ip_hash' => hash('sha256', (string) $request->ip().config('app.key'))];
        $enquiry = Enquiry::create($data);

        return ApiResponse::created(['reference' => $enquiry->reference], 'Your enquiry has been received.');
    }
}
