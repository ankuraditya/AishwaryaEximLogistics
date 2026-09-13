import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Globe2,
  Handshake,
  MessageSquareText,
  SearchCheck,
  Target,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";
import { useCmsSection } from "../../hooks/useCmsSection";

import CorporateHero from "../../components/corporate/CorporateHero";
import CorporateCta from "../../components/corporate/CorporateCta";
import CorporateStatStrip from "../../components/corporate/CorporateStatStrip";

import {
  businessCategories,
  buyerTypes,
  companyPrinciples,
} from "../../data/corporate";

import handicraft01 from "../../assets/images/handicrafts/handicraft-01.webp";
import handicraft05 from "../../assets/images/handicrafts/handicraft-05.webp";
import handicraft07 from "../../assets/images/handicrafts/handicraft-07.webp";

import "../../components/corporate/corporate.css";
import "./about.css";

const principleIcons = {
  buyer: Users,
  clarity: SearchCheck,
  portfolio: Boxes,
  communication: MessageSquareText,
};

const About = () => {
  const { content: hero } = useCmsSection("about-us", "hero", { eyebrow: "About Aishwary", heading: "Indian Products.", highlight: "Global Business Perspective.", body: "Aishwary Exim & Logistics is building a diversified product sourcing and export-oriented platform connecting Indian products with serious B2B buyers." });
  const { content: story } = useCmsSection("about-us", "our_business", { eyebrow: "Our Business", heading: "A Multi-Category Platform Built Around Product Sourcing.", body: "Instead of functioning as a conventional retail store, the website is structured to support product discovery, requirement sharing and B2B commercial discussion." });
  const { content: categorySection } = useCmsSection("about-us", "categories", { items: businessCategories });
  const { content: principleSection } = useCmsSection("about-us", "principles", { items: companyPrinciples });
  const { content: buyerSection } = useCmsSection("about-us", "buyers", { items: buyerTypes });
  const cmsBusinessCategories = categorySection.items.map((item, index) => ({ ...businessCategories[index], ...item }));
  const cmsCompanyPrinciples = principleSection.items.map((item, index) => ({ ...companyPrinciples[index], ...item }));
  const cmsBuyerTypes = buyerSection.items.map((item, index) => (
    typeof item === "string" ? item : item.label || item.title || buyerTypes[index]
  ));
  const heroVisual = (
    <div className="ael-about-hero-visual">
      <div className="ael-about-hero-visual__main">
        <img
          src={handicraft05}
          alt="Aishwary Exim and Logistics Indian handicraft products"
        />
      </div>

      <div className="ael-about-hero-visual__small">
        <img
          src={handicraft01}
          alt="Hand-painted Indian handicraft handbag"
        />
      </div>

      <div className="ael-about-hero-visual__card">
        <Globe2 size={24} />

        <div>
          <strong>
            Bihar, India
          </strong>

          <span>
            Connecting to global opportunities
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <CorporateHero
        eyebrow={hero.eyebrow}
        title={hero.heading}
        highlight={hero.highlight}
        description={hero.body}
        primaryLabel="Explore Products"
        primaryTo="/products"
        secondaryLabel="Send Business Enquiry"
        secondaryTo="/request-a-quote"
        meta={[
          "Handicrafts",
          "Sustainable Packaging",
          "Leather Goods",
          "Garments & Jeans",
        ]}
        visual={heroVisual}
      />

      <CorporateStatStrip />

      <section className="ael-section ael-about-story">
        <Container>
          <div className="ael-about-story__grid">
            <div>
              <SectionHeading
                eyebrow={story.eyebrow}
                title={story.heading}
                description={story.body}
              />
            </div>

            <div className="ael-about-story__content">
              <p className="ael-about-story__lead">
                Aishwary Exim & Logistics brings together
                different Indian product categories within
                one professional business identity.
              </p>

              <p>
                The objective is to make it easier for
                importers, distributors, wholesalers and
                other business buyers to identify relevant
                products, communicate requirements and move
                towards structured sourcing discussions.
              </p>

              <div className="ael-about-story__checks">
                <div>
                  <CheckCircle2 size={18} />

                  Buyer-focused product discovery
                </div>

                <div>
                  <CheckCircle2 size={18} />

                  Requirement-driven quotations
                </div>

                <div>
                  <CheckCircle2 size={18} />

                  Multi-category sourcing structure
                </div>

                <div>
                  <CheckCircle2 size={18} />

                  Export-oriented communication
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="ael-section ael-about-categories">
        <Container>
          <SectionHeading
            eyebrow="What We Work With"
            title="Four Product Divisions Under One Business Platform."
            description="Each category has its own product character while remaining part of the same Aishwary sourcing and export ecosystem."
            align="center"
          />

          <div className="ael-about-categories__grid">
            {cmsBusinessCategories.map((category) => (
              <Link
                to={category.path}
                key={category.number}
                className="ael-about-category-card"
              >
                <span className="ael-about-category-card__number">
                  {category.number}
                </span>

                <h3>
                  {category.title}
                </h3>

                <p>
                  {category.description}
                </p>

                <div>
                  Explore Category

                  <ArrowRight size={15} />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="ael-section ael-about-identity">
        <Container>
          <div className="ael-about-identity__grid">
            <div className="ael-about-identity__image">
              <img
                src={handicraft07}
                alt="Traditional Indian folk artwork"
              />

              <span>
                Indian Product Identity
              </span>
            </div>

            <div className="ael-about-identity__content">
              <div className="ael-home-section-label">
                <span />

                Our Positioning
              </div>

              <h2>
                Rooted in India.
                <span> Designed for global conversations.</span>
              </h2>

              <p>
                The Aishwary identity combines two important
                ideas: the diversity and character of Indian
                products, and the clarity expected in
                international B2B communication.
              </p>

              <p>
                This is particularly visible in the
                handicrafts portfolio, where original
                product photography gives the website an
                authentic visual character that cannot be
                achieved through generic stock imagery.
              </p>

              <Button
                to="/handicrafts-gallery"
                variant="outline-primary"
              >
                Explore Handicrafts Gallery

                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="ael-section ael-about-principles">
        <Container>
          <SectionHeading
            eyebrow="How We Think"
            title="Our Business Principles."
            description="The platform is designed around clarity, buyer requirements and disciplined product communication."
          />

          <div className="ael-about-principles__grid">
            {cmsCompanyPrinciples.map((item) => {
              const Icon =
                principleIcons[item.icon] ||
                Target;

              return (
                <div
                  key={item.title}
                  className="ael-about-principle"
                >
                  <span>
                    <Icon size={23} />
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="ael-section ael-about-buyers">
        <Container>
          <div className="ael-about-buyers__grid">
            <div>
              <div className="ael-home-section-label">
                <span />

                Who We Serve
              </div>

              <h2>
                Built for serious
                <span> business buyers.</span>
              </h2>

              <p>
                The website is intended primarily for
                organisations looking to source products,
                discuss bulk quantities or explore commercial
                supply relationships.
              </p>
            </div>

            <div className="ael-about-buyers__list">
              {cmsBuyerTypes.map((buyer) => (
                <div key={buyer}>
                  <Handshake size={17} />

                  {buyer}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CorporateCta
        eyebrow="Discuss Your Requirement"
        title="Looking for Indian products for your business?"
        description="Share the product category, quantity, destination and relevant specifications so the discussion can begin with the right information."
      />
    </>
  );
};

export default About;
