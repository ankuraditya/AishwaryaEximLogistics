import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import ProductVisual from "./ProductVisual";

import {
  getProductCategoryName,
  getProductSubcategoryName,
} from "../../utils/catalogue";

const ProductCard = ({
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

  const productPath =
    `/products/${product.categorySlug}/${product.slug}`;

  const enquiryPath =
    `/request-a-quote?product=${encodeURIComponent(
      product.slug
    )}`;

  return (
    <article className="ael-product-card">
      <Link
        to={productPath}
        className="ael-product-card__image-link"
        aria-label={`View ${product.name}`}
      >
        <ProductVisual product={product} />

        <span className="ael-product-card__view-icon">
          <ArrowUpRight size={18} />
        </span>
      </Link>

      <div className="ael-product-card__content">
        <div className="ael-product-card__meta">
          <span>
            {categoryName}
          </span>

          <small>
            {product.code}
          </small>
        </div>

        <Link to={productPath}>
          <h3>
            {product.name}
          </h3>
        </Link>

        <div className="ael-product-card__subcategory">
          {subcategoryName}
        </div>

        <p>
          {product.shortDescription}
        </p>

        <div className="ael-product-card__actions">
          <Link
            to={productPath}
            className="ael-product-card__details"
          >
            View Details

            <ArrowRight size={14} />
          </Link>

          <Link
            to={enquiryPath}
            className="ael-product-card__enquire"
          >
            Enquire
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;