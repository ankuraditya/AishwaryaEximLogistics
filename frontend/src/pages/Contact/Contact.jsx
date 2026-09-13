import {
  ArrowRight,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";

import Breadcrumb from "../../components/common/Breadcrumb";
import Container from "../../components/common/Container";
import ContactForm from "../../components/enquiry/ContactForm";

import { useWebsiteSettings } from "../../hooks/useWebsiteSettings";
import { useCmsSection } from "../../hooks/useCmsSection";

import "../../components/enquiry/enquiry.css";
import "./contact.css";

const Contact = () => {
  const companyInfo = useWebsiteSettings();
  const { content: hero } = useCmsSection("contact-us", "hero", { eyebrow: "Contact Aishwary", heading: "Start a Business Conversation.", body: "Contact Aishwary Exim & Logistics for product sourcing, export enquiries, handicrafts, packaging, leather goods, garments or general business discussions." });
  const { content: intro } = useCmsSection("contact-us", "contact_information", { eyebrow: "Contact Information", heading: "How can we help?", body: "Use the form for general questions. For a specific product or export requirement, the Request Quote form captures more detailed information." });
  const whatsappNumber =
    companyInfo.whatsapp
      ? companyInfo.whatsapp.replace(
          /\D/g,
          ""
        )
      : "";

  return (
    <>
      <section className="ael-contact-hero">
        <Container>
          <div className="ael-contact-hero__content">
            <div className="ael-contact-hero__eyebrow">
              <Globe2 size={15} />

              {hero.eyebrow}
            </div>

            <h1>{hero.heading}</h1>

            <p>
              {hero.body}
            </p>
          </div>
        </Container>
      </section>

      <section className="ael-contact-breadcrumb">
        <Container>
          <Breadcrumb
            items={[
              {
                label:
                  "Contact Us",
              },
            ]}
          />
        </Container>
      </section>

      <section className="ael-section ael-contact-page">
        <Container>
          <div className="ael-contact-page__grid">
            <div className="ael-contact-page__information">
              <span className="ael-home-section-label">
                <span />

                {intro.eyebrow}
              </span>

              <h2>
                {intro.heading}
              </h2>

              <p>
                {intro.body}
              </p>

              <div className="ael-contact-page__cards">
                <div>
                  <span>
                    <MapPin
                      size={20}
                    />
                  </span>

                  <div>
                    <small>
                      Location
                    </small>

                    <strong>
                      {companyInfo.address ||
                        companyInfo.location}
                    </strong>
                  </div>
                </div>

                {companyInfo.email && (
                  <a
                    href={`mailto:${companyInfo.email}`}
                  >
                    <span>
                      <Mail
                        size={20}
                      />
                    </span>

                    <div>
                      <small>
                        Email
                      </small>

                      <strong>
                        {
                          companyInfo.email
                        }
                      </strong>
                    </div>
                  </a>
                )}

                {companyInfo.phone && (
                  <a
                    href={`tel:${companyInfo.phone.replace(
                      /\s+/g,
                      ""
                    )}`}
                  >
                    <span>
                      <Phone
                        size={20}
                      />
                    </span>

                    <div>
                      <small>
                        Phone
                      </small>

                      <strong>
                        {
                          companyInfo.phone
                        }
                      </strong>
                    </div>
                  </a>
                )}

                {whatsappNumber && (
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>
                      <MessageCircle
                        size={20}
                      />
                    </span>

                    <div>
                      <small>
                        WhatsApp
                      </small>

                      <strong>
                        Start Chat
                      </strong>
                    </div>
                  </a>
                )}
              </div>

              <Link
                to="/request-a-quote"
                className="ael-contact-page__quote-link"
              >
                Have a product requirement?

                <ArrowRight
                  size={16}
                />
              </Link>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
