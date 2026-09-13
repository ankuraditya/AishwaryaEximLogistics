import {
  ArrowRight,
  Globe2,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";

const CorporateHero = ({
  eyebrow,
  title,
  highlight,
  description,
  primaryLabel = "Explore Products",
  primaryTo = "/products",
  secondaryLabel = "Request a Quote",
  secondaryTo = "/request-a-quote",
  visual,
  meta = [],
  theme = "blue",
}) => {
  return (
    <section
      className={[
        "ael-corporate-hero",
        `ael-corporate-hero--${theme}`,
      ].join(" ")}
    >
      <div className="ael-corporate-hero__circle ael-corporate-hero__circle--one" />
      <div className="ael-corporate-hero__circle ael-corporate-hero__circle--two" />

      <Container className="ael-corporate-hero__container">
        <div className="ael-corporate-hero__content">
          <div className="ael-corporate-hero__eyebrow">
            <Globe2 size={15} />

            {eyebrow}
          </div>

          <h1>
            {title}

            {highlight && (
              <>
                {" "}
                <span>{highlight}</span>
              </>
            )}
          </h1>

          <p>
            {description}
          </p>

          <div className="ael-corporate-hero__actions">
            <Button
              to={primaryTo}
              size="lg"
            >
              {primaryLabel}

              <ArrowRight size={17} />
            </Button>

            <Button
              to={secondaryTo}
              variant="outline-primary"
              size="lg"
            >
              {secondaryLabel}
            </Button>
          </div>

          {meta.length > 0 && (
            <div className="ael-corporate-hero__meta">
              {meta.map((item) => (
                <span key={item}>
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="ael-corporate-hero__visual">
          {visual}
        </div>
      </Container>
    </section>
  );
};

export default CorporateHero;