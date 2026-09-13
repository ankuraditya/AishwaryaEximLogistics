import {
  PackageSearch,
  RotateCcw,
} from "lucide-react";

const CatalogueEmptyState = ({
  onReset,
}) => {
  return (
    <div className="ael-catalogue-empty">
      <span>
        <PackageSearch size={36} />
      </span>

      <h2>
        No matching products found.
      </h2>

      <p>
        Try changing the search term,
        product category or selected
        product type.
      </p>

      <button
        type="button"
        onClick={onReset}
      >
        <RotateCcw size={16} />

        Reset Catalogue
      </button>
    </div>
  );
};

export default CatalogueEmptyState;