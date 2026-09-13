import {
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

const ProductToolbar = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  resultCount,
  onOpenFilters,
  hasActiveFilters,
  onClearAll,
}) => {
  return (
    <div className="ael-product-toolbar">
      <div className="ael-product-toolbar__top">
        <div className="ael-product-toolbar__results">
          <strong>
            {resultCount}
          </strong>

          <span>
            {resultCount === 1
              ? " product found"
              : " products found"}
          </span>
        </div>

        <div className="ael-product-toolbar__desktop-actions">
          {hasActiveFilters && (
            <button
              type="button"
              className="ael-product-toolbar__clear"
              onClick={onClearAll}
            >
              <RotateCcw size={14} />

              Reset
            </button>
          )}

          <label className="ael-product-toolbar__sort">
            <span>
              Sort:
            </span>

            <select
              value={sort}
              onChange={(event) =>
                onSortChange(
                  event.target.value
                )
              }
            >
              <option value="default">
                Recommended
              </option>

              <option value="name-asc">
                Name A–Z
              </option>

              <option value="name-desc">
                Name Z–A
              </option>

              <option value="code-asc">
                Code A–Z
              </option>

              <option value="code-desc">
                Code Z–A
              </option>
            </select>
          </label>
        </div>
      </div>

      <div className="ael-product-toolbar__controls">
        <div className="ael-product-toolbar__search">
          <Search
            size={18}
            aria-hidden="true"
          />

          <input
            type="search"
            value={search}
            placeholder="Search products, codes or categories..."
            onChange={(event) =>
              onSearchChange(
                event.target.value
              )
            }
            aria-label="Search catalogue"
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                onSearchChange("")
              }
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </div>

        <button
          type="button"
          className="ael-product-toolbar__filter-trigger"
          onClick={onOpenFilters}
        >
          <SlidersHorizontal
            size={17}
          />

          Filters
        </button>

        <label className="ael-product-toolbar__mobile-sort">
          <select
            value={sort}
            onChange={(event) =>
              onSortChange(
                event.target.value
              )
            }
            aria-label="Sort products"
          >
            <option value="default">
              Recommended
            </option>

            <option value="name-asc">
              Name A–Z
            </option>

            <option value="name-desc">
              Name Z–A
            </option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default ProductToolbar;