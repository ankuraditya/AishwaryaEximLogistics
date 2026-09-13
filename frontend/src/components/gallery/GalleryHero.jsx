import {
  ArrowRight,
  Palette,
  Sparkles,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";

import handicraft01 from "../../assets/images/handicrafts/handicraft-01.webp";
import handicraft07 from "../../assets/images/handicrafts/handicraft-07.webp";
import handicraft09 from "../../assets/images/handicrafts/handicraft-09.webp";

const GalleryHero = ({
  totalItems,
  cms = {},
}) => {
  return (
    <section className="ael-gallery-hero">
      <Container className="ael-gallery-hero__container">
        <div className="ael-gallery-hero__content">
          <div className="ael-gallery-hero__eyebrow">
            <Palette size={16} />

            {cms.eyebrow || "Original Handicraft Collection"}
          </div>

          <h1>{cms.heading || "Indian Craftsmanship. Stories Painted by Hand."}</h1>

          <p>
            {cms.body || "Explore selected handicrafts and traditional artwork from the original Aishwary Exim & Logistics collection, including hand-painted bags, accessories and decorative folk-art compositions."}
          </p>

          <div className="ael-gallery-hero__actions">
            <Button
              to="/products/handicrafts"
              size="lg"
            >
              Explore Handicraft Products

              <ArrowRight size={17} />
            </Button>

            <Button
              to="/request-a-quote"
              variant="outline-primary"
              size="lg"
            >
              Send Handicraft Enquiry
            </Button>
          </div>

          <div className="ael-gallery-hero__meta">
            <div>
              <strong>
                {totalItems}
              </strong>

              <span>
                Gallery Images
              </span>
            </div>

            <div>
              <strong>
                Original
              </strong>

              <span>
                Client Photography
              </span>
            </div>

            <div>
              <strong>
                B2B
              </strong>

              <span>
                Product Enquiries
              </span>
            </div>
          </div>
        </div>

        <div className="ael-gallery-hero__visual">
          <div className="ael-gallery-hero__image ael-gallery-hero__image--one">
            <img
              src={handicraft01}
              alt="Hand-painted Indian handbag"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>

          <div className="ael-gallery-hero__image ael-gallery-hero__image--two">
            <img
              src={handicraft07}
              alt="Traditional Indian folk-art collection"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="ael-gallery-hero__image ael-gallery-hero__image--three">
            <img
              src={handicraft09}
              alt="Hand-painted folders and accessories"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="ael-gallery-hero__floating">
            <Sparkles size={20} />

            <div>
              <strong>
                Authentic Visual Collection
              </strong>

              <span>
                Handicrafts from Bihar, India
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GalleryHero;
