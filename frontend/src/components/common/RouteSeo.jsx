import {
  useLocation,
} from "react-router-dom";

import Seo from "./Seo";

import {
  getCatalogueCategory,
  getProductBySlug,
} from "../../data/catalogue";

import {
  getBlogPostBySlug,
} from "../../data/blog";

import {
  legalPages,
} from "../../data/legal";

import {
  makeAbsoluteUrl,
} from "../../config/seo";

const staticSeo = {
  "/": {
    title:
      "Indian Products for Global B2B Sourcing",

    description:
      "Explore Indian handicrafts, sustainable food packaging, leather goods and garments through Aishwary Exim & Logistics.",
  },

  "/about-us": {
    title:
      "About Us",

    description:
      "Learn about Aishwary Exim & Logistics and its multi-category, B2B-focused product sourcing approach.",
  },

  "/products": {
    title:
      "Product Catalogue",

    description:
      "Browse Indian handicrafts, biodegradable food packaging, leather goods, garments and jeans for B2B sourcing enquiries.",
  },

  "/handicrafts-gallery": {
    title:
      "Indian Handicrafts Gallery",

    description:
      "Explore original hand-painted bags, accessories and traditional Indian folk-art photography.",
  },

  "/export-logistics": {
    title:
      "Export & Logistics",

    description:
      "Explore Aishwary Exim & Logistics' requirement-based export and shipment coordination approach.",
  },

  "/quality-compliance": {
    title:
      "Quality & Compliance",

    description:
      "Learn about the product requirement, specification, packaging and compliance approach used for sourcing discussions.",
  },

  "/global-reach": {
    title:
      "Global Reach",

    description:
      "Connect with Aishwary Exim & Logistics for international B2B product sourcing enquiries from India.",
  },

  "/gallery": {
    title:
      "Media & Product Gallery",

    description:
      "Explore available product and handicraft photography from Aishwary Exim & Logistics.",
  },

  "/blog": {
    title:
      "Product & Sourcing Insights",

    description:
      "Read practical insights about Indian products, B2B sourcing, handicrafts, sustainable packaging and export enquiries.",
  },

  "/contact-us": {
    title:
      "Contact Us",

    description:
      "Contact Aishwary Exim & Logistics for product sourcing, export and general business enquiries.",
  },

  "/request-a-quote": {
    title:
      "Request a Quote",

    description:
      "Submit your product, quantity, destination and sourcing requirements for a B2B commercial discussion.",
  },
};

const RouteSeo = () => {
  const location =
    useLocation();

  const pathname =
    location.pathname;

  const segments =
    pathname
      .split("/")
      .filter(Boolean);

  let seo =
    staticSeo[pathname] ||
    null;

  let structuredData =
    null;

  let type =
    "website";

  let canonicalPath =
    pathname;

  /*
   * Product category
   */
  if (
    segments[0] ===
      "products" &&
    segments.length === 2
  ) {
    const category =
      getCatalogueCategory(
        segments[1]
      );

    if (category) {
      seo = {
        title:
          category.name,

        description:
          category.description,
      };
    }
  }

  /*
   * Product detail
   */
  if (
    segments[0] ===
      "products" &&
    segments.length === 3
  ) {
    const product =
      getProductBySlug(
        segments[1],
        segments[2]
      );

    if (product) {
      seo = {
        title:
          product.name,

        description:
          product.shortDescription,

        image:
          product.image ||
          product.gallery?.[0] ||
          "",
      };

      type = "product";

      structuredData = {
        "@context":
          "https://schema.org",

        "@type":
          "Product",

        name:
          product.name,

        description:
          product.shortDescription,

        sku:
          product.code,

        url:
          makeAbsoluteUrl(
            pathname
          ),

        ...(seo.image
          ? {
              image:
                makeAbsoluteUrl(
                  seo.image
                ),
            }
          : {}),
      };
    }
  }

  /*
   * Blog article
   */
  if (
    segments[0] ===
      "blog" &&
    segments.length === 2
  ) {
    const post =
      getBlogPostBySlug(
        segments[1]
      );

    if (post) {
      seo = {
        title:
          post.title,

        description:
          post.excerpt,
      };

      type = "article";

      structuredData = {
        "@context":
          "https://schema.org",

        "@type":
          "BlogPosting",

        headline:
          post.title,

        description:
          post.excerpt,

        mainEntityOfPage:
          makeAbsoluteUrl(
            pathname
          ),
      };
    }
  }

  /*
   * Legal
   */
  const legal =
    legalPages[
      segments[0]
    ];

  if (legal) {
    seo = {
      title:
        legal.title,

      description:
        legal.intro,
    };
  }

  /*
   * Organisation schema
   */
  if (pathname === "/") {
    structuredData = {
      "@context":
        "https://schema.org",

      "@type":
        "Organization",

      name:
        "Aishwary Exim & Logistics",

      url:
        makeAbsoluteUrl("/"),
    };
  }

  /*
   * Filter/search/modal query URLs should not
   * become independent search-engine pages.
   */
  const queryDrivenRoutes = [
    "/products",
    "/blog",
    "/gallery",
    "/handicrafts-gallery",
    "/request-a-quote",
  ];

  const hasQuery =
    Boolean(
      location.search
    );

  const isQueryDriven =
    queryDrivenRoutes.some(
      (route) =>
        pathname === route ||
        pathname.startsWith(
          `${route}/`
        )
    );

  const robots =
    hasQuery &&
    isQueryDriven
      ? "noindex,follow"
      : "index,follow";

  return (
    <Seo
      title={seo?.title}
      description={
        seo?.description
      }
      image={seo?.image}
      type={type}
      canonicalPath={
        canonicalPath
      }
      robots={robots}
      structuredData={
        structuredData
      }
    />
  );
};

export default RouteSeo;