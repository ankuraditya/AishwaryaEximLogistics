import {
  ArrowRight,
  Check,
  Globe2,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";
import { useCmsSection } from "../../hooks/useCmsSection";
import { mediaUrl } from "../../utils/media";

import handicraft02 from "../../assets/images/handicrafts/handicraft-02.webp";
import handicraft04 from "../../assets/images/handicrafts/handicraft-04.webp";
import handicraft05 from "../../assets/images/handicrafts/handicraft-05.webp";
import mithilaAboutOrnament from "../../assets/images/brand/mithila-about-ornament.svg";

const HomeAbout = () => {
  const { content } = useCmsSection("home", "who_we_are", {
    eyebrow: "Who We Are",
    heading: "Bringing Indian products and global business closer together.",
    kicker: "An export platform with an Indian identity",
    body: "Aishwary Exim & Logistics is being built around a simple objective — making it easier for buyers to discover, discuss and source quality Indian products through an organised business platform.",
    secondary_body: "Our product portfolio spans traditional handicrafts, sustainable food packaging, leather goods and garments, supported by an export-focused enquiry and sourcing process.",
    items: ["Multi-category product sourcing", "Buyer-specific requirements", "B2B and bulk enquiry focused"],
    button: "Know More About Us",
    strip_title: "Indian Products. Global Possibilities.",
    strip_text: "A multi-category export and sourcing platform built for modern B2B buyers.",
  });
  const images = content.images || [];
  return (
    <section className="ael-section ael-home-about">
      <div
        className="ael-home-about__pattern"
        aria-hidden="true"
      />

      <Container>
        <div className="ael-home-about__grid">
          <div className="ael-home-about__intro">
            <div className="ael-home-section-label">
              <span />

              {content.eyebrow}
            </div>

            <h2>{content.heading}</h2>

            <img
              className="ael-home-about__ornament"
              src={mithilaAboutOrnament}
              alt=""
              aria-hidden="true"
            />

            <div className="ael-home-about__visual">
              <figure className="ael-home-about__image ael-home-about__image--main">
                <img
                  src={mediaUrl(images[0]) || mediaUrl(content.media) || handicraft02}
                  alt="Colourful hand-painted Indian handicraft bag"
                />
              </figure>

              <figure className="ael-home-about__image ael-home-about__image--top">
                <img
                  src={mediaUrl(images[1]) || handicraft04}
                  alt="Mithila-inspired hand-painted accessory"
                />
              </figure>

              <figure className="ael-home-about__image ael-home-about__image--bottom">
                <img
                  src={mediaUrl(images[2]) || handicraft05}
                  alt="Traditional Indian folk-art handicraft"
                />
              </figure>

              <div className="ael-home-about__visual-label">
                <span>Indian artistry</span>
                <strong>Made to be remembered</strong>
              </div>
            </div>
          </div>

          <div className="ael-home-about__content">
            <span className="ael-home-about__content-kicker">
              {content.kicker}
            </span>

            <p className="ael-home-about__lead">
              {content.body}
            </p>

            <p>
              {content.secondary_body}
            </p>

            <div className="ael-home-about__points">
              <div>
                <Check size={16} />

                <span>
                  {content.items?.[0]}
                </span>
              </div>

              <div>
                <Check size={16} />

                <span>
                  {content.items?.[1]}
                </span>
              </div>

              <div>
                <Check size={16} />

                <span>
                  {content.items?.[2]}
                </span>
              </div>
            </div>

            <Button
              to="/about-us"
              variant="outline-primary"
            >
              {content.button}

              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        <div className="ael-home-about__brand-strip">
          <div className="ael-home-about__brand-icon">
            <Globe2 size={25} />
          </div>

          <div>
            <strong>
              {content.strip_title}
            </strong>

            <span>
              {content.strip_text}
            </span>
          </div>

          <span className="ael-home-about__brand-mark" aria-hidden="true">
            बिहार • INDIA • GLOBAL
          </span>
        </div>
      </Container>
    </section>
  );
};

export default HomeAbout;
