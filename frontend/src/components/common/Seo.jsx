import {
  useEffect,
} from "react";

import {
  makeAbsoluteUrl,
  seoConfig,
} from "../../config/seo";
import { useWebsiteSettings } from "../../hooks/useWebsiteSettings";

const setMeta = ({
  attribute,
  key,
  content,
}) => {
  if (!content) {
    return;
  }

  let element =
    document.head.querySelector(
      `meta[${attribute}="${key}"]`
    );

  if (!element) {
    element =
      document.createElement(
        "meta"
      );

    element.setAttribute(
      attribute,
      key
    );

    document.head.appendChild(
      element
    );
  }

  element.setAttribute(
    "content",
    content
  );
};

const Seo = ({
  title,
  description,
  canonicalPath,
  image,
  type = "website",
  robots =
    seoConfig.defaultRobots,
  structuredData = null,
}) => {
  const websiteSettings = useWebsiteSettings();
  const dynamicSeo = websiteSettings.seo || {};

  useEffect(() => {
    const fullTitle =
      title
        ? `${title} | ${seoConfig.siteName}`
        : dynamicSeo.default_title || seoConfig.defaultTitle;

    const finalDescription =
      description ||
      dynamicSeo.default_description || seoConfig.defaultDescription;

    const canonicalUrl =
      makeAbsoluteUrl(
        canonicalPath ||
          window.location.pathname
      );

    const imageUrl =
      image || dynamicSeo.og_image
        ? makeAbsoluteUrl(image || dynamicSeo.og_image)
        : "";

    document.title =
      fullTitle;

    setMeta({
      attribute: "name",
      key: "description",
      content:
        finalDescription,
    });

    setMeta({
      attribute: "name",
      key: "robots",
      content: robots,
    });

    setMeta({
      attribute: "property",
      key: "og:title",
      content: fullTitle,
    });

    setMeta({
      attribute: "property",
      key: "og:description",
      content:
        finalDescription,
    });

    setMeta({
      attribute: "property",
      key: "og:type",
      content: type,
    });

    setMeta({
      attribute: "property",
      key: "og:url",
      content: canonicalUrl,
    });

    setMeta({
      attribute: "property",
      key: "og:site_name",
      content:
        seoConfig.siteName,
    });

    setMeta({
      attribute: "name",
      key: "twitter:card",
      content:
        imageUrl
          ? "summary_large_image"
          : "summary",
    });

    setMeta({
      attribute: "name",
      key: "twitter:title",
      content: fullTitle,
    });

    setMeta({
      attribute: "name",
      key: "twitter:description",
      content:
        finalDescription,
    });

    if (imageUrl) {
      setMeta({
        attribute:
          "property",
        key: "og:image",
        content: imageUrl,
      });

      setMeta({
        attribute: "name",
        key:
          "twitter:image",
        content: imageUrl,
      });
    }

    let canonical =
      document.head.querySelector(
        'link[rel="canonical"]'
      );

    if (!canonical) {
      canonical =
        document.createElement(
          "link"
        );

      canonical.setAttribute(
        "rel",
        "canonical"
      );

      document.head.appendChild(
        canonical
      );
    }

    canonical.setAttribute(
      "href",
      canonicalUrl
    );

    const schemaId =
      "ael-structured-data";

    let schema =
      document.getElementById(
        schemaId
      );

    if (structuredData) {
      if (!schema) {
        schema =
          document.createElement(
            "script"
          );

        schema.id =
          schemaId;

        schema.type =
          "application/ld+json";

        document.head.appendChild(
          schema
        );
      }

      schema.textContent =
        JSON.stringify(
          structuredData
        );
    } else if (schema) {
      schema.remove();
    }
  }, [
    title,
    description,
    canonicalPath,
    image,
    type,
    robots,
    structuredData,
    dynamicSeo.default_title,
    dynamicSeo.default_description,
    dynamicSeo.og_image,
  ]);

  return null;
};

export default Seo;
