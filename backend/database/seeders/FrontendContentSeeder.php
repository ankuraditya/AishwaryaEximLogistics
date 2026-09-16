<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Category;
use App\Models\GalleryCategory;
use App\Models\GalleryItem;
use App\Models\Media;
use App\Models\Page;
use App\Models\Product;
use App\Models\Setting;
use App\Models\Subcategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class FrontendContentSeeder extends Seeder
{
    public function run(): void
    {
        Media::where('disk', 'public')->where('path', 'like', 'seed/handicrafts/%')->delete();
        foreach (['contact.email' => 'info@aishexim.com', 'contact.phone' => '+91 92059 94175', 'contact.whatsapp' => '+91 92059 94175', 'contact.address' => 'C 119, Police Colony Rd, B Sector, Police Colony, Anisabad, Patna, Bihar 800002, India'] as $key => $value) {
            Setting::where('key', $key)->update(['value' => $value]);
        }

        $categories = [
            ['handicrafts', 'Indian Handicrafts', 'Explore hand-painted bags, purses, clutches, accessories and traditional Indian folk-art products.', [['hand-painted-bags', 'Hand-Painted Bags'], ['tote-bags', 'Tote Bags'], ['purses-clutches', 'Purses & Clutches'], ['folders-accessories', 'Folders & Accessories'], ['decorative-artwork', 'Decorative Artwork']]],
            ['biodegradable-food-packaging', 'Biodegradable Food Packaging', 'Explore food-service packaging categories intended for buyers seeking biodegradable and sustainability-focused alternatives.', [['plates', 'Plates'], ['bowls', 'Bowls'], ['containers', 'Containers'], ['trays', 'Trays'], ['cups', 'Cups'], ['cutlery', 'Cutlery']]],
            ['leather-purses-bags', 'Leather Purses & Bags', 'Explore handbags, purses, wallets, tote bags and business-bag sourcing categories.', [['handbags', 'Handbags'], ['purses', 'Purses'], ['wallets', 'Wallets'], ['leather-tote-bags', 'Tote Bags'], ['business-bags', 'Business Bags']]],
            ['garments-jeans', 'Garments & Jeans', 'Explore jeans, denim and garment categories for B2B and buyer-specific sourcing requirements.', [['mens-jeans', "Men's Jeans"], ['womens-jeans', "Women's Jeans"], ['denim', 'Denim Collection'], ['mens-garments', "Men's Garments"], ['womens-garments', "Women's Garments"]]],
        ];

        $categoryModels = [];
        $subcategoryModels = [];
        foreach ($categories as $categoryIndex => [$slug, $name, $description, $subcategories]) {
            $categoryModels[$slug] = Category::updateOrCreate(['slug' => $slug], ['name' => $name, 'description' => $description, 'is_active' => true, 'sort_order' => ($categoryIndex + 1) * 10]);
            foreach ($subcategories as $subcategoryIndex => [$subcategorySlug, $subcategoryName]) {
                $key = $slug.':'.$subcategorySlug;
                $subcategoryModels[$key] = Subcategory::updateOrCreate(['slug' => $slug.'-'.$subcategorySlug], ['category_id' => $categoryModels[$slug]->id, 'name' => $subcategoryName, 'is_active' => true, 'sort_order' => ($subcategoryIndex + 1) * 10]);
            }
        }

        $products = [
            ['HC-MDH-025', 'madhubani-fish-lotus-handbag', 'Madhubani Fish & Lotus Handbag', 'handicrafts', 'hand-painted-bags', 'A beautifully handcrafted statement handbag featuring vibrant twin-fish and lotus Madhubani artwork.', 25],
            ['HC-MDH-026', 'hand-painted-madhubani-pouches', 'Hand-Painted Madhubani Pouches', 'handicrafts', 'purses-clutches', 'A colourful set of hand-painted pouches featuring intricate fish, bird, floral and geometric Madhubani motifs.', 26],
            ['HC-MDH-027', 'madhubani-art-tote-bags', 'Madhubani Art Tote Bags', 'handicrafts', 'tote-bags', 'Eco-friendly natural-fibre tote bags adorned with expressive traditional Madhubani artwork.', 27],
            ['HC-MDH-028', 'traditional-madhubani-painting', 'Traditional Madhubani Painting', 'handicrafts', 'decorative-artwork', 'A framed handmade Madhubani painting celebrating Indian cultural heritage through vivid figures and folk-art borders.', 28],
            ['HC-MDH-029', 'decorative-madhubani-plate', 'Decorative Madhubani Plate', 'handicrafts', 'decorative-artwork', 'A vibrant hand-painted decorative plate featuring the sun, fish and a traditional Madhubani figure.', 29],
            ['HC-MDH-030', 'hand-painted-madhubani-tray', 'Hand-Painted Madhubani Tray', 'handicrafts', 'decorative-artwork', 'An elegant serving and décor tray painted with a detailed tree-of-life, birds and deer composition.', 30],
            ['AEL-HC-001', 'hand-painted-fish-pattern-handbag', 'Hand-Painted Fish Pattern Handbag', 'handicrafts', 'hand-painted-bags', 'A colourful hand-painted handbag featuring a distinctive fish-inspired folk-art composition.', 1],
            ['AEL-HC-002', 'yellow-fish-motif-clutch', 'Yellow Fish Motif Clutch', 'handicrafts', 'purses-clutches', 'A vibrant hand-painted clutch featuring traditional fish-inspired artwork and colourful detailing.', 2],
            ['AEL-HC-003', 'traditional-hand-painted-tote-bag', 'Traditional Hand-Painted Tote Bag', 'handicrafts', 'tote-bags', 'A large tote-style handicraft bag featuring traditional Indian hand-painted visual elements.', 3],
            ['AEL-HC-004', 'hand-painted-purse-clutch-collection', 'Hand-Painted Purse & Clutch Collection', 'handicrafts', 'purses-clutches', 'A coordinated collection of colourful hand-painted purses and clutches with Indian folk-art motifs.', 4],
            ['AEL-HC-005', 'traditional-handbag-collection', 'Traditional Handbag Collection', 'handicrafts', 'hand-painted-bags', 'A collection of handcrafted bags featuring colourful traditional artwork and decorative detailing.', 5],
            ['AEL-HC-006', 'wooden-handle-hand-painted-bags', 'Wooden Handle Hand-Painted Bags', 'handicrafts', 'hand-painted-bags', 'Decorative handbags featuring wooden handles and expressive hand-painted Indian artwork.', 6],
            ['AEL-HC-007', 'traditional-folk-artwork-collection', 'Traditional Folk Artwork Collection', 'handicrafts', 'decorative-artwork', 'A colourful collection presenting traditional figurative and folk-art-inspired decorative artwork.', 7],
            ['AEL-HC-008', 'colourful-handicraft-artwork', 'Colourful Handicraft Artwork', 'handicrafts', 'decorative-artwork', 'A vibrant handicraft piece showcasing colourful Indian artistic character and traditional visual motifs.', 8],
            ['AEL-BP-001', 'biodegradable-round-plates', 'Biodegradable Round Plates', 'biodegradable-food-packaging', 'plates', 'Food-service plate category available for bulk and institutional product sourcing discussions.', null],
            ['AEL-BP-002', 'biodegradable-food-bowls', 'Biodegradable Food Bowls', 'biodegradable-food-packaging', 'bowls', 'Food bowl category intended for food-service, distribution and bulk packaging requirements.', null],
            ['AEL-BP-003', 'takeaway-food-containers', 'Takeaway Food Containers', 'biodegradable-food-packaging', 'containers', 'Takeaway food-container category for buyer-specific packaging and quantity requirements.', null],
            ['AEL-BP-004', 'food-service-meal-trays', 'Food Service Meal Trays', 'biodegradable-food-packaging', 'trays', 'Meal-tray category for catering, institutional and food-service sourcing enquiries.', null],
            ['AEL-BP-005', 'food-service-cups', 'Food Service Cups', 'biodegradable-food-packaging', 'cups', 'Cup category for buyer-specific food-service packaging enquiries and commercial discussions.', null],
            ['AEL-BP-006', 'biodegradable-cutlery-range', 'Biodegradable Cutlery Range', 'biodegradable-food-packaging', 'cutlery', 'Cutlery product category structured for bulk food-service and distributor sourcing requirements.', null],
            ['AEL-LB-001', 'classic-leather-handbag', 'Classic Leather Handbag', 'leather-purses-bags', 'handbags', 'A leather handbag sourcing category for buyer-specific styling, quantity and product requirements.', null],
            ['AEL-LB-002', 'leather-purse-collection', 'Leather Purse Collection', 'leather-purses-bags', 'purses', 'A purse sourcing category intended for wholesale, distribution and customised buyer discussions.', null],
            ['AEL-LB-003', 'leather-wallet-collection', 'Leather Wallet Collection', 'leather-purses-bags', 'wallets', 'Wallet product category for commercial sourcing requirements and buyer-specific product discussions.', null],
            ['AEL-LB-004', 'leather-tote-bag', 'Leather Tote Bag', 'leather-purses-bags', 'leather-tote-bags', 'Leather tote-bag category available for bulk and buyer-specific sourcing enquiries.', null],
            ['AEL-LB-005', 'leather-business-bag', 'Leather Business Bag', 'leather-purses-bags', 'business-bags', 'Professional business-bag category intended for commercial and bulk sourcing discussions.', null],
            ['AEL-GJ-001', 'mens-denim-jeans', "Men's Denim Jeans", 'garments-jeans', 'mens-jeans', "Men's denim jeans category for bulk and buyer-specific garment sourcing requirements.", null],
            ['AEL-GJ-002', 'womens-denim-jeans', "Women's Denim Jeans", 'garments-jeans', 'womens-jeans', "Women's denim jeans category structured for wholesale and buyer-specific sourcing enquiries.", null],
            ['AEL-GJ-003', 'denim-collection', 'Denim Collection', 'garments-jeans', 'denim', 'A broader denim sourcing category for buyers exploring different garment and jeans requirements.', null],
            ['AEL-GJ-004', 'mens-garment-collection', "Men's Garment Collection", 'garments-jeans', 'mens-garments', "Men's garment category available for buyer-specific product, quantity and sourcing discussions.", null],
            ['AEL-GJ-005', 'womens-garment-collection', "Women's Garment Collection", 'garments-jeans', 'womens-garments', "Women's garment category intended for wholesale, distribution and other B2B sourcing requirements.", null],
        ];

        $productModels = [];
        foreach ($products as $index => [$sku, $slug, $name, $categorySlug, $subcategorySlug, $description, $imageNumber]) {
            $product = Product::updateOrCreate(['slug' => $slug], ['category_id' => $categoryModels[$categorySlug]->id, 'subcategory_id' => $subcategoryModels[$categorySlug.':'.$subcategorySlug]->id, 'sku' => $sku, 'name' => $name, 'short_description' => $description, 'description' => $description, 'country_of_origin' => 'India', 'is_active' => true, 'is_featured' => $index < 4, 'sort_order' => ($index + 1) * 10]);
            if ($imageNumber) {
                $media = $this->seedImage($imageNumber, $name);
                if ($media) {
                    $product->media()->sync([$media->id => ['is_primary' => true, 'sort_order' => 0]]);
                }
            }
            $productModels[$slug] = $product;
        }

        $galleryCategories = [];
        foreach ([['bags-totes', 'Bags & Totes'], ['clutches-wallets', 'Clutches & Wallets'], ['folders-accessories', 'Folders & Accessories'], ['traditional-artwork', 'Traditional Artwork']] as $index => [$slug, $name]) {
            $galleryCategories[$slug] = GalleryCategory::updateOrCreate(['slug' => $slug], ['name' => $name, 'is_active' => true, 'sort_order' => ($index + 1) * 10]);
        }
        $galleryMap = ['bags-totes', 'clutches-wallets', 'bags-totes', 'clutches-wallets', 'bags-totes', 'bags-totes', 'traditional-artwork', 'traditional-artwork', 'folders-accessories', 'traditional-artwork', 'traditional-artwork', 'traditional-artwork'];
        $galleryTitles = ['Fish Pattern Hand-Painted Handbag', 'Yellow Fish Motif Clutch', 'Traditional Hand-Painted Tote', 'Hand-Painted Purse & Clutch Collection', 'Traditional Handbag Collection', 'Wooden Handle Hand-Painted Bags', 'Traditional Folk Artwork Collection', 'Colourful Handicraft Artwork', 'Hand-Painted Folders & Accessories', 'Figurative Traditional Artwork', 'Traditional Fish Artwork', 'Decorative Madhubani Collection'];
        $galleryProductSlugs = ['hand-painted-fish-pattern-handbag', 'yellow-fish-motif-clutch', 'traditional-hand-painted-tote-bag', 'hand-painted-purse-clutch-collection', 'traditional-handbag-collection', 'wooden-handle-hand-painted-bags', 'traditional-folk-artwork-collection', 'colourful-handicraft-artwork'];
        foreach ($galleryTitles as $index => $title) {
            $media = $this->seedImage($index + 1, $title);
            if (! $media) {
                continue;
            }
            GalleryItem::updateOrCreate(['media_id' => $media->id], ['gallery_category_id' => $galleryCategories[$galleryMap[$index]]->id, 'product_id' => isset($galleryProductSlugs[$index]) ? $productModels[$galleryProductSlugs[$index]]->id : null, 'title' => $title, 'caption' => 'Original Indian handicraft artwork from the Aishwary collection.', 'is_featured' => $index < 4, 'is_active' => true, 'sort_order' => ($index + 1) * 10]);
        }

        $newGalleryItems = [
            [25, 'bags-totes', 'madhubani-fish-lotus-handbag', 'Madhubani Fish & Lotus Handbag'],
            [26, 'clutches-wallets', 'hand-painted-madhubani-pouches', 'Hand-Painted Madhubani Pouches'],
            [27, 'bags-totes', 'madhubani-art-tote-bags', 'Madhubani Art Tote Bags'],
            [28, 'traditional-artwork', 'traditional-madhubani-painting', 'Traditional Madhubani Painting'],
            [29, 'traditional-artwork', 'decorative-madhubani-plate', 'Decorative Madhubani Plate'],
            [30, 'traditional-artwork', 'hand-painted-madhubani-tray', 'Hand-Painted Madhubani Tray'],
        ];
        foreach ($newGalleryItems as $index => [$imageNumber, $galleryCategorySlug, $productSlug, $title]) {
            $media = $this->seedImage($imageNumber, $title);
            if (! $media) {
                continue;
            }
            GalleryItem::updateOrCreate(['media_id' => $media->id], ['gallery_category_id' => $galleryCategories[$galleryCategorySlug]->id, 'product_id' => $productModels[$productSlug]->id, 'title' => $title, 'caption' => 'Madhubani-inspired Indian craftsmanship from the Aishwary product collection.', 'is_featured' => $index < 3, 'is_active' => true, 'sort_order' => $index + 1]);
        }

        $blogCategories = [];
        foreach ([['handicrafts', 'Handicrafts'], ['sustainability', 'Sustainability'], ['export-sourcing', 'Export & Sourcing'], ['buyer-guides', 'Buyer Guides'], ['company-updates', 'Company Updates']] as [$slug, $name]) {
            $blogCategories[$slug] = BlogCategory::updateOrCreate(['slug' => $slug], ['name' => $name]);
        }
        foreach ([
            ['indian-handicrafts-modern-b2b-product-sourcing', 'Indian Handicrafts in Modern B2B Product Sourcing', 'handicrafts', 'Indian handicrafts combine visual identity, craftsmanship and product differentiation for specialised B2B sourcing requirements.'],
            ['what-buyers-should-include-product-sourcing-enquiry', 'What Buyers Should Include in a Product Sourcing Enquiry', 'buyer-guides', 'A well-structured enquiry can significantly improve the quality and speed of a product sourcing discussion.'],
            ['why-businesses-explore-biodegradable-food-packaging', 'Why Businesses Are Exploring Biodegradable Food Packaging', 'sustainability', 'A practical introduction to sustainable alternatives for food-service packaging buyers.'],
            ['understanding-export-focused-product-sourcing', 'Understanding Export-Focused Product Sourcing', 'export-sourcing', 'Key information buyers and suppliers should clarify during an export-oriented sourcing discussion.'],
            ['building-better-product-catalogue-international-buyers', 'Building a Better Product Catalogue for International Buyers', 'buyer-guides', 'An export-oriented product catalogue should help buyers evaluate products and make meaningful enquiries.'],
        ] as $index => [$slug, $title, $categorySlug, $excerpt]) {
            Blog::updateOrCreate(['slug' => $slug], ['blog_category_id' => $blogCategories[$categorySlug]->id, 'title' => $title, 'excerpt' => $excerpt, 'content' => json_encode([['type' => 'paragraph', 'text' => $excerpt], ['type' => 'heading', 'text' => 'Supporting better sourcing decisions'], ['type' => 'paragraph', 'text' => 'Clear product information, specifications, quantities, packaging expectations and destination details help create efficient commercial discussions.']]), 'status' => 'published', 'published_at' => now()->subDays(10 - $index)]);
        }

        foreach ([['home', 'Home'], ['about-us', 'About Us'], ['export-logistics', 'Export & Logistics'], ['quality-compliance', 'Quality & Compliance'], ['global-reach', 'Global Reach'], ['contact-us', 'Contact Us'], ['handicrafts-gallery', 'Handicrafts Gallery'], ['gallery', 'Media Gallery'], ['blog', 'Blog & Insights'], ['request-a-quote', 'Request a Quote']] as [$slug, $title]) {
            $pages[$slug] = Page::updateOrCreate(['slug' => $slug], ['title' => $title, 'summary' => "Manage the {$title} page content and sections from the CMS.", 'is_active' => true]);
        }

        $pages['home']->sections()->updateOrCreate(['section_key' => 'why_choose'], ['eyebrow' => 'Why Aishwary', 'heading' => 'Built Around the Requirements of Business Buyers.', 'body' => 'Our approach combines diversified Indian product sourcing with structured communication and an export-oriented buyer journey.', 'content' => [
            ['title' => 'Export-Focused Approach', 'description' => 'Our digital and sourcing approach is designed around the requirements of B2B buyers and international business discussions.'],
            ['title' => 'Multi-Category Portfolio', 'description' => 'Access handicrafts, sustainable packaging, leather goods and garments through one organised business platform.'],
            ['title' => 'Requirement-Based Sourcing', 'description' => 'Buyer requirements can be discussed around product type, specifications, quantity, packaging and customisation.'],
            ['title' => 'Quality-Conscious Process', 'description' => 'Product selection and supply discussions are structured around agreed specifications and buyer expectations.'],
            ['title' => 'Buyer-Focused Communication', 'description' => 'Clear communication is maintained from initial enquiry through commercial discussion and shipment coordination.'],
            ['title' => 'Bulk & B2B Enquiries', 'description' => 'The platform is designed for wholesalers, importers, distributors, institutions and other business buyers.'],
        ], 'is_active' => true, 'sort_order' => 20]);
        $pages['home']->sections()->updateOrCreate(['section_key' => 'export_process'], ['eyebrow' => 'How We Work', 'heading' => 'A Clear Path From Requirement to Shipment.', 'body' => 'A structured buyer journey keeps sourcing discussions organised from the first enquiry through order and logistics coordination.', 'content' => [
            ['number' => '01', 'title' => 'Share Requirement', 'description' => 'Tell us the product, approximate quantity, destination and any specific customisation or packaging requirements.'],
            ['number' => '02', 'title' => 'Product Selection', 'description' => 'Suitable products, specifications and available options are identified for the buyer requirement.'],
            ['number' => '03', 'title' => 'Commercial Discussion', 'description' => 'Quantity, product configuration, packaging and commercial terms are discussed before confirmation.'],
            ['number' => '04', 'title' => 'Quality & Packaging', 'description' => 'Products are prepared according to the agreed requirements and appropriate export-oriented packaging approach.'],
            ['number' => '05', 'title' => 'Shipment Coordination', 'description' => 'Documentation and logistics coordination proceed according to the agreed order and shipment requirements.'],
        ], 'is_active' => true, 'sort_order' => 30]);
        $pages['home']->sections()->updateOrCreate(['section_key' => 'quality_points'], ['eyebrow' => 'Quality Approach', 'heading' => 'Confidence starts with clarity.', 'body' => 'Successful B2B sourcing begins with clearly defined requirements. Our website and enquiry process are structured to capture the information necessary for meaningful product and commercial discussions.', 'content' => [
            'Clear product specifications before order confirmation', 'Buyer-specific packaging requirements where applicable', 'Product and category information documented for enquiries', 'Structured communication throughout the sourcing process',
        ], 'is_active' => true, 'sort_order' => 40]);

        $this->section($pages['home'], 'hero', 'Connecting Quality Indian Products to Global Markets.', 'Indian Products • Global Opportunities', 'Aishwary Exim & Logistics brings together Indian handicrafts, biodegradable food packaging, leather goods and garments through a buyer-focused sourcing and export platform.', [
            'primary_button' => 'Explore Our Products', 'secondary_button' => 'Request a Quote',
            'features' => ['B2B & Bulk Enquiries', 'Requirement-Based Sourcing', 'Export-Focused Support'],
            'floating_title' => 'Connecting Bihar, India', 'floating_text' => 'to the World',
        ], 0);
        $this->section($pages['home'], 'who_we_are', 'Bringing Indian products and global business closer together.', 'Who We Are', 'Aishwary Exim & Logistics is being built around a simple objective — making it easier for buyers to discover, discuss and source quality Indian products through an organised business platform.', [
            'kicker' => 'An export platform with an Indian identity',
            'secondary_body' => 'Our product portfolio spans traditional handicrafts, sustainable food packaging, leather goods and garments, supported by an export-focused enquiry and sourcing process.',
            'items' => ['Multi-category product sourcing', 'Buyer-specific requirements', 'B2B and bulk enquiry focused'],
            'button' => 'Know More About Us', 'strip_title' => 'Indian Products. Global Possibilities.',
            'strip_text' => 'A multi-category export and sourcing platform built for modern B2B buyers.',
        ], 10);
        $this->section($pages['home'], 'product_portfolio', 'Four Categories. One Global Business Platform.', 'Our Product Portfolio', 'Explore a carefully structured portfolio serving buyers looking for Indian craftsmanship, sustainable packaging, leather products and garments.', [], 20);
        $this->section($pages['home'], 'handicrafts', 'Indian artistry made to stand apart.', 'Indian Handicrafts', 'Our handicraft portfolio gives the website its most distinctive visual identity — colourful, artistic and rooted in Indian craftsmanship.', [
            'secondary_body' => 'The collection includes hand-painted bags, purses, clutches, accessories and decorative folk-art products featuring traditional motifs, floral elements, fish, birds and figurative artwork.',
            'items' => ['Distinctive hand-painted designs', 'Traditional Indian visual character'],
            'preview_title' => 'Original Product Photography', 'preview_text' => 'Authentic visuals supplied directly for the Aishwary handicrafts collection.',
        ], 30);
        $this->section($pages['home'], 'sustainability', 'Packaging designed for a more responsible future.', 'Sustainable Product Category', 'Our biodegradable food packaging category is intended for food-service businesses, distributors and institutional buyers exploring alternatives to conventional disposable packaging.', [
            'items' => [
                ['title' => 'Eco-Conscious Category', 'description' => 'Product options centred around sustainable packaging requirements.'],
                ['title' => 'Alternative Materials', 'description' => 'Packaging selections can vary according to the product and buyer requirement.'],
                ['title' => 'B2B Supply Focus', 'description' => 'Structured for bulk, food-service and distributor sourcing discussions.'],
            ],
        ], 40);
        $this->section($pages['home'], 'global_trade', 'From Bihar, India to the world.', 'Global Business Perspective', 'Aishwary Exim & Logistics is positioned to connect Indian products with buyers through organised product discovery, sourcing discussion and export-oriented coordination.', ['items' => ['Multi-category sourcing', 'Buyer-specific requirements', 'Logistics coordination']], 70);
        $this->section($pages['home'], 'gallery', 'A Closer Look at Indian Craftsmanship.', 'Handicrafts Gallery', 'Explore selected pieces from the original handicraft collection supplied for Aishwary Exim & Logistics.', [], 90);
        $this->section($pages['home'], 'insights', 'Knowledge Around Products, Sourcing & Trade.', 'Insights & Updates', 'The website provides useful product, sustainability and sourcing information alongside company updates.', [], 100);
        $this->section($pages['home'], 'certifications', 'Documentation that builds buyer confidence.', 'Business Credentials', 'Key registrations and business documents are organised for transparent, requirement-led sourcing conversations.', [], 110);

        $this->section($pages['about-us'], 'hero', 'Indian Products.', 'About Aishwary', 'Aishwary Exim & Logistics is building a diversified product sourcing and export-oriented platform connecting Indian products with serious B2B buyers.', ['highlight' => 'Global Business Perspective.'], 0);
        $this->section($pages['about-us'], 'our_business', 'A Multi-Category Platform Built Around Product Sourcing.', 'Our Business', 'Instead of functioning as a conventional retail store, the website is structured to support product discovery, requirement sharing and B2B commercial discussion.', [], 10);
        $this->section($pages['export-logistics'], 'hero', 'From Product Requirement to', 'Export & Logistics', 'Our export-oriented workflow is structured to support B2B sourcing discussions, order preparation, applicable documentation and logistics coordination.', ['highlight' => 'Shipment Coordination.'], 0);
        $this->section($pages['export-logistics'], 'approach', 'Export Begins With a Clearly Defined Requirement.', 'Our Approach', 'Successful product movement depends on clarity well before a shipment is arranged.', [], 10);
        $this->section($pages['quality-compliance'], 'hero', 'Quality Begins With', 'Quality & Compliance', 'Our quality approach is centred around documenting the buyer requirement, product information, specifications, packaging expectations and applicable transaction requirements.', ['highlight' => 'Clear Requirements.'], 0);
        $this->section($pages['quality-compliance'], 'quality_approach', 'Clarity Before Confirmation.', 'Quality Approach', 'Quality control cannot begin with vague product information. The first step is to establish exactly what the buyer expects.', [], 10);
        $this->section($pages['global-reach'], 'hero', 'Connecting Bihar, India', 'Global Reach', 'Our website is structured for international product discovery and B2B enquiry, enabling buyers to explore Indian product categories and communicate sourcing requirements.', ['highlight' => 'to Global Opportunities.'], 0);
        $this->section($pages['global-reach'], 'global_perspective', 'Global Reach Starts With Being Easy to Work With.', 'Our Global Perspective', 'A website cannot create global reach through flags and statistics alone. Buyers need useful information, clear communication and a practical route to enquiry.', [], 10);
        $this->section($pages['contact-us'], 'hero', 'Start a Business Conversation.', 'Contact Aishwary', 'Contact Aishwary Exim & Logistics for product sourcing, export enquiries, handicrafts, packaging, leather goods, garments or general business discussions.', [], 0);
        $this->section($pages['contact-us'], 'contact_information', 'How can we help?', 'Contact Information', 'Use the form for general questions. For a specific product or export requirement, the Request Quote form captures more detailed information.', [], 10);
        $this->section($pages['handicrafts-gallery'], 'hero', 'Indian Craftsmanship. Stories Painted by Hand.', 'Original Handicraft Collection', 'Explore selected handicrafts and traditional artwork from the original Aishwary Exim & Logistics collection, including hand-painted bags, accessories and decorative folk-art compositions.', [], 0);
        $this->section($pages['handicrafts-gallery'], 'collection', 'Original Handicrafts & Traditional Artwork.', 'Explore the Collection', 'Browse the collection by category and open any image for a closer look.', [], 10);
        $this->section($pages['gallery'], 'hero', 'Products & Visual Collections.', 'Media Gallery', 'Explore available product photography and visual collections from Aishwary Exim & Logistics.', [], 0);
        $this->section($pages['gallery'], 'collection', 'Original Handicraft Photography.', 'Featured Collection', 'The currently verified media collection consists primarily of original handicraft and folk-art photography.', [], 10);
        $this->section($pages['request-a-quote'], 'hero', 'Tell Us What You Need to Source.', 'Export & Sourcing Enquiry', 'Share your product category, approximate quantity, destination and relevant requirements to begin a structured B2B discussion.', [], 0);
    }

    private function section(Page $page, string $key, string $heading, string $eyebrow, string $body, array $content, int $sortOrder): void
    {
        $page->sections()->updateOrCreate(['section_key' => $key], [
            'heading' => $heading,
            'eyebrow' => $eyebrow,
            'body' => $body,
            'content' => $content,
            'is_active' => true,
            'sort_order' => $sortOrder,
        ]);
    }

    private function seedImage(int $number, string $title): ?Media
    {
        $filename = 'handicraft-'.str_pad((string) $number, 2, '0', STR_PAD_LEFT).'.webp';
        $source = database_path('seeders/assets/handicrafts/'.$filename);

        if (! is_file($source)) {
            $source = base_path('../aishwarya-frontend-exim-logistics/src/assets/images/handicrafts/'.$filename);
        }
        if (! is_file($source)) {
            return null;
        }
        $path = 'website/seed/handicrafts/'.$filename;
        Storage::disk('media')->put($path, file_get_contents($source));

        return Media::updateOrCreate(['disk' => 'media', 'path' => $path], ['original_name' => $filename, 'mime_type' => 'image/webp', 'extension' => 'webp', 'size' => filesize($source), 'title' => $title, 'alt_text' => $title, 'metadata' => ['purpose' => 'gallery']]);
    }
}
