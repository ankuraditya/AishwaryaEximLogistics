import {
  ArrowRight,
  Leaf,
  PackageCheck,
  Recycle,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";
import { useCmsSection } from "../../hooks/useCmsSection";

const SustainabilitySection = () => {
  const { content } = useCmsSection("home", "sustainability", {
    eyebrow: "Sustainable Product Category", heading: "Packaging designed for a more responsible future.",
    body: "Our biodegradable food packaging category is intended for food-service businesses, distributors and institutional buyers exploring alternatives to conventional disposable packaging.",
    items: [
      { title: "Eco-Conscious Category", description: "Product options centred around sustainable packaging requirements." },
      { title: "Alternative Materials", description: "Packaging selections can vary according to the product and buyer requirement." },
      { title: "B2B Supply Focus", description: "Structured for bulk, food-service and distributor sourcing discussions." },
    ],
  });
  return (
    <section className="ael-home-sustainability">
      <span className="ael-home-sustainability__art ael-home-sustainability__art--leaf" aria-hidden="true" />
      <span className="ael-home-sustainability__art ael-home-sustainability__art--packaging" aria-hidden="true" />

      <Container>
        <div className="ael-home-sustainability__inner">
          <div className="ael-home-sustainability__content">
            <div className="ael-home-sustainability__label">
              <Leaf size={16} />

              {content.eyebrow}
            </div>

            <h2>{content.heading}</h2>

            <p>
              {content.body}
            </p>

            <Button
              to="/products/biodegradable-food-packaging"
              variant="white"
            >
              Explore Packaging

              <ArrowRight size={17} />
            </Button>
          </div>

          <div className="ael-home-sustainability__features">
            <div data-number="01">
              <span>
                <Leaf size={23} />
              </span>

              <strong>
                {content.items?.[0]?.title}
              </strong>

              <p>
                {content.items?.[0]?.description}
              </p>
            </div>

            <div data-number="02">
              <span>
                <Recycle size={23} />
              </span>

              <strong>
                {content.items?.[1]?.title}
              </strong>

              <p>
                {content.items?.[1]?.description}
              </p>
            </div>

            <div data-number="03">
              <span>
                <PackageCheck size={23} />
              </span>

              <strong>
                {content.items?.[2]?.title}
              </strong>

              <p>
                {content.items?.[2]?.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default SustainabilitySection;
