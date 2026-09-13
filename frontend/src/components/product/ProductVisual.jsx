import {
  Briefcase,
  Image,
  Leaf,
  Palette,
  Shirt,
} from "lucide-react";

const categoryIcons = {
  handicrafts: Palette,

  "biodegradable-food-packaging":
    Leaf,

  "leather-purses-bags":
    Briefcase,

  "garments-jeans":
    Shirt,
};

const ProductVisual = ({
  product,
  className = "",
}) => {
  const Icon =
    categoryIcons[product.categorySlug] ||
    Image;

  if (product.image) {
    return (
      <div
        className={[
          "ael-product-visual",
          "ael-product-visual--image",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div
      className={[
        "ael-product-visual",
        `ael-product-visual--${product.categorySlug}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="ael-product-visual__placeholder">
        <span>
          <Icon size={38} />
        </span>

        <strong>
          Product Image
        </strong>

        <small>
          To be updated with final
          product photography
        </small>
      </div>
    </div>
  );
};

export default ProductVisual;