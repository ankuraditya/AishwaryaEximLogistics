<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class HealthTest extends TestCase
{
    public function test_api_health_endpoint_is_available(): void
    {
        $response =
            $this->getJson(
                '/api/v1/health'
            );

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,

                'message' => 'API is running.',

                'data' => [
                    'status' => 'ok',

                    'api_version' => 'v1',
                ],
            ]);

        $this->assertNotNull(
            $response
                ->headers
                ->get(
                    'X-Request-Id'
                )
        );
    }
}
