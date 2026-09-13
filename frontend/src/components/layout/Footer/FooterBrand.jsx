import { Link } from "react-router-dom";

import logo from "../../../assets/images/brand/aishwarya-logo-white.png";

import { useWebsiteSettings } from "../../../hooks/useWebsiteSettings";

const socialLabels = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

const FooterBrand = () => {
  const companyInfo = useWebsiteSettings();
  const availableSocialLinks = Object.entries(
    companyInfo.socialLinks || {}
  ).filter(([, url]) => Boolean(url));

  return (
    <div className="ael-footer-brand">
      <Link
        to="/"
        className="ael-footer-brand__logo"
        aria-label="Aishwary Exim & Logistics home"
      >
        <img
          src={companyInfo.branding?.logo_white || logo}
          alt={companyInfo.name}
        />
      </Link>

      <p className="ael-footer-brand__description">
        {companyInfo.footer?.description || companyInfo.description}
      </p>

      <div className="ael-footer-brand__tagline">
        <span aria-hidden="true" />

        {companyInfo.tagline}
      </div>

      {availableSocialLinks.length > 0 && (
        <div
          className="ael-footer-social"
          aria-label="Social media links"
        >
          {availableSocialLinks.map(
            ([platform, url]) => {
              const label =
                socialLabels[platform] ||
                platform;

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Aishwary Exim & Logistics on ${label}`}
                  title={label}
                >
                  {label}
                </a>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default FooterBrand;
