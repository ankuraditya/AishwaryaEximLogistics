import {
  ArrowRight,
  Palette,
  Sparkles,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";
import { useCmsSection } from "../../hooks/useCmsSection";
import { mediaUrl } from "../../utils/media";

import handicraft02 from "../../assets/images/handicrafts/handicraft-02.webp";
import handicraft04 from "../../assets/images/handicrafts/handicraft-04.webp";
import handicraft05 from "../../assets/images/handicrafts/handicraft-05.webp";
import handicraft07 from "../../assets/images/handicrafts/handicraft-07.webp";

const HandicraftShowcase = () => {
  const { content } = useCmsSection("home", "handicrafts", {
    eyebrow: "Indian Handicrafts", heading: "Indian artistry made to stand apart.",
    body: "Our handicraft portfolio gives the website its most distinctive visual identity — colourful, artistic and rooted in Indian craftsmanship.",
    secondary_body: "The collection includes hand-painted bags, purses, clutches, accessories and decorative folk-art products featuring traditional motifs, floral elements, fish, birds and figurative artwork.",
    items: ["Distinctive hand-painted designs", "Traditional Indian visual character"],
    preview_title: "Original Product Photography", preview_text: "Authentic visuals supplied directly for the Aishwary handicrafts collection.",
  });
  const images = content.images || [];
  return (
    <section className="ael-section ael-home-handicrafts">
      <span className="ael-home-handicrafts__folk-art ael-home-handicrafts__folk-art--fish" aria-hidden="true" />
      <span className="ael-home-handicrafts__folk-art ael-home-handicrafts__folk-art--peacock" aria-hidden="true" />

      <Container>
        <div className="ael-home-handicrafts__grid">
          <div className="ael-home-handicrafts__visual">
            <div className="ael-home-handicrafts__large">
              <img
                src={mediaUrl(images[0]) || mediaUrl(content.media) || handicraft05}
                alt="Collection of colourful hand-painted Indian bags"
              />
            </div>

            <div className="ael-home-handicrafts__small">
              <img
                src={mediaUrl(images[1]) || handicraft02}
                alt="Hand-painted Indian clutch with fish motif"
              />
            </div>

            <div className="ael-home-handicrafts__art">
              <img
                src={mediaUrl(images[2]) || handicraft07}
                alt="Traditional Indian folk-art collection"
              />
            </div>
          </div>

          <div className="ael-home-handicrafts__content">
            <div className="ael-home-section-label">
              <span />

              {content.eyebrow}
            </div>

            <h2>{content.heading}</h2>

            <p className="ael-home-handicrafts__lead">
              {content.body}
            </p>

            <p>
              {content.secondary_body}
            </p>

            <div className="ael-home-handicrafts__features">
              <div>
                <Palette size={19} />

                <span>
                  {content.items?.[0]}
                </span>
              </div>

              <div>
                <Sparkles size={19} />

                <span>
                  {content.items?.[1]}
                </span>
              </div>
            </div>

            <div className="ael-home-handicrafts__actions">
              <Button
                to="/products/handicrafts"
              >
                Explore Handicrafts

                <ArrowRight size={17} />
              </Button>

              <Button
                to="/handicrafts-gallery"
                variant="outline-primary"
              >
                View Gallery
              </Button>
            </div>
          </div>
        </div>

        <div className="ael-home-handicrafts__preview">
          <div>
            <img
              src={mediaUrl(images[3]) || handicraft04}
              alt="Hand-painted purse and clutch collection"
            />
          </div>

          <div className="ael-home-handicrafts__preview-content">
            <span>
              {content.preview_title}
            </span>

            <strong>
              {content.preview_text}
            </strong>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HandicraftShowcase;
