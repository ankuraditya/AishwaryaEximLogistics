<?php

namespace Database\Seeders;

use App\Models\BlogCategory;
use App\Models\Category;
use App\Models\GalleryCategory;
use Illuminate\Database\Seeder;

class ContentStructureSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Indian Handicrafts', 'slug' => 'handicrafts', 'sort_order' => 10],
            ['name' => 'Biodegradable Food Packaging', 'slug' => 'biodegradable-food-packaging', 'sort_order' => 20],
            ['name' => 'Leather Purses & Bags', 'slug' => 'leather-purses-bags', 'sort_order' => 30],
            ['name' => 'Garments & Jeans', 'slug' => 'garments-jeans', 'sort_order' => 40],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(['slug' => $category['slug']], $category);
        }

        foreach ([
            ['name' => 'Bags & Totes', 'slug' => 'bags-totes', 'sort_order' => 10],
            ['name' => 'Clutches & Wallets', 'slug' => 'clutches-wallets', 'sort_order' => 20],
            ['name' => 'Folders & Accessories', 'slug' => 'folders-accessories', 'sort_order' => 30],
            ['name' => 'Traditional Artwork', 'slug' => 'traditional-artwork', 'sort_order' => 40],
        ] as $galleryCategory) {
            GalleryCategory::updateOrCreate(['slug' => $galleryCategory['slug']], $galleryCategory);
        }

        foreach ([['name' => 'Company Updates', 'slug' => 'company-updates'], ['name' => 'Export Insights', 'slug' => 'export-insights'], ['name' => 'Sustainability', 'slug' => 'sustainability']] as $blogCategory) {
            BlogCategory::updateOrCreate(['slug' => $blogCategory['slug']], $blogCategory);
        }
    }
}
