import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const ProductNavigation = ({
  previous,
  next,
}) => {
  if (!previous && !next) {
    return null;
  }

  const getPath = (
    product
  ) =>
    `/products/${product.categorySlug}/${product.slug}`;

  return (
    <div className="ael-product-navigation">
      {previous ? (
        <Link
          to={getPath(previous)}
          className="ael-product-navigation__previous"
        >
          <ArrowLeft size={17} />

          <div>
            <span>
              Previous Product
            </span>

            <strong>
              {previous.name}
            </strong>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next && (
        <Link
          to={getPath(next)}
          className="ael-product-navigation__next"
        >
          <div>
            <span>
              Next Product
            </span>

            <strong>
              {next.name}
            </strong>
          </div>

          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
};

export default ProductNavigation;