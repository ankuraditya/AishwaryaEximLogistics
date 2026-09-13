import { MessageCircle } from "lucide-react";

import { useWebsiteSettings } from "../../hooks/useWebsiteSettings";

import "./floating-whatsapp.css";

const FloatingWhatsapp = () => {
  const companyInfo = useWebsiteSettings();
  const number = companyInfo.whatsapp?.replace(/\D/g, "") || "";
  const message = encodeURIComponent(
    "Hello Aishwary Exim & Logistics, I would like to discuss a product sourcing requirement."
  );

  if (!number) return null;

  return (
    <a
      className="ael-floating-whatsapp"
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Aishwary Exim & Logistics on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <span className="ael-floating-whatsapp__pulse" aria-hidden="true" />
      <MessageCircle size={27} strokeWidth={2.2} aria-hidden="true" />
      <span className="ael-floating-whatsapp__label">WhatsApp</span>
    </a>
  );
};

export default FloatingWhatsapp;
