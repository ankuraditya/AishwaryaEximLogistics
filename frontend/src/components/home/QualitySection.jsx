import {
  ArrowRight,
  Check,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";

import { qualityPoints as fallbackPoints } from "../../data/home";
import { usePageContent } from "../../hooks/usePageContent";
import qualitySeal from "../../assets/images/brand/quality-seal.svg";
import qualityWorkflow from "../../assets/images/brand/quality-inspection-workflow.svg";

const QualitySection = () => {
  const { page } = usePageContent("home");
  const remotePoints = page?.sections?.find((section) => section.section_key === "quality_points")?.content;
  const cmsSection = page?.sections?.find((section) => section.section_key === "quality_points");
  const qualityPoints = Array.isArray(remotePoints) && remotePoints.length ? remotePoints : fallbackPoints;
  return (
    <section className="ael-section ael-home-quality">
      <span className="ael-home-quality__background-art" aria-hidden="true" />

      <Container>
        <div className="ael-home-quality__grid">
          <div className="ael-home-quality__visual">
            <div className="ael-home-quality__shield">
              <img src={qualitySeal} alt="" aria-hidden="true" />
            </div>

            <span className="ael-home-quality__visual-ring ael-home-quality__visual-ring--one" aria-hidden="true" />
            <span className="ael-home-quality__visual-ring ael-home-quality__visual-ring--two" aria-hidden="true" />

            <div className="ael-home-quality__workflow" aria-hidden="true">
              <img src={qualityWorkflow} alt="" />
              <i className="ael-home-quality__scan-line" />
            </div>

            <span>
              Quality & Buyer Confidence
            </span>

            <strong>
              Clear requirements.
              Consistent communication.
            </strong>
          </div>

          <div className="ael-home-quality__content">
            <div className="ael-home-section-label">
              <span />

              {cmsSection?.eyebrow || "Quality Approach"}
            </div>

            <h2>{cmsSection?.heading || "Confidence starts with clarity."}</h2>

            <p>
              {cmsSection?.body || "Successful B2B sourcing begins with clearly defined requirements. Our website and enquiry process are structured to capture the information necessary for meaningful product and commercial discussions."}
            </p>

            <div className="ael-home-quality__points">
              {qualityPoints.map((point) => (
                <div key={point}>
                  <span>
                    <Check size={15} />
                  </span>

                  {point}
                </div>
              ))}
            </div>

            <Button
              to="/quality-compliance"
              variant="outline-primary"
            >
              Quality & Compliance

              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QualitySection;
