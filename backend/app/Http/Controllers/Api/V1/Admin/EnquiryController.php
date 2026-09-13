<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Enquiry;
use App\Support\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class EnquiryController extends Controller
{
    public function export(Request $request): StreamedResponse
    {
        $filename = 'aishwary-enquiries-'.now()->format('Y-m-d-His').'.csv';

        return response()->streamDownload(function () use ($request) {
            $output = fopen('php://output', 'w');
            fputcsv($output, ['Reference', 'Type', 'Name', 'Company', 'Country', 'Email', 'Phone', 'Quantity', 'Destination', 'Subject', 'Status', 'Received']);
            Enquiry::query()
                ->when($request->filled('status'), fn ($query) => $query->where('status', $request->string('status')))
                ->latest()
                ->chunk(250, function ($enquiries) use ($output) {
                    foreach ($enquiries as $enquiry) {
                        fputcsv($output, [$enquiry->reference, $enquiry->type, $enquiry->name, $enquiry->company, $enquiry->country, $enquiry->email, $enquiry->phone, $enquiry->quantity, $enquiry->destination_country, $enquiry->subject, $enquiry->status, $enquiry->created_at?->toIso8601String()]);
                    }
                });
            fclose($output);
        }, $filename, ['Content-Type' => 'text/csv; charset=UTF-8']);
    }

    public function index(Request $request): JsonResponse
    {
        $items = Enquiry::with(['product:id,name,slug', 'assignee:id,name,email'])->when($request->filled('status'), fn ($q) => $q->where('status', $request->string('status')))->when($request->filled('type'), fn ($q) => $q->where('type', $request->string('type')))->latest()->paginate(min($request->integer('per_page', 30), 100));

        return ApiResponse::success($items);
    }

    public function show(Enquiry $enquiry): JsonResponse
    {
        return ApiResponse::success($enquiry->load(['product', 'assignee:id,name,email', 'notes.admin:id,name', 'statusHistory.admin:id,name']));
    }

    public function update(Request $request, Enquiry $enquiry): JsonResponse
    {
        $previousStatus = $enquiry->status;
        $data = $request->validate(['status' => ['sometimes', Rule::in(['new', 'contacted', 'quotation_sent', 'follow_up', 'converted', 'closed'])], 'internal_notes' => ['nullable', 'string', 'max:5000'], 'assigned_to' => ['nullable', 'exists:admins,id']]);
        $enquiry->update($data);
        if (isset($data['status']) && $data['status'] !== $previousStatus) {
            $enquiry->statusHistory()->create(['admin_id' => $request->user()->id, 'from_status' => $previousStatus, 'to_status' => $data['status']]);
        }

        return ApiResponse::success($enquiry->fresh(['product', 'assignee:id,name,email', 'notes.admin:id,name', 'statusHistory.admin:id,name']));
    }

    public function storeNote(Request $request, Enquiry $enquiry): JsonResponse
    {
        $data = $request->validate(['note' => ['required', 'string', 'max:5000']]);
        $note = $enquiry->notes()->create(['admin_id' => $request->user()->id, 'note' => $data['note']]);

        return ApiResponse::created($note->load('admin:id,name'), 'Lead note added successfully.');
    }

    public function assignees(): JsonResponse
    {
        return ApiResponse::success(Admin::where('is_active', true)->orderBy('name')->get(['id', 'name', 'email'])->map(fn (Admin $admin) => [
            'id' => $admin->id,
            'name' => $admin->name,
            'email' => $admin->email,
            'roles' => $admin->getRoleNames()->values(),
        ]));
    }
}
