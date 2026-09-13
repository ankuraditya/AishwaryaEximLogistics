import {
  ArrowRight,
  Boxes,
  FileText,
  Globe2,
  MessageSquareText,
  PackageCheck,
  SearchCheck,
  Ship,
} from "lucide-react";

import Button from "../../components/common/Button";
import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";
import { useCmsSection } from "../../hooks/useCmsSection";

import CorporateHero from "../../components/corporate/CorporateHero";
import CorporateCta from "../../components/corporate/CorporateCta";

import {
  exportCapabilities,
  exportSteps,
} from "../../data/corporate";

import "../../components/corporate/corporate.css";
import "./export-logistics.css";

const capabilityIcons = {
  search: SearchCheck,
  boxes: Boxes,
  file: FileText,
  package: PackageCheck,
  ship: Ship,
  message: MessageSquareText,
};

const ExportLogistics = () => {
  const { content: hero } = useCmsSection("export-logistics", "hero", { eyebrow: "Export & Logistics", heading: "From Product Requirement to", highlight: "Shipment Coordination.", body: "Our export-oriented workflow is structured to support B2B sourcing discussions, order preparation, applicable documentation and logistics coordination." });
  const { content: intro } = useCmsSection("export-logistics", "approach", { eyebrow: "Our Approach", heading: "Export Begins With a Clearly Defined Requirement.", body: "Successful product movement depends on clarity well before a shipment is arranged." });
  const { content: capabilitySection } = useCmsSection("export-logistics", "capabilities", { items: exportCapabilities });
  const { content: stepsSection } = useCmsSection("export-logistics", "process", { items: exportSteps });
  const cmsCapabilities = capabilitySection.items.map((item, index) => ({ ...exportCapabilities[index], ...item }));
  const cmsSteps = stepsSection.items.map((item, index) => ({ ...exportSteps[index], ...item }));
  const heroVisual = (
    <div className="ael-export-hero-visual">
      <div className="ael-export-hero-visual__globe">
        <Globe2 size={98} />

        <span className="ael-export-hero-visual__orbit ael-export-hero-visual__orbit--one" />
        <span className="ael-export-hero-visual__orbit ael-export-hero-visual__orbit--two" />
      </div>

      <div className="ael-export-hero-visual__india">
        <strong>
          Bihar
        </strong>

        <span>
          India
        </span>
      </div>

      <div className="ael-export-hero-visual__shipment">
        <Ship size={20} />

        <span>
          Export & Logistics Coordination
        </span>
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
        primaryLabel="Send Export Enquiry"
        primaryTo="/request-a-quote"
        secondaryLabel="Explore Products"
        secondaryTo="/products"
        meta={[
          "B2B Enquiries",
          "Product Sourcing",
          "Packaging Coordination",
          "Shipment Coordination",
        ]}
        visual={heroVisual}
      />

      <section className="ael-section ael-export-intro">
        <Container>
          <div className="ael-export-intro__grid">
            <div>
              <SectionHeading
                eyebrow={intro.eyebrow}
                title={intro.heading}
                description={intro.body}
              />
            </div>

            <div className="ael-export-intro__content">
              <p className="ael-export-intro__lead">
                Before discussing logistics, the product,
                quantity, specification, packaging and
                destination need to be understood.
              </p>

              <p>
                Aishwary's website therefore begins the
                export journey at the sourcing stage,
                allowing buyers to submit useful commercial
                information that can support a structured
                discussion.
              </p>

              <Button
                to="/request-a-quote"
                variant="outline-primary"
              >
                Share Your Requirement

                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="ael-section ael-export-capabilities">
        <Container>
          <SectionHeading
            eyebrow="Export Support"
            title="A Structured Coordination Framework."
            description="Different parts of an export transaction require coordination. The website presents these capabilities without making assumptions about services that must be performed by licensed or third-party operators."
            align="center"
          />

          <div className="ael-export-capabilities__grid">
            {cmsCapabilities.map((item) => {
              const Icon =
                capabilityIcons[item.icon] ||
                Globe2;

              return (
                <div
                  key={item.title}
                  className="ael-export-capability"
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

      <section className="ael-section ael-export-process">
        <Container>
          <SectionHeading
            eyebrow="Export Journey"
            title="From Enquiry to Logistics Coordination."
            description="A simple process keeps important product and commercial information organised."
          />

          <div className="ael-export-process__list">
            {cmsSteps.map((step) => (
              <div
                className="ael-export-process__item"
                key={step.number}
              >
                <span>
                  {step.number}
                </span>

                <div>
                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="ael-export-documentation">
        <Container>
          <div className="ael-export-documentation__inner">
            <div>
              <div className="ael-home-section-label">
                <span />

                Documentation
              </div>

              <h2>
                Transaction-specific
                <span> documentation matters.</span>
              </h2>

              <p>
                Documentation requirements vary according
                to product, destination, transaction and
                shipping arrangement. Relevant documents
                should therefore be confirmed for each
                order rather than represented as a fixed
                universal checklist.
              </p>
            </div>

            <div className="ael-export-documentation__cards">
              <div>
                <FileText size={21} />

                <strong>
                  Commercial Documents
                </strong>

                <span>
                  As applicable to the confirmed transaction.
                </span>
              </div>

              <div>
                <PackageCheck size={21} />

                <strong>
                  Product / Packaging Information
                </strong>

                <span>
                  Based on agreed product and buyer requirements.
                </span>
              </div>

              <div>
                <Ship size={21} />

                <strong>
                  Shipment Documents
                </strong>

                <span>
                  According to the agreed shipping arrangement.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CorporateCta
        eyebrow="Export Enquiry"
        title="Planning to source products from India?"
        description="Share the product category, estimated quantity, destination and relevant specifications so the sourcing and export discussion can begin."
        primaryLabel="Send Export Enquiry"
      />
    </>
  );
};

export default ExportLogistics;
