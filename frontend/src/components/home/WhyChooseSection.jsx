import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

import { whyChooseItems as fallbackItems } from "../../data/home";
import { usePageContent } from "../../hooks/usePageContent";
import exportImage from "../../assets/images/why-aishwary/export-focus.webp";
import portfolioImage from "../../assets/images/why-aishwary/multi-category.webp";
import sourcingImage from "../../assets/images/why-aishwary/sourcing.webp";
import qualityImage from "../../assets/images/why-aishwary/quality.webp";
import communicationImage from "../../assets/images/why-aishwary/communication.webp";
import bulkImage from "../../assets/images/why-aishwary/bulk-b2b.webp";

const cardImages = {
  globe: exportImage,
  boxes: portfolioImage,
  search: sourcingImage,
  shield: qualityImage,
  handshake: communicationImage,
  package: bulkImage,
};

const WhyChooseSection = () => {
  const { page } = usePageContent("home");
  const remoteItems = page?.sections?.find((section) => section.section_key === "why_choose")?.content;
  const cmsSection = page?.sections?.find((section) => section.section_key === "why_choose");
  const whyChooseItems = Array.isArray(remoteItems) && remoteItems.length ? remoteItems.map((item, index) => ({ ...fallbackItems[index], ...item })) : fallbackItems;
  return (
    <section className="ael-section ael-home-why">
      <span className="ael-home-why__background-art ael-home-why__background-art--globe" aria-hidden="true" />
      <span className="ael-home-why__background-art ael-home-why__background-art--vine" aria-hidden="true" />

      <Container>
        <SectionHeading
          eyebrow={cmsSection?.eyebrow || "Why Aishwary"}
          title={cmsSection?.heading || "Built Around the Requirements of Business Buyers."}
          description={cmsSection?.body || "Our approach combines diversified Indian product sourcing with structured communication and an export-oriented buyer journey."}
          align="center"
        />

        <div className="ael-home-why__grid">
          {whyChooseItems.map((item, index) => {
            return (
              <div
                className="ael-home-why-card"
                key={item.title}
              >
                <div className="ael-home-why-card__image">
                  <img
                    src={cardImages[item.icon]}
                    alt=""
                    loading="lazy"
                  />
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="ael-home-why-card__body">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseSection;
