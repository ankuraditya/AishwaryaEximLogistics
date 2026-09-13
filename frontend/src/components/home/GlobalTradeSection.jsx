import {
  ArrowRight,
  Boxes,
  PackageCheck,
  Ship,
} from "lucide-react";

import Button from "../common/Button";
import Container from "../common/Container";
import biharIndiaHeritageMap from "../../assets/images/brand/bihar-to-world-flight.svg";
import { useCmsSection } from "../../hooks/useCmsSection";
import { mediaUrl } from "../../utils/media";

const GlobalTradeSection = () => {
  const { content } = useCmsSection("home", "global_trade", {
    eyebrow: "Global Business Perspective", heading: "From Bihar, India to the world.",
    body: "Aishwary Exim & Logistics is positioned to connect Indian products with buyers through organised product discovery, sourcing discussion and export-oriented coordination.",
    items: ["Multi-category sourcing", "Buyer-specific requirements", "Logistics coordination"],
  });
  return (
    <section className="ael-home-global">
      <Container>
        <div className="ael-home-global__inner">
          <div className="ael-home-global__graphic">
            <img
              className="ael-home-global__heritage-map"
              src={mediaUrl(content.media) || biharIndiaHeritageMap}
              alt="Illustrated Bihar landmark skyline with flights connecting Bihar to global markets"
            />

            <div className="ael-home-global__origin">
              <strong>
                Bihar
              </strong>

              <span>
                Heritage to Global Trade
              </span>
            </div>
          </div>

          <div className="ael-home-global__content">
            <div className="ael-home-global__eyebrow">
              {content.eyebrow}
            </div>

            <h2>{content.heading}</h2>

            <p>
              {content.body}
            </p>

            <div className="ael-home-global__capabilities">
              <div>
                <Boxes size={18} />

                {content.items?.[0]}
              </div>

              <div>
                <PackageCheck size={18} />

                {content.items?.[1]}
              </div>

              <div>
                <Ship size={18} />

                {content.items?.[2]}
              </div>
            </div>

            <Button
              to="/global-reach"
              variant="white"
            >
              Explore Global Reach

              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GlobalTradeSection;
