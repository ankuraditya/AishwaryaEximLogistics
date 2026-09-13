import {
  ArrowRight,
  Boxes,
  Building2,
  FileSearch,
  Globe2,
  Handshake,
  MapPin,
  PackageSearch,
  Ship,
} from "lucide-react";

import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";
import Button from "../../components/common/Button";
import { useCmsSection } from "../../hooks/useCmsSection";

import CorporateHero from "../../components/corporate/CorporateHero";
import CorporateCta from "../../components/corporate/CorporateCta";

import {
  buyerTypes,
  globalBuyerNeeds,
  globalProcess,
} from "../../data/corporate";

import "../../components/corporate/corporate.css";
import "./global-reach.css";

const needIcons = {
  catalogue: PackageSearch,
  spec: FileSearch,
  quote: Handshake,
  shipping: Ship,
};

const GlobalReach = () => {
  const { content: hero } = useCmsSection("global-reach", "hero", { eyebrow: "Global Reach", heading: "Connecting Bihar, India", highlight: "to Global Opportunities.", body: "Our website is structured for international product discovery and B2B enquiry, enabling buyers to explore Indian product categories and communicate sourcing requirements." });
  const { content: intro } = useCmsSection("global-reach", "global_perspective", { eyebrow: "Our Global Perspective", heading: "Global Reach Starts With Being Easy to Work With.", body: "A website cannot create global reach through flags and statistics alone. Buyers need useful information, clear communication and a practical route to enquiry." });
  const { content: needsSection } = useCmsSection("global-reach", "buyer_needs", { items: globalBuyerNeeds });
  const { content: buyersSection } = useCmsSection("global-reach", "buyers", { items: buyerTypes });
  const { content: processSection } = useCmsSection("global-reach", "process", { items: globalProcess });
  const cmsBuyerNeeds = needsSection.items.map((item, index) => ({ ...globalBuyerNeeds[index], ...item }));
  const cmsBuyerTypes = buyersSection.items.map((item, index) => (
    typeof item === "string" ? item : item.label || item.title || buyerTypes[index]
  ));
  const cmsGlobalProcess = processSection.items.map((item, index) => (
    typeof item === "string" ? item : item.label || item.title || globalProcess[index]
  ));
  const heroVisual = (
    <div className="ael-global-hero-visual">
      <div className="ael-global-hero-visual__globe">
        <Globe2 size={110} />

        <span className="ael-global-hero-visual__ring ael-global-hero-visual__ring--one" />
        <span className="ael-global-hero-visual__ring ael-global-hero-visual__ring--two" />
      </div>

      <div className="ael-global-hero-visual__origin">
        <MapPin size={18} />

        <div>
          <strong>
            Bihar
          </strong>

          <span>
            India
          </span>
        </div>
      </div>

      <div className="ael-global-hero-visual__message">
        Indian Products
        <ArrowRight size={16} />
        Global Buyers
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
        secondaryLabel="Send Global Enquiry"
        secondaryTo="/request-a-quote"
        meta={[
          "International Buyers",
          "B2B Sourcing",
          "Bulk Requirements",
          "Destination-Based Enquiries",
        ]}
        visual={heroVisual}
      />

      <section className="ael-section ael-global-positioning">
        <Container>
          <div className="ael-global-positioning__grid">
            <div>
              <SectionHeading
                eyebrow={intro.eyebrow}
                title={intro.heading}
                description={intro.body}
              />
            </div>

            <div className="ael-global-positioning__content">
              <p className="ael-global-positioning__lead">
                Aishwary's digital platform is designed
                to remove unnecessary friction from the
                first stage of international sourcing.
              </p>

              <p>
                Buyers can identify relevant product
                categories, review available information
                and submit destination-specific requirements
                for further discussion.
              </p>

              <Button
                to="/request-a-quote"
                variant="outline-primary"
              >
                Share Sourcing Requirement

                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="ael-section ael-global-needs">
        <Container>
          <SectionHeading
            eyebrow="International Buyer Journey"
            title="What Global Buyers Need From a Sourcing Website."
            description="The website is being designed around information that supports real procurement discussions instead of decorative export claims."
            align="center"
          />

          <div className="ael-global-needs__grid">
            {cmsBuyerNeeds.map((item) => {
              const Icon =
                needIcons[item.icon] ||
                Globe2;

              return (
                <div
                  className="ael-global-need-card"
                  key={item.title}
                >
                  <span>
                    <Icon size={24} />
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

      <section className="ael-global-network">
        <Container>
          <div className="ael-global-network__grid">
            <div className="ael-global-network__visual">
              <div className="ael-global-network__world">
                <Globe2 size={105} />
              </div>

              <span className="ael-global-network__node ael-global-network__node--one" />
              <span className="ael-global-network__node ael-global-network__node--two" />
              <span className="ael-global-network__node ael-global-network__node--three" />
              <span className="ael-global-network__node ael-global-network__node--four" />

              <div className="ael-global-network__origin">
                Bihar, India
              </div>
            </div>

            <div className="ael-global-network__content">
              <div className="ael-home-section-label">
                <span />

                Market Development
              </div>

              <h2>
                Build verified reach,
                <span> then publish it.</span>
              </h2>

              <p>
                We are intentionally not placing random
                country flags or unsupported claims such
                as "exporting to 30 countries" on this
                website.
              </p>

              <p>
                As Aishwary develops confirmed buyer
                relationships and export markets, the
                backend will allow genuine countries and
                regions to be published dynamically.
              </p>

              <div className="ael-global-network__future">
                <Boxes size={18} />

                <span>
                  Future Admin Module:
                  Countries / Markets / Export Reach
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="ael-section ael-global-buyers">
        <Container>
          <div className="ael-global-buyers__grid">
            <div>
              <div className="ael-home-section-label">
                <span />

                Buyer Profiles
              </div>

              <h2>
                Structured for different types of
                <span> B2B buyers.</span>
              </h2>

              <p>
                The same product can be evaluated very
                differently by an importer, distributor,
                retail chain or institutional buyer.
              </p>
            </div>

            <div className="ael-global-buyers__list">
              {cmsBuyerTypes.map((buyer) => (
                <div key={buyer}>
                  <Building2 size={17} />

                  {buyer}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="ael-section ael-global-process">
        <Container>
          <SectionHeading
            eyebrow="Global Sourcing Flow"
            title="A Simple Buyer Journey."
            description="The website is structured to move a serious buyer from discovery toward a meaningful commercial discussion."
            align="center"
          />

          <div className="ael-global-process__flow">
            {cmsGlobalProcess.map((item, index) => (
              <div
                key={item}
                className="ael-global-process__item"
              >
                <span>
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <strong>
                  {item}
                </strong>

                {index <
                  cmsGlobalProcess.length - 1 && (
                  <ArrowRight size={16} />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CorporateCta
        eyebrow="Global Buyer Enquiry"
        title="Interested in sourcing Indian products?"
        description="Tell us what you are looking for, your approximate quantity and destination so your requirement can be discussed in context."
        primaryLabel="Start Global Enquiry"
      />
    </>
  );
};

export default GlobalReach;
