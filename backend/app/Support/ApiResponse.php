<?php

namespace App\Support;

use Illuminate\Http\JsonResponse;

final class ApiResponse
{
    public static function success(
        mixed $data = null,
        string $message = 'Success.',
        int $status = 200,
        ?array $meta = null
    ): JsonResponse {
        $payload = [
            'success' => true,
            'message' => $message,
            'data' => $data,
        ];

        if ($meta !== null) {
            $payload['meta'] = $meta;
        }

        $requestId = request()
            ->attributes
            ->get('request_id');

        if ($requestId) {
            $payload['request_id'] =
                $requestId;
        }

        return response()->json(
            $payload,
            $status
        );
    }

    public static function created(
        mixed $data = null,
        string $message = 'Created successfully.'
    ): JsonResponse {
        return self::success(
            $data,
            $message,
            201
        );
    }

    public static function error(
        string $message,
        ?array $errors = null,
        int $status = 400
    ): JsonResponse {
        $payload = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors !== null) {
            $payload['errors'] =
                $errors;
        }

        $requestId = request()
            ->attributes
            ->get('request_id');

        if ($requestId) {
            $payload['request_id'] =
                $requestId;
        }

        return response()->json(
            $payload,
            $status
        );
    }
}
