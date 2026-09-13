import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductPagination = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from(
    {
      length: totalPages,
    },
    (_, index) => index + 1
  );

  return (
    <nav
      className="ael-product-pagination"
      aria-label="Product pagination"
    >
      <button
        type="button"
        disabled={page <= 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        aria-label="Previous page"
      >
        <ChevronLeft size={17} />
      </button>

      {pages.map((pageNumber) => (
        <button
          type="button"
          key={pageNumber}
          className={
            page === pageNumber
              ? "is-active"
              : ""
          }
          onClick={() =>
            onPageChange(pageNumber)
          }
          aria-current={
            page === pageNumber
              ? "page"
              : undefined
          }
        >
          {pageNumber}
        </button>
      ))}

      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() =>
          onPageChange(page + 1)
        }
        aria-label="Next page"
      >
        <ChevronRight size={17} />
      </button>
    </nav>
  );
};

export default ProductPagination;