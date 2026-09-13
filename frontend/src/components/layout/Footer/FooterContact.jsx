import {
  ArrowRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useWebsiteSettings } from "../../../hooks/useWebsiteSettings";

const FooterContact = () => {
  const companyInfo = useWebsiteSettings();
  const phoneHref = companyInfo.phone
    ? `tel:${companyInfo.phone.replace(/\s+/g, "")}`
    : null;

  const emailHref = companyInfo.email
    ? `mailto:${companyInfo.email}`
    : null;

  const whatsappHref = companyInfo.whatsapp
    ? `https://wa.me/${companyInfo.whatsapp.replace(
        /\D/g,
        ""
      )}`
    : null;

  return (
    <div className="ael-footer-column ael-footer-contact">
      <h3 className="ael-footer-column__title">
        Contact & Enquiry
      </h3>

      <p className="ael-footer-contact__intro">
        Looking to source products from India?
        Share your requirement with our team.
      </p>

      <div className="ael-footer-contact__details">
        {companyInfo.address && (
          <div className="ael-footer-contact__item">
            <MapPin size={17} />

            <span>{companyInfo.address}</span>
          </div>
        )}

        {!companyInfo.address &&
          companyInfo.location && (
            <div className="ael-footer-contact__item">
              <MapPin size={17} />

              <span>{companyInfo.location}</span>
            </div>
          )}

        {companyInfo.phone && (
          <a
            href={phoneHref}
            className="ael-footer-contact__item"
          >
            <Phone size={17} />

            <span>{companyInfo.phone}</span>
          </a>
        )}

        {companyInfo.email && (
          <a
            href={emailHref}
            className="ael-footer-contact__item"
          >
            <Mail size={17} />

            <span>{companyInfo.email}</span>
          </a>
        )}

        {companyInfo.whatsapp && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="ael-footer-contact__item"
          >
            <MessageCircle size={17} />

            <span>WhatsApp Us</span>
          </a>
        )}
      </div>

      <Link
        to="/request-a-quote"
        className="ael-footer-contact__quote"
      >
        Request Export Quote

        <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default FooterContact;
