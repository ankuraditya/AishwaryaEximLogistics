import {
  ArrowRight,
  FileText,
  Handshake,
  PackageCheck,
  SearchCheck,
  Ship,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

import { exportProcess as fallbackProcess } from "../../data/home";
import { usePageContent } from "../../hooks/usePageContent";

const stepIcons = [FileText, SearchCheck, Handshake, PackageCheck, Ship];

const ExportProcessSection = () => {
  const { page } = usePageContent("home");
  const remoteProcess = page?.sections?.find((section) => section.section_key === "export_process")?.content;
  const cmsSection = page?.sections?.find((section) => section.section_key === "export_process");
  const exportProcess = Array.isArray(remoteProcess) && remoteProcess.length ? remoteProcess : fallbackProcess;
  return (
    <section className="ael-section ael-home-process">
      <span className="ael-home-process__route-art" aria-hidden="true" />

      <Container>
        <div className="ael-home-process__header">
          <SectionHeading
            eyebrow={cmsSection?.eyebrow || "How We Work"}
            title={cmsSection?.heading || "A Clear Path From Requirement to Shipment."}
            description={cmsSection?.body || "A structured buyer journey keeps sourcing discussions organised from the first enquiry through order and logistics coordination."}
          />

          <Button
            to="/export-logistics"
            variant="outline-primary"
          >
            Export & Logistics

            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="ael-home-process__grid">
          {exportProcess.map(
            (step, index) => {
              const StepIcon = stepIcons[index] || FileText;

              return (
              <div
                className="ael-home-process-card"
                key={step.number}
                style={{ "--ael-step-delay": `${index * 0.16}s` }}
              >
                <div className="ael-home-process-card__top">
                  <div className="ael-home-process-card__number">
                    {step.number}
                  </div>

                  <div className="ael-home-process-card__icon">
                    <StepIcon size={21} />
                  </div>
                </div>

                <div className="ael-home-process-card__line">
                  <span />

                  {index !==
                    exportProcess.length - 1 && (
                    <i />
                  )}
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
              );
            }
          )}
        </div>
      </Container>
    </section>
  );
};

export default ExportProcessSection;
