import { Eye, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getCertifications } from "../../api/certificationsApi";
import { useCmsSection } from "../../hooks/useCmsSection";
import { mediaUrl } from "../../utils/media";
import Container from "../common/Container";

const CertificationsSection = () => {
  const { content } = useCmsSection("home", "certifications", {
    eyebrow: "Business credentials",
    heading: "Documentation that builds buyer confidence.",
    body: "View our verified registrations and business credentials.",
  });
  const [certifications, setCertifications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getCertifications()
      .then((response) => {
        if (!active) return;
        const records = Array.isArray(response?.data) ? response.data : [];
        setCertifications(records.map((record) => ({ ...record, documentUrl: mediaUrl(record.media) })).filter((record) => record.documentUrl));
      })
      .catch(() => active && setCertifications([]))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!selected) return undefined;
    const close = (event) => event.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section className="ael-home-certifications" aria-labelledby="home-certifications-title">
      <span className="ael-home-certifications__mandala" aria-hidden="true" />
      <span className="ael-home-certifications__document-art" aria-hidden="true" />
      <Container>
        <div className="ael-home-certifications__header">
          <div>
            <div className="ael-section-label ael-home-certifications__label">
              <ShieldCheck size={17} aria-hidden="true" /> {content.eyebrow}
            </div>
            <h2 id="home-certifications-title">{content.heading}</h2>
          </div>
          <div className="ael-home-certifications__intro">
            <p>{content.body}</p>
            <Link className="ael-btn ael-btn--light" to="/contact-us">Request Verification <span aria-hidden="true">→</span></Link>
          </div>
        </div>

        {certifications.length > 0 ? (
          <div className="ael-home-certifications__grid">
            {certifications.map((certificate, index) => (
              <button type="button" className="ael-home-certificate" key={certificate.id} onClick={() => setSelected(certificate)} aria-label={`View ${certificate.title}`}>
                <span className="ael-home-certificate__paper">
                  <img src={certificate.documentUrl} alt={`${certificate.title} certificate preview`} loading="lazy" />
                  <span className="ael-home-certificate__view"><Eye size={19} /> View certificate</span>
                </span>
                <span className="ael-home-certificate__meta">
                  <small>{certificate.code || String(index + 1).padStart(2, "0")}</small>
                  <strong>{certificate.title}</strong>
                  {certificate.registration_number && <span>Registration: {certificate.registration_number}</span>}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div className="ael-home-certifications__empty" aria-live="polite">
            {loading ? "Loading credentials…" : "Verified certificates will appear here once published from the CMS."}
          </div>
        )}
      </Container>

      {selected && (
        <div className="ael-certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title" onMouseDown={(event) => event.target === event.currentTarget && setSelected(null)}>
          <div className="ael-certificate-modal__panel">
            <div className="ael-certificate-modal__head">
              <div><small>{selected.code || "Business credential"}</small><h3 id="certificate-modal-title">{selected.title}</h3></div>
              <button type="button" onClick={() => setSelected(null)} aria-label="Close certificate"><X size={24} /></button>
            </div>
            <div className="ael-certificate-modal__document"><img src={selected.documentUrl} alt={`${selected.title} certificate`} /></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;
