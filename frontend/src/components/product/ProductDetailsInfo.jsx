import {
  Boxes,
  Hash,
  PackageSearch,
} from "lucide-react";

import {
  getProductCategoryName,
  getProductSubcategoryName,
} from "../../utils/catalogue";

const ProductDetailsInfo = ({
  product,
}) => {
  const category =
    getProductCategoryName(
      product.categorySlug
    );

  const subcategory =
    getProductSubcategoryName(
      product.categorySlug,
      product.subcategorySlug
    );

  return (
    <div className="ael-product-info">
      <div className="ael-product-info__eyebrow">
        {subcategory ||
          "Product Catalogue"}
      </div>

      <h1>
        {product.name}
      </h1>

      <p className="ael-product-info__description">
        {product.shortDescription}
      </p>

      <div className="ael-product-info__meta">
        <div>
          <span>
            <Hash size={16} />
          </span>

          <div>
            <small>
              Product Code
            </small>

            <strong>
              {product.code}
            </strong>
          </div>
        </div>

        <div>
          <span>
            <Boxes size={16} />
          </span>

          <div>
            <small>
              Category
            </small>

            <strong>
              {category}
            </strong>
          </div>
        </div>

        <div>
          <span>
            <PackageSearch
              size={16}
            />
          </span>

          <div>
            <small>
              Product Type
            </small>

            <strong>
              {subcategory ||
                "General"}
            </strong>
          </div>
        </div>
      </div>

      <div className="ael-product-info__commercial-note">
        <strong>
          B2B Product Enquiry
        </strong>

        <p>
          Commercial terms and detailed
          product information are
          confirmed according to
          quantity, specifications,
          packaging, destination and
          other buyer requirements.
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsInfo;