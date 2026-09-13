import {
  ArrowRight,
  MessageSquareText,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";

const CorporateCta = ({
  eyebrow = "Start a Business Enquiry",
  title,
  description,
  primaryLabel = "Request a Quote",
  primaryTo = "/request-a-quote",
  secondaryLabel = "Contact Us",
  secondaryTo = "/contact-us",
}) => {
  return (
    <section className="ael-corporate-cta">
      <Container>
        <div className="ael-corporate-cta__inner">
          <div className="ael-corporate-cta__icon">
            <MessageSquareText size={28} />
          </div>

          <div className="ael-corporate-cta__content">
            <span>
              {eyebrow}
            </span>

            <h2>
              {title}
            </h2>

            <p>
              {description}
            </p>
          </div>

          <div className="ael-corporate-cta__actions">
            <Button
              to={primaryTo}
              variant="secondary"
            >
              {primaryLabel}

              <ArrowRight size={16} />
            </Button>

            <Button
              to={secondaryTo}
              variant="outline-primary"
            >
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CorporateCta;