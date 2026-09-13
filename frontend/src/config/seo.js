export const seoConfig = {
  siteName:
    "Aishwary Exim & Logistics",

  defaultTitle:
    "Aishwary Exim & Logistics | Indian Products & B2B Sourcing",

  defaultDescription:
    "Explore Indian handicrafts, biodegradable food packaging, leather goods and garments for B2B sourcing and export enquiries.",

  defaultRobots:
    "index,follow",
};

export const getSiteUrl = () => {
  const configured =
    (
      import.meta.env
        .VITE_SITE_URL || ""
    ).replace(/\/$/, "");

  if (configured) {
    return configured;
  }

  if (
    typeof window !==
    "undefined"
  ) {
    return window.location.origin;
  }

  return "";
};

export const makeAbsoluteUrl = (
  value = ""
) => {
  if (!value) {
    return "";
  }

  if (
    /^https?:\/\//i.test(value)
  ) {
    return value;
  }

  const base =
    getSiteUrl();

  return `${base}${
    value.startsWith("/")
      ? value
      : `/${value}`
  }`;
};