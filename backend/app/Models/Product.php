<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $fillable = ['category_id', 'subcategory_id', 'catalogue_media_id', 'name', 'slug', 'sku', 'short_description', 'description', 'features', 'material', 'dimensions', 'colour', 'moq', 'packaging', 'customisation', 'country_of_origin', 'usage', 'meta_title', 'meta_description', 'is_featured', 'is_active', 'sort_order'];

    protected function casts(): array
    {
        return ['features' => 'array', 'is_featured' => 'boolean', 'is_active' => 'boolean', 'sort_order' => 'integer'];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(Subcategory::class);
    }

    public function media(): BelongsToMany
    {
        return $this->belongsToMany(Media::class, 'product_media')->withPivot(['is_primary', 'sort_order'])->orderByPivot('sort_order');
    }

    public function catalogueMedia(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'catalogue_media_id');
    }

    public function specifications(): HasMany
    {
        return $this->hasMany(ProductSpecification::class)->orderBy('sort_order');
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}
