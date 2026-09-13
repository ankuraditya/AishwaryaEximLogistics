<?php

namespace Tests\Feature\Api;

use App\Enums\AdminRole;
use App\Models\Admin;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Category;
use App\Models\Certification;
use App\Models\Enquiry;
use App\Models\Page;
use App\Models\Product;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ContentManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(RolePermissionSeeder::class);
    }

    public function test_public_catalogue_only_exposes_active_content(): void
    {
        $category = Category::create(['name' => 'Handicrafts', 'slug' => 'handicrafts']);
        Product::create(['category_id' => $category->id, 'name' => 'Painted Bag', 'slug' => 'painted-bag']);
        Product::create(['category_id' => $category->id, 'name' => 'Draft Bag', 'slug' => 'draft-bag', 'is_active' => false]);

        $this->getJson('/api/v1/products')->assertOk()->assertJsonFragment(['name' => 'Painted Bag'])->assertJsonMissing(['name' => 'Draft Bag']);
        $this->getJson('/api/v1/products/painted-bag')->assertOk();
    }

    public function test_super_admin_can_create_catalogue_records(): void
    {
        $admin = Admin::factory()->create();
        $admin->assignRole(AdminRole::SUPER_ADMIN->value);
        Sanctum::actingAs($admin);

        $categoryId = $this->postJson('/api/v1/admin/categories', ['name' => 'Leather Bags'])->assertCreated()->json('data.id');
        $this->postJson('/api/v1/admin/products', ['category_id' => $categoryId, 'name' => 'Leather Tote'])->assertCreated();

        $this->assertDatabaseHas('products', ['slug' => 'leather-tote']);
    }

    public function test_public_enquiry_is_validated_and_persisted(): void
    {
        $response = $this->postJson('/api/v1/enquiries/quote', ['name' => 'Buyer', 'email' => 'buyer@example.test', 'message' => 'Please quote 500 units.', 'consent' => true, 'website' => '']);

        $response->assertCreated()->assertJsonPath('success', true);
        $this->assertDatabaseHas('enquiries', ['email' => 'buyer@example.test', 'type' => 'quote', 'status' => 'new']);
    }

    public function test_public_blog_hides_drafts(): void
    {
        $category = BlogCategory::create(['name' => 'News', 'slug' => 'news']);
        Blog::create(['blog_category_id' => $category->id, 'title' => 'Published', 'slug' => 'published', 'content' => 'Body', 'status' => 'published', 'published_at' => now()->subMinute()]);
        Blog::create(['blog_category_id' => $category->id, 'title' => 'Draft', 'slug' => 'draft', 'content' => 'Body', 'status' => 'draft']);

        $this->getJson('/api/v1/blogs')->assertOk()->assertJsonFragment(['title' => 'Published'])->assertJsonMissing(['title' => 'Draft']);
    }

    public function test_super_admin_can_update_blog_category(): void
    {
        $admin = Admin::factory()->create();
        $admin->assignRole(AdminRole::SUPER_ADMIN->value);
        Sanctum::actingAs($admin);
        $category = BlogCategory::create(['name' => 'News', 'slug' => 'news']);

        $this->patchJson("/api/v1/admin/blogs/categories/{$category->id}", [
            'name' => 'Trade Insights',
        ])->assertOk()->assertJsonPath('data.slug', 'trade-insights');

        $this->assertDatabaseHas('blog_categories', ['name' => 'Trade Insights']);
    }

    public function test_admin_panel_shell_is_available(): void
    {
        $this->get('/admin')->assertOk()->assertSee('Aishwary CMS');
    }

    public function test_certifications_can_be_managed_and_only_active_records_are_public(): void
    {
        $admin = Admin::factory()->create();
        $admin->assignRole(AdminRole::SUPER_ADMIN->value);
        Sanctum::actingAs($admin);

        $id = $this->postJson('/api/v1/admin/certifications', [
            'code' => 'IEC',
            'title' => 'Import Export Code',
        ])->assertCreated()->json('data.id');

        $this->patchJson("/api/v1/admin/certifications/{$id}", [
            'code' => 'IEC',
            'title' => 'Import and Export Registration',
            'is_active' => true,
        ])->assertOk();

        Certification::create(['code' => 'OLD', 'title' => 'Inactive record', 'is_active' => false]);
        $this->getJson('/api/v1/certifications')
            ->assertOk()
            ->assertJsonFragment(['code' => 'IEC'])
            ->assertJsonMissing(['code' => 'OLD']);
    }

    public function test_pages_and_sections_can_be_managed_and_delivered_publicly(): void
    {
        $admin = Admin::factory()->create();
        $admin->assignRole(AdminRole::SUPER_ADMIN->value);
        Sanctum::actingAs($admin);

        $pageId = $this->postJson('/api/v1/admin/pages', [
            'title' => 'About Aishwary',
            'sections' => [[
                'section_key' => 'story',
                'heading' => 'Our export story',
                'body' => 'Managed from the CMS.',
            ]],
        ])->assertCreated()->assertJsonPath('data.sections.0.section_key', 'story')->json('data.id');

        $this->getJson('/api/v1/pages/about-aishwary')
            ->assertOk()
            ->assertJsonPath('data.sections.0.heading', 'Our export story');
        $this->assertDatabaseHas('pages', ['id' => $pageId, 'slug' => 'about-aishwary']);
    }

    public function test_page_section_updates_are_immediately_delivered_to_the_frontend(): void
    {
        $admin = Admin::factory()->create();
        $admin->assignRole(AdminRole::SUPER_ADMIN->value);
        Sanctum::actingAs($admin);

        $page = Page::create(['title' => 'Home', 'slug' => 'home', 'is_active' => true]);
        $page->sections()->create(['section_key' => 'hero', 'heading' => 'Original heading']);

        $this->patchJson("/api/v1/admin/pages/{$page->id}", [
            'title' => 'Home',
            'slug' => 'home',
            'is_active' => true,
            'sections' => [[
                'section_key' => 'hero',
                'heading' => 'Updated from CMS',
                'body' => 'Updated body copy.',
            ]],
        ])->assertOk();

        $this->getJson('/api/v1/pages/home')
            ->assertOk()
            ->assertJsonPath('data.sections.0.heading', 'Updated from CMS')
            ->assertJsonPath('data.sections.0.body', 'Updated body copy.');
    }

    public function test_configured_frontend_origin_is_allowed_by_cors(): void
    {
        config(['cors.allowed_origins' => ['http://127.0.0.1:5173']]);

        $this->withHeader('Origin', 'http://127.0.0.1:5173')
            ->getJson('/api/v1/products')
            ->assertOk()
            ->assertHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    }

    public function test_products_support_structured_specs_and_catalogue_delivery(): void
    {
        $admin = Admin::factory()->create();
        $admin->assignRole(AdminRole::SUPER_ADMIN->value);
        Sanctum::actingAs($admin);
        $category = Category::create(['name' => 'Packaging', 'slug' => 'packaging']);

        $this->postJson('/api/v1/admin/products', [
            'category_id' => $category->id,
            'name' => 'Bagasse Plate',
            'specifications' => [
                ['label' => 'Diameter', 'value' => '10 inches'],
                ['label' => 'MOQ', 'value' => '1,000 pieces'],
            ],
        ])->assertCreated()->assertJsonCount(2, 'data.specifications');

        $this->getJson('/api/v1/products/bagasse-plate')
            ->assertOk()
            ->assertJsonPath('data.specifications.0.label', 'Diameter');
    }

    public function test_lead_can_be_assigned_noted_and_tracks_status_history(): void
    {
        $admin = Admin::factory()->create();
        $admin->assignRole(AdminRole::SUPER_ADMIN->value);
        Sanctum::actingAs($admin);
        $enquiry = Enquiry::create(['type' => 'quote', 'reference' => 'AEL-TEST-1', 'name' => 'Buyer', 'email' => 'buyer@example.test', 'message' => 'Need pricing', 'status' => 'new', 'consented_at' => now()]);

        $this->patchJson("/api/v1/admin/enquiries/{$enquiry->id}", [
            'status' => 'contacted',
            'assigned_to' => $admin->id,
        ])->assertOk()->assertJsonPath('data.assignee.id', $admin->id);
        $this->postJson("/api/v1/admin/enquiries/{$enquiry->id}/notes", ['note' => 'Buyer called and requirements confirmed.'])
            ->assertCreated();

        $this->getJson("/api/v1/admin/enquiries/{$enquiry->id}")
            ->assertOk()
            ->assertJsonPath('data.status_history.0.to_status', 'contacted')
            ->assertJsonPath('data.notes.0.note', 'Buyer called and requirements confirmed.');
    }
}
