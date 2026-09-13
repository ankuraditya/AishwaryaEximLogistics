import {
  Boxes,
  Globe2,
  Handshake,
  PackageCheck,
} from "lucide-react";

import Container from "../common/Container";

const items = [
  {
    icon: Boxes,
    title: "Multi-Category",
    text: "Product Portfolio",
  },
  {
    icon: Handshake,
    title: "B2B",
    text: "Buyer Focus",
  },
  {
    icon: PackageCheck,
    title: "Requirement-Based",
    text: "Product Discussion",
  },
  {
    icon: Globe2,
    title: "Export-Oriented",
    text: "Business Approach",
  },
];

const CorporateStatStrip = () => {
  return (
    <section className="ael-corporate-strip">
      <Container>
        <div className="ael-corporate-strip__grid">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="ael-corporate-strip__item"
              >
                <span>
                  <Icon size={20} />
                </span>

                <div>
                  <strong>
                    {item.title}
                  </strong>

                  <small>
                    {item.text}
                  </small>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default CorporateStatStrip;