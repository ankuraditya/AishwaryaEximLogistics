import {
  Check,
  RotateCcw,
  X,
} from "lucide-react";

const ProductFilters = ({
  categories,
  activeCategory,
  activeType,
  availableSubcategories,
  onCategoryChange,
  onTypeChange,
  onClear,
  mobileOpen,
  onMobileClose,
}) => {
  const hasFilters =
    Boolean(activeCategory) ||
    Boolean(activeType);

  return (
    <>
      <button
        type="button"
        className={[
          "ael-product-filters__backdrop",
          mobileOpen ? "is-visible" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={onMobileClose}
        aria-label="Close product filters"
      />

      <aside
        className={[
          "ael-product-filters",
          mobileOpen
            ? "is-mobile-open"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="ael-product-filters__mobile-header">
          <strong>
            Filter Products
          </strong>

          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        <div className="ael-product-filter-group">
          <div className="ael-product-filter-group__header">
            <h3>
              Categories
            </h3>
          </div>

          <div className="ael-product-filter-options">
            <button
              type="button"
              className={
                !activeCategory
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                onCategoryChange(null)
              }
            >
              <span>
                All Products
              </span>

              {!activeCategory && (
                <Check size={15} />
              )}
            </button>

            {categories.map(
              (category) => (
                <button
                  type="button"
                  key={category.slug}
                  className={
                    activeCategory ===
                    category.slug
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    onCategoryChange(
                      category.slug
                    )
                  }
                >
                  <span>
                    {category.shortName}
                  </span>

                  {activeCategory ===
                    category.slug && (
                    <Check size={15} />
                  )}
                </button>
              )
            )}
          </div>
        </div>

        {activeCategory &&
          availableSubcategories.length >
            0 && (
            <div className="ael-product-filter-group">
              <div className="ael-product-filter-group__header">
                <h3>
                  Product Type
                </h3>
              </div>

              <div className="ael-product-filter-options">
                <button
                  type="button"
                  className={
                    !activeType
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    onTypeChange(null)
                  }
                >
                  <span>
                    All Types
                  </span>

                  {!activeType && (
                    <Check size={15} />
                  )}
                </button>

                {availableSubcategories.map(
                  (subcategory) => (
                    <button
                      type="button"
                      key={
                        subcategory.slug
                      }
                      className={
                        activeType ===
                        subcategory.slug
                          ? "is-active"
                          : ""
                      }
                      onClick={() =>
                        onTypeChange(
                          subcategory.slug
                        )
                      }
                    >
                      <span>
                        {
                          subcategory.name
                        }
                      </span>

                      {activeType ===
                        subcategory.slug && (
                        <Check
                          size={15}
                        />
                      )}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

        <div className="ael-product-filters__note">
          <strong>
            Product Requirements
          </strong>

          <p>
            Specifications, MOQ,
            packaging and customisation
            will be confirmed according
            to the actual product and
            buyer requirement.
          </p>
        </div>

        {hasFilters && (
          <button
            type="button"
            className="ael-product-filters__clear"
            onClick={onClear}
          >
            <RotateCcw size={15} />

            Clear Filters
          </button>
        )}
      </aside>
    </>
  );
};

export default ProductFilters;
