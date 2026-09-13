import {
  ArrowRight,
  Globe2,
  PackageCheck,
} from "lucide-react";

import Button from "../../common/Button";
import Container from "../../common/Container";

const FooterCta = () => {
  return (
    <section className="ael-footer-cta">
      <Container>
        <div className="ael-footer-cta__inner">
          <span className="ael-footer-cta__route-art" aria-hidden="true" />

          <div className="ael-footer-cta__icon">
            <Globe2 size={29} />
          </div>

          <div className="ael-footer-cta__content">
            <span className="ael-footer-cta__eyebrow">
              International Buyer Enquiries
            </span>

            <h2>
              Looking to source quality Indian
              products?
            </h2>

            <p>
              Share your product, quantity,
              customisation and destination
              requirements with our team.
            </p>
          </div>

          <div className="ael-footer-cta__actions">
            <Button
              to="/request-a-quote"
              variant="white"
              size="lg"
            >
              Request a Quote

              <ArrowRight size={18} />
            </Button>

            <div className="ael-footer-cta__support">
              <PackageCheck size={18} />

              <span>
                Bulk & B2B enquiries welcome
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FooterCta;
