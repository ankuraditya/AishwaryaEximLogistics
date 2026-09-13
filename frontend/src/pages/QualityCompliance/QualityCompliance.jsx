import {
  Check,
  ClipboardCheck,
  FileCheck2,
  MessageSquareText,
  PackageCheck,
  SearchCheck,
  ShieldCheck,
} from "lucide-react";

import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";
import { useCmsSection } from "../../hooks/useCmsSection";

import CorporateHero from "../../components/corporate/CorporateHero";
import CorporateCta from "../../components/corporate/CorporateCta";

import {
  complianceAreas,
  qualityCheckpoints,
  qualityPrinciples,
} from "../../data/corporate";

import "../../components/corporate/corporate.css";
import "./quality-compliance.css";

const iconMap = {
  clipboard: ClipboardCheck,
  search: SearchCheck,
  package: PackageCheck,
  message: MessageSquareText,
};

const QualityCompliance = () => {
  const { content: hero } = useCmsSection("quality-compliance", "hero", { eyebrow: "Quality & Compliance", heading: "Quality Begins With", highlight: "Clear Requirements.", body: "Our quality approach is centred around documenting the buyer requirement, product information, specifications, packaging expectations and applicable transaction requirements." });
  const { content: intro } = useCmsSection("quality-compliance", "quality_approach", { eyebrow: "Quality Approach", heading: "Clarity Before Confirmation.", body: "Quality control cannot begin with vague product information. The first step is to establish exactly what the buyer expects." });
  const { content: principleSection } = useCmsSection("quality-compliance", "principles", { items: qualityPrinciples });
  const { content: checkpointSection } = useCmsSection("quality-compliance", "checkpoints", { items: qualityCheckpoints });
  const { content: complianceSection } = useCmsSection("quality-compliance", "compliance", { items: complianceAreas });
  const cmsPrinciples = principleSection.items.map((item, index) => ({ ...qualityPrinciples[index], ...item }));
  const cmsCheckpoints = checkpointSection.items.map((item, index) => ({ ...qualityCheckpoints[index], ...item }));
  const cmsComplianceAreas = complianceSection.items.map((item, index) => (
    typeof item === "string" ? item : item.label || item.title || complianceAreas[index]
  ));
  const heroVisual = (
    <div className="ael-quality-hero-visual">
      <div className="ael-quality-hero-visual__shield">
        <ShieldCheck size={74} />
      </div>

      <div className="ael-quality-hero-visual__card ael-quality-hero-visual__card--one">
        <ClipboardCheck size={19} />

        Requirement Clarity
      </div>

      <div className="ael-quality-hero-visual__card ael-quality-hero-visual__card--two">
        <PackageCheck size={19} />

        Packaging Alignment
      </div>

      <div className="ael-quality-hero-visual__card ael-quality-hero-visual__card--three">
        <FileCheck2 size={19} />

        Documented Information
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
        secondaryLabel="Send Enquiry"
        secondaryTo="/request-a-quote"
        meta={[
          "Specifications",
          "Product Review",
          "Packaging",
          "Documentation",
        ]}
        visual={heroVisual}
      />

      <section className="ael-section ael-quality-philosophy">
        <Container>
          <div className="ael-quality-philosophy__grid">
            <div>
              <SectionHeading
                eyebrow={intro.eyebrow}
                title={intro.heading}
                description={intro.body}
              />
            </div>

            <div className="ael-quality-philosophy__content">
              <p className="ael-quality-philosophy__lead">
                Different product categories require
                different specifications and quality
                considerations.
              </p>

              <p>
                A hand-painted bag, biodegradable food
                container, leather purse and denim product
                cannot be evaluated through an identical
                checklist. Our architecture therefore
                allows product-specific information to be
                captured dynamically.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="ael-section ael-quality-principles">
        <Container>
          <SectionHeading
            eyebrow="Core Principles"
            title="Four Foundations of Better Product Discussions."
            description="The objective is to reduce ambiguity between buyer expectations and the final confirmed requirement."
            align="center"
          />

          <div className="ael-quality-principles__grid">
            {cmsPrinciples.map((item) => {
              const Icon =
                iconMap[item.icon] ||
                ShieldCheck;

              return (
                <div
                  className="ael-quality-principle"
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

      <section className="ael-section ael-quality-checkpoints">
        <Container>
          <div className="ael-quality-checkpoints__header">
            <SectionHeading
              eyebrow="Buyer Requirement Checkpoints"
              title="Information We Want to Establish Before Order Confirmation."
              description="The exact fields will eventually vary dynamically by product category."
            />
          </div>

          <div className="ael-quality-checkpoints__grid">
            {cmsCheckpoints.map((item) => (
              <div
                className="ael-quality-checkpoint"
                key={item.number}
              >
                <span>
                  {item.number}
                </span>

                <div>
                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="ael-quality-compliance-section">
        <Container>
          <div className="ael-quality-compliance-section__grid">
            <div className="ael-quality-compliance-section__visual">
              <FileCheck2 size={52} />

              <span>
                Compliance Information
              </span>

              <strong>
                Publish what can be verified.
              </strong>
            </div>

            <div className="ael-quality-compliance-section__content">
              <div className="ael-home-section-label">
                <span />

                Compliance
              </div>

              <h2>
                No unsupported
                <span> certification claims.</span>
              </h2>

              <p>
                The website will only display certifications,
                registrations or compliance documents that
                are genuinely applicable and supplied for
                publication.
              </p>

              <div className="ael-quality-compliance-section__list">
                {cmsComplianceAreas.map((item) => (
                  <div key={item}>
                    <span>
                      <Check size={15} />
                    </span>

                    {item}
                  </div>
                ))}
              </div>

              <p className="ael-quality-compliance-section__note">
                Product-specific legal, technical,
                certification and destination requirements
                should always be validated for the actual
                transaction before relying on them commercially.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CorporateCta
        eyebrow="Product Requirement"
        title="Need specifications or compliance information for a product?"
        description="Send the product and destination requirement so applicable information can be discussed in the correct context."
      />
    </>
  );
};

export default QualityCompliance;
