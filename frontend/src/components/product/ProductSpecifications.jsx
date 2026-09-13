import {
  getProductCategoryName,
  getProductSubcategoryName,
} from "../../utils/catalogue";

const ProductSpecifications = ({
  product,
}) => {
  const categoryName =
    getProductCategoryName(
      product.categorySlug
    );

  const subcategoryName =
    getProductSubcategoryName(
      product.categorySlug,
      product.subcategorySlug
    );

  const baseRows = [
    {
      label: "Product Code",
      value: product.code,
    },
    {
      label: "Category",
      value: categoryName,
    },
    {
      label: "Product Type",
      value: subcategoryName,
    },
    {
      label: "Material",
      value: product.material,
    },
    {
      label: "Dimensions",
      value: product.dimensions,
    },
    {
      label: "Colour / Finish",
      value: product.colour,
    },
    {
      label: "Usage / Application",
      value: product.usage,
    },
    {
      label: "Country of Origin",
      value:
        product.countryOfOrigin,
    },
  ].filter(
    (row) =>
      row.value !== undefined &&
      row.value !== null &&
      row.value !== ""
  );

  const customRows =
    (product.specifications || [])
      .filter(
        (item) =>
          item?.label &&
          item?.value
      )
      .map((item) => ({
        label: item.label,
        value: item.value,
      }));

  const rows = [
    ...baseRows,
    ...customRows,
  ];

  return (
    <div className="ael-product-specifications">
      <div className="ael-product-section-heading">
        <span>
          Product Information
        </span>

        <h2>
          Specifications
        </h2>

        <p>
          Product-specific information
          will be displayed here when
          confirmed for the respective
          catalogue item.
        </p>
      </div>

      <div className="ael-product-specifications__table">
        {rows.map((row) => (
          <div
            className="ael-product-specifications__row"
            key={`${row.label}-${row.value}`}
          >
            <span>
              {row.label}
            </span>

            <strong>
              {row.value}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSpecifications;
