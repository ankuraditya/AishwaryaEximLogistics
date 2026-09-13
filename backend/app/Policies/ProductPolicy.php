<?php

namespace App\Policies;

use App\Enums\CmsPermission;
use App\Models\Admin;
use App\Models\Product;

class ProductPolicy
{
    /**
     * Determine whether the administrator can view any products.
     */
    public function viewAny(Admin $admin): bool
    {
        return false;
    }

    /**
     * Determine whether the administrator can view the product.
     */
    public function view(
        Admin $admin,
        Product $product
    ): bool {
        return false;
    }

    /**
     * Determine whether the administrator can create products.
     */
    public function create(Admin $admin): bool
    {
        return false;
    }

    /**
     * Determine whether the administrator can update the product.
     */
    public function update(
        Admin $admin,
        Product $product
    ): bool {
        return $admin->can(
            CmsPermission::PRODUCTS_UPDATE->value
        );
    }

    /**
     * Determine whether the administrator can delete the product.
     */
    public function delete(
        Admin $admin,
        Product $product
    ): bool {
        return false;
    }

    /**
     * Determine whether the administrator can restore the product.
     */
    public function restore(
        Admin $admin,
        Product $product
    ): bool {
        return false;
    }

    /**
     * Determine whether the administrator can permanently delete the product.
     */
    public function forceDelete(
        Admin $admin,
        Product $product
    ): bool {
        return false;
    }
}
