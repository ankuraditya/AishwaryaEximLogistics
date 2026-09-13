import {
  ArrowRight,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";
import ProductCard from "./ProductCard";

const RelatedProducts = ({
  products = [],
  categorySlug,
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="ael-section ael-related-products">
      <Container>
        <div className="ael-related-products__header">
          <div className="ael-product-section-heading">
            <span>
              Continue Exploring
            </span>

            <h2>
              Related Products
            </h2>

            <p>
              Explore other products
              from the same catalogue
              category.
            </p>
          </div>

          <Button
            to={`/products/${categorySlug}`}
            variant="outline-primary"
          >
            View Category

            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="ael-related-products__grid">
          {products.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )}
        </div>
      </Container>
    </section>
  );
};

export default RelatedProducts;