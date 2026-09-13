import {
  ArrowRight,
  Briefcase,
  Boxes,
  Globe2,
  Leaf,
  Palette,
  Shirt,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";

const categoryIcons = {
  handicrafts: Palette,

  "biodegradable-food-packaging":
    Leaf,

  "leather-purses-bags":
    Briefcase,

  "garments-jeans":
    Shirt,
};

const CatalogueHero = ({
  category,
  totalProducts,
}) => {
  const Icon = category
    ? categoryIcons[category.slug] ||
      Boxes
    : Boxes;

  const title = category
    ? category.name
    : "Explore Our Product Portfolio";

  const description = category
    ? category.heroText
    : "Discover Aishwary Exim & Logistics' multi-category product catalogue across Indian handicrafts, biodegradable food packaging, leather goods and garments.";

  return (
    <section className="ael-catalogue-hero">
      <Container className="ael-catalogue-hero__container">
        <div className="ael-catalogue-hero__content">
          <div className="ael-catalogue-hero__eyebrow">
            <Globe2 size={15} />

            {category
              ? "Product Category"
              : "Aishwary Product Catalogue"}
          </div>

          <h1>
            {title}
          </h1>

          <p>
            {description}
          </p>

          <div className="ael-catalogue-hero__actions">
            <Button
              to="/request-a-quote"
            >
              Request a Quote

              <ArrowRight size={17} />
            </Button>

            {category && (
              <Button
                to="/products"
                variant="outline-primary"
              >
                Browse All Categories
              </Button>
            )}
          </div>

          <div className="ael-catalogue-hero__meta">
            <div>
              <strong>
                {totalProducts}
              </strong>

              <span>
                Catalogue{" "}
                {totalProducts === 1
                  ? "Item"
                  : "Items"}
              </span>
            </div>

            <div>
              <strong>
                B2B
              </strong>

              <span>
                Enquiry Focus
              </span>
            </div>

            <div>
              <strong>
                RFQ
              </strong>

              <span>
                Requirement Based
              </span>
            </div>
          </div>
        </div>

        <div className="ael-catalogue-hero__visual">
          <div
            className={[
              "ael-catalogue-hero__icon",
              category
                ? `ael-catalogue-hero__icon--${category.slug}`
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <Icon size={72} />
          </div>

          <span className="ael-catalogue-hero__orbit ael-catalogue-hero__orbit--one" />
          <span className="ael-catalogue-hero__orbit ael-catalogue-hero__orbit--two" />

          <div className="ael-catalogue-hero__floating">
            <Globe2 size={18} />

            <span>
              Indian Products for
              Global Business
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CatalogueHero;