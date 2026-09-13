import {
  FileText,
  Globe2,
  PackageSearch,
} from "lucide-react";

import Container from "../common/Container";
import { useCmsSection } from "../../hooks/useCmsSection";

const EnquiryHero = ({
  product,
  galleryItem,
}) => {
  const { content: cms } = useCmsSection("request-a-quote", "hero", {});
  const mode = product
    ? "product"
    : galleryItem
      ? "gallery"
      : "export";

  const content = {
    product: {
      eyebrow:
        "Product Enquiry",
      title:
        "Request Product Information & Quote.",
      description:
        "Share your quantity, destination, specifications and other requirements for this product.",
      Icon:
        PackageSearch,
    },

    gallery: {
      eyebrow:
        "Handicraft Enquiry",
      title:
        "Interested in This Handicraft Design?",
      description:
        "Share the selected design together with your quantity and sourcing requirements.",
      Icon:
        FileText,
    },

    export: {
      eyebrow:
        "Export & Sourcing Enquiry",
      title:
        "Tell Us What You Need to Source.",
      description:
        "Share your product category, approximate quantity, destination and relevant requirements to begin a structured B2B discussion.",
      Icon:
        Globe2,
    },
  };

  const {
    eyebrow,
    title,
    description,
    Icon,
  } = mode === "export" ? {
    ...content[mode],
    ...cms,
    title: cms.heading || content[mode].title,
    description: cms.body || content[mode].description,
  } : content[mode];

  return (
    <section className="ael-enquiry-hero">
      <Container className="ael-enquiry-hero__container">
        <div className="ael-enquiry-hero__content">
          <div className="ael-enquiry-hero__eyebrow">
            <Icon size={16} />

            {eyebrow}
          </div>

          <h1>{title}</h1>

          <p>
            {description}
          </p>

          <div className="ael-enquiry-hero__meta">
            <span>
              B2B & Bulk Enquiries
            </span>

            <span>
              Requirement Based
            </span>

            <span>
              Export Oriented
            </span>
          </div>
        </div>

        <div className="ael-enquiry-hero__visual">
          <div>
            <Globe2 size={78} />
          </div>

          <span className="ael-enquiry-hero__orbit ael-enquiry-hero__orbit--one" />
          <span className="ael-enquiry-hero__orbit ael-enquiry-hero__orbit--two" />

          <strong>
            Bihar, India
          </strong>

          <small>
            Connecting to global
            business opportunities
          </small>
        </div>
      </Container>
    </section>
  );
};

export default EnquiryHero;
