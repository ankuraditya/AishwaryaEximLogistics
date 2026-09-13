import {
  ArrowRight,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { useCmsSection } from "../../hooks/useCmsSection";

import handicraft01 from "../../assets/images/handicrafts/handicraft-01.webp";
import handicraft03 from "../../assets/images/handicrafts/handicraft-03.webp";
import handicraft05 from "../../assets/images/handicrafts/handicraft-05.webp";
import handicraft06 from "../../assets/images/handicrafts/handicraft-06.webp";
import handicraft08 from "../../assets/images/handicrafts/handicraft-08.webp";

const HomeGallery = () => {
  const { content } = useCmsSection("home", "gallery", {
    eyebrow: "Handicrafts Gallery", heading: "A Closer Look at Indian Craftsmanship.",
    body: "Explore selected pieces from the original handicraft collection supplied for Aishwary Exim & Logistics.",
  });
  return (
    <section className="ael-section ael-home-gallery">
      <div className="ael-home-gallery__mithila-divider" aria-hidden="true">
        <i />
      </div>
      <span className="ael-home-gallery__floating-art ael-home-gallery__floating-art--fish" aria-hidden="true" />
      <span className="ael-home-gallery__floating-art ael-home-gallery__floating-art--peacock" aria-hidden="true" />

      <Container>
        <div className="ael-home-gallery__header">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.heading}
            description={content.body}
          />

          <Button
            to="/handicrafts-gallery"
            variant="outline-primary"
          >
            View Full Gallery

            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="ael-home-gallery__grid">
          <div className="ael-home-gallery__item ael-home-gallery__item--one">
            <img
              src={handicraft01}
              alt="Hand-painted Indian handbag"
            />
          </div>

          <div className="ael-home-gallery__item ael-home-gallery__item--two">
            <img
              src={handicraft03}
              alt="Traditional Indian tote bag"
            />
          </div>

          <div className="ael-home-gallery__item ael-home-gallery__item--three">
            <img
              src={handicraft05}
              alt="Collection of Indian handicraft bags"
            />
          </div>

          <div className="ael-home-gallery__item ael-home-gallery__item--four">
            <img
              src={handicraft06}
              alt="Hand-painted handbag collection"
            />
          </div>

          <div className="ael-home-gallery__item ael-home-gallery__item--five">
            <img
              src={handicraft08}
              alt="Indian folk-art handicraft"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeGallery;
