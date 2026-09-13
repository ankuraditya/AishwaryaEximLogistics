import { useEffect, useState } from "react";
import { getWebsiteSettings } from "../api/settingsApi";
import { companyInfo as fallback } from "../data/company";
import { mediaUrl } from "../utils/media";

let request;
export const useWebsiteSettings = () => {
  const [companyInfo, setCompanyInfo] = useState(fallback);
  useEffect(() => {
    let active = true;
    request ||= getWebsiteSettings();
    request.then((response) => {
      const settings = response?.data;
      if (!active || !settings) return;
      setCompanyInfo({
        ...fallback,
        ...settings.company,
        ...Object.fromEntries(Object.entries(settings.contact || {}).filter(([, value]) => value)),
        socialLinks: { ...fallback.socialLinks, ...settings.social },
        branding: Object.fromEntries(
          Object.entries(settings.branding || {}).map(([key, value]) => [
            key,
            value ? mediaUrl(value?.url || value?.original_url || value) : "",
          ])
        ),
        footer: settings.footer || {},
        seo: Object.fromEntries(
          Object.entries(settings.seo || {}).map(([key, value]) => [
            key,
            value ? mediaUrl(value?.url || value?.original_url || value) : "",
          ])
        ),
        analytics: settings.analytics || {},
        scripts: settings.scripts || {},
      });
    }).catch(() => {});
    return () => { active = false; };
  }, []);
  return companyInfo;
};
