import {
  ArrowUp,
  Globe2,
} from "lucide-react";

import { Link } from "react-router-dom";

import Container from "../../common/Container";

import {
  buyerFooterLinks,
  companyFooterLinks,
  legalFooterLinks,
} from "../../../data/footerNavigation";

import { useWebsiteSettings } from "../../../hooks/useWebsiteSettings";

import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterCta from "./FooterCta";
import FooterNavigation from "./FooterNavigation";

import "./footer.css";

const Footer = () => {
  const companyInfo = useWebsiteSettings();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <FooterCta />

      <footer className="ael-footer">
        <div className="ael-footer__main">
          <Container>
            <div className="ael-footer__grid">
              <FooterBrand />

              <FooterNavigation
                title="Company"
                links={companyFooterLinks}
              />

              <FooterNavigation
                title="For Buyers"
                links={buyerFooterLinks}
              />

              <FooterContact />
            </div>

            <div className="ael-footer__trade-strip">
              <div className="ael-footer__trade-icon">
                <Globe2 size={20} />
              </div>

              <div>
                <strong>
                  Indian Products. Global Markets.
                </strong>

                <span>
                  Handicrafts • Biodegradable
                  Packaging • Leather Goods •
                  Garments
                </span>
              </div>
            </div>
          </Container>

          <div className="ael-footer__patna-skyline" aria-hidden="true" />
        </div>

        <div className="ael-footer__bottom">
          <Container className="ael-footer__bottom-container">
            <p>
              © {currentYear}{" "}
              {companyInfo.footer?.copyright_name || companyInfo.name}. All rights
              reserved.
            </p>

            <nav
              className="ael-footer__legal"
              aria-label="Legal navigation"
            >
              {legalFooterLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              className="ael-footer__back-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <ArrowUp size={17} />

              <span>Back to Top</span>
            </button>
          </Container>
        </div>
      </footer>
    </>
  );
};

export default Footer;
