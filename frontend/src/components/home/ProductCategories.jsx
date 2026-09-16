import { ArrowUpRight } from "lucide-react";

import { Link } from "react-router-dom";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

import { productCategories as fallbackCategories } from "../../data/home";
import { useCatalogueData } from "../../hooks/useCatalogueData";
import { useCmsSection } from "../../hooks/useCmsSection";
import handicraftsImage from "../../assets/images/categories/handicrafts-category.webp";
import makhanaImage from "../../assets/images/categories/makhana-category.webp";
import packagingImage from "../../assets/images/categories/packaging-category.webp";
import leatherImage from "../../assets/images/categories/leather-category.webp";
import garmentsImage from "../../assets/images/categories/garments-category.webp";

const categoryImages = {
  handicrafts: handicraftsImage,
  "agro-food-products": makhanaImage,
  "biodegradable-food-packaging": packagingImage,
  "leather-purses-bags": leatherImage,
  "garments-jeans": garmentsImage,
};

const ProductCategories = () => {
  const { categories } = useCatalogueData();
  const { content } = useCmsSection("home", "product_portfolio", {
    eyebrow: "Our Product Portfolio",
    heading: "Four Categories. One Global Business Platform.",
    body: "Explore a carefully structured portfolio serving buyers looking for Indian craftsmanship, sustainable packaging, leather products and garments.",
  });
  const productCategories = categories.map((category, index) => {
    const fallback = fallbackCategories.find((item) => item.id === category.slug) || {};
    return { ...fallback, id: category.slug, number: String(index + 1).padStart(2, "0"), title: category.name, shortTitle: category.shortName || category.name, description: category.description, path: `/products/${category.slug}`, theme: fallback.theme || "handicrafts" };
  });
  return (
    <section className="ael-section ael-home-categories">
      <Container>
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.heading}
          description={content.body}
        />

        <div
          className={[
            "ael-home-categories__grid",
            productCategories.length === 5
              ? "ael-home-categories__grid--five"
              : "",
          ].filter(Boolean).join(" ")}
        >
          {productCategories.map((category) => {
            return (
              <Link
                to={category.path}
                key={category.id}
                className={[
                  "ael-home-category",
                  `ael-home-category--${category.theme}`,
                ].join(" ")}
              >
                <div className="ael-home-category__top">
                  <span className="ael-home-category__number">
                    {category.number}
                  </span>

                  <span className="ael-home-category__arrow">
                    <ArrowUpRight size={19} />
                  </span>
                </div>

                <div className="ael-home-category__image">
                  <img
                    src={categoryImages[category.id]}
                    alt={`${category.title} product collection`}
                    loading="lazy"
                  />
                  <span>{category.shortTitle}</span>
                </div>

                <div className="ael-home-category__content">
                  <span className="ael-home-category__small-title">
                    {category.shortTitle}
                  </span>

                  <h3>
                    {category.title}
                  </h3>

                  <p>
                    {category.description}
                  </p>
                </div>

                <div className="ael-home-category__footer">
                  Explore Category

                  <ArrowUpRight size={15} />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ProductCategories;
