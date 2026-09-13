const GalleryFilters = ({
  categories = [],
  activeCategory = "all",
  counts = {},
  onChange,
}) => {
  return (
    <div className="ael-gallery-filters">
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
              onChange(category.slug)
            }
          >
            <span>
              {category.name}
            </span>

            <small>
              {
                counts[
                  category.slug
                ] || 0
              }
            </small>
          </button>
        )
      )}
    </div>
  );
};

export default GalleryFilters;