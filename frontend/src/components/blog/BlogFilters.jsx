import {
  Search,
  X,
} from "lucide-react";

const BlogFilters = ({
  categories,
  activeCategory,
  search,
  counts,
  onCategoryChange,
  onSearchChange,
}) => {
  return (
    <div className="ael-blog-filters">
      <div className="ael-blog-filters__categories">
        {categories.map(
          (category) => (
            <button
              type="button"
              key={
                category.slug
              }
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
                {category.name}
              </span>

              <small>
                {counts[
                  category.slug
                ] || 0}
              </small>
            </button>
          )
        )}
      </div>

      <div className="ael-blog-filters__search">
        <Search
          size={17}
          aria-hidden="true"
        />

        <input
          type="search"
          value={search}
          onChange={(event) =>
            onSearchChange(
              event.target.value
            )
          }
          placeholder="Search insights..."
          aria-label="Search articles"
        />

        {search && (
          <button
            type="button"
            onClick={() =>
              onSearchChange("")
            }
            aria-label="Clear article search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogFilters;