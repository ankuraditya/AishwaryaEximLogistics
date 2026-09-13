import {
  ArrowRight,
  Briefcase,
  Leaf,
  Palette,
  Shirt,
} from "lucide-react";

import { Link } from "react-router-dom";

const categoryIcons = {
  handicrafts: Palette,
  "biodegradable-food-packaging": Leaf,
  "leather-purses-bags": Briefcase,
  "garments-jeans": Shirt,
};

const ProductsMegaMenu = ({
  categories = [],
  onNavigate,
}) => {
  return (
    <div className="ael-mega-menu">
      <div className="ael-mega-menu__inner">
        <div className="ael-mega-menu__intro">
          <span className="ael-mega-menu__eyebrow">
            Product Portfolio
          </span>

          <h3>
            Indian products for
            <span> global markets.</span>
          </h3>

          <p>
            Explore our export-focused portfolio across
            handicrafts, sustainable packaging, leather
            products and garments.
          </p>

          <Link
            to="/products"
            className="ael-mega-menu__all-products"
            onClick={onNavigate}
          >
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="ael-mega-menu__categories">
          {categories.map((category) => {
            const Icon =
              categoryIcons[category.slug] || Palette;

            return (
              <div
                className="ael-mega-menu__category"
                key={category.slug}
              >
                <Link
                  to={category.path}
                  className="ael-mega-menu__category-header"
                  onClick={onNavigate}
                >
                  <span className="ael-mega-menu__icon">
                    <Icon size={20} />
                  </span>

                  <span>{category.title}</span>
                </Link>

                <ul>
                  {category.items?.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={onNavigate}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  to={category.path}
                  className="ael-mega-menu__category-link"
                  onClick={onNavigate}
                >
                  Explore Category
                  <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="ael-mega-menu__footer">
          <div>
            <strong>Looking for a specific product?</strong>

            <span>
              Share your sourcing requirement with our team.
            </span>
          </div>

          <Link
            to="/request-a-quote"
            onClick={onNavigate}
          >
            Request Custom Sourcing
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsMegaMenu;