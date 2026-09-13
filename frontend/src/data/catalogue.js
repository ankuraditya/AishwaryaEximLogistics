import handicraft01 from "../assets/images/handicrafts/handicraft-01.webp";
import handicraft02 from "../assets/images/handicrafts/handicraft-02.webp";
import handicraft03 from "../assets/images/handicrafts/handicraft-03.webp";
import handicraft04 from "../assets/images/handicrafts/handicraft-04.webp";
import handicraft05 from "../assets/images/handicrafts/handicraft-05.webp";
import handicraft06 from "../assets/images/handicrafts/handicraft-06.webp";
import handicraft07 from "../assets/images/handicrafts/handicraft-07.webp";
import handicraft08 from "../assets/images/handicrafts/handicraft-08.webp";

export const catalogueCategories = [
  {
    slug: "handicrafts",
    name: "Indian Handicrafts",
    shortName: "Handicrafts",
    icon: "palette",

    description:
      "Explore hand-painted bags, purses, clutches, accessories and traditional Indian folk-art products.",

    heroText:
      "Distinctive Indian craftsmanship presented for modern B2B product sourcing.",

    subcategories: [
      {
        slug: "hand-painted-bags",
        name: "Hand-Painted Bags",
      },
      {
        slug: "tote-bags",
        name: "Tote Bags",
      },
      {
        slug: "purses-clutches",
        name: "Purses & Clutches",
      },
      {
        slug: "folders-accessories",
        name: "Folders & Accessories",
      },
      {
        slug: "decorative-artwork",
        name: "Decorative Artwork",
      },
    ],
  },

  {
    slug: "biodegradable-food-packaging",
    name: "Biodegradable Food Packaging",
    shortName: "Sustainable Packaging",
    icon: "leaf",

    description:
      "Explore food-service packaging categories intended for buyers seeking biodegradable and sustainability-focused alternatives.",

    heroText:
      "A B2B packaging catalogue structured around food-service, distribution and institutional sourcing requirements.",

    subcategories: [
      {
        slug: "plates",
        name: "Plates",
      },
      {
        slug: "bowls",
        name: "Bowls",
      },
      {
        slug: "containers",
        name: "Containers",
      },
      {
        slug: "trays",
        name: "Trays",
      },
      {
        slug: "cups",
        name: "Cups",
      },
      {
        slug: "cutlery",
        name: "Cutlery",
      },
    ],
  },

  {
    slug: "leather-purses-bags",
    name: "Leather Purses & Bags",
    shortName: "Leather Goods",
    icon: "briefcase",

    description:
      "Explore handbags, purses, wallets, tote bags and business-bag sourcing categories.",

    heroText:
      "A structured leather-goods catalogue for buyer-specific sourcing and bulk product discussions.",

    subcategories: [
      {
        slug: "handbags",
        name: "Handbags",
      },
      {
        slug: "purses",
        name: "Purses",
      },
      {
        slug: "wallets",
        name: "Wallets",
      },
      {
        slug: "tote-bags",
        name: "Tote Bags",
      },
      {
        slug: "business-bags",
        name: "Business Bags",
      },
    ],
  },

  {
    slug: "garments-jeans",
    name: "Garments & Jeans",
    shortName: "Garments & Denim",
    icon: "shirt",

    description:
      "Explore jeans, denim and garment categories for B2B and buyer-specific sourcing requirements.",

    heroText:
      "Garment and denim sourcing structured for product discovery, specifications and commercial discussion.",

    subcategories: [
      {
        slug: "mens-jeans",
        name: "Men's Jeans",
      },
      {
        slug: "womens-jeans",
        name: "Women's Jeans",
      },
      {
        slug: "denim",
        name: "Denim Collection",
      },
      {
        slug: "mens-garments",
        name: "Men's Garments",
      },
      {
        slug: "womens-garments",
        name: "Women's Garments",
      },
    ],
  },
];

export const catalogueProducts = [
  /* =========================================================
     HANDICRAFTS
  ========================================================= */

  {
    id: 1,
    code: "AEL-HC-001",
    name: "Hand-Painted Fish Pattern Handbag",
    slug: "hand-painted-fish-pattern-handbag",

    categorySlug: "handicrafts",
    subcategorySlug: "hand-painted-bags",

    shortDescription:
      "A colourful hand-painted handbag featuring a distinctive fish-inspired folk-art composition.",

    image: handicraft01,

    keywords: [
      "hand painted",
      "fish",
      "handbag",
      "folk art",
      "indian handicraft",
    ],
  },

  {
    id: 2,
    code: "AEL-HC-002",
    name: "Yellow Fish Motif Clutch",
    slug: "yellow-fish-motif-clutch",

    categorySlug: "handicrafts",
    subcategorySlug: "purses-clutches",

    shortDescription:
      "A vibrant hand-painted clutch featuring traditional fish-inspired artwork and colourful detailing.",

    image: handicraft02,

    keywords: [
      "clutch",
      "yellow",
      "fish",
      "hand painted",
      "purse",
    ],
  },

  {
    id: 3,
    code: "AEL-HC-003",
    name: "Traditional Hand-Painted Tote Bag",
    slug: "traditional-hand-painted-tote-bag",

    categorySlug: "handicrafts",
    subcategorySlug: "tote-bags",

    shortDescription:
      "A large tote-style handicraft bag featuring traditional Indian hand-painted visual elements.",

    image: handicraft03,

    keywords: [
      "tote",
      "traditional",
      "bag",
      "folk art",
      "handicraft",
    ],
  },

  {
    id: 4,
    code: "AEL-HC-004",
    name: "Hand-Painted Purse & Clutch Collection",
    slug: "hand-painted-purse-clutch-collection",

    categorySlug: "handicrafts",
    subcategorySlug: "purses-clutches",

    shortDescription:
      "A coordinated collection of colourful hand-painted purses and clutches with Indian folk-art motifs.",

    image: handicraft04,

    keywords: [
      "purse",
      "clutch",
      "collection",
      "hand painted",
    ],
  },

  {
    id: 5,
    code: "AEL-HC-005",
    name: "Traditional Handbag Collection",
    slug: "traditional-handbag-collection",

    categorySlug: "handicrafts",
    subcategorySlug: "hand-painted-bags",

    shortDescription:
      "A collection of handcrafted bags featuring colourful traditional artwork and decorative detailing.",

    image: handicraft05,

    keywords: [
      "handbag",
      "collection",
      "traditional",
      "painted",
    ],
  },

  {
    id: 6,
    code: "AEL-HC-006",
    name: "Wooden Handle Hand-Painted Bags",
    slug: "wooden-handle-hand-painted-bags",

    categorySlug: "handicrafts",
    subcategorySlug: "hand-painted-bags",

    shortDescription:
      "Decorative handbags featuring wooden handles and expressive hand-painted Indian artwork.",

    image: handicraft06,

    keywords: [
      "wooden handle",
      "bag",
      "hand painted",
      "handbag",
    ],
  },

  {
    id: 7,
    code: "AEL-HC-007",
    name: "Traditional Folk Artwork Collection",
    slug: "traditional-folk-artwork-collection",

    categorySlug: "handicrafts",
    subcategorySlug: "decorative-artwork",

    shortDescription:
      "A colourful collection presenting traditional figurative and folk-art-inspired decorative artwork.",

    image: handicraft07,

    keywords: [
      "folk artwork",
      "decorative",
      "traditional art",
      "indian art",
    ],
  },

  {
    id: 8,
    code: "AEL-HC-008",
    name: "Colourful Handicraft Artwork",
    slug: "colourful-handicraft-artwork",

    categorySlug: "handicrafts",
    subcategorySlug: "decorative-artwork",

    shortDescription:
      "A vibrant handicraft piece showcasing colourful Indian artistic character and traditional visual motifs.",

    image: handicraft08,

    keywords: [
      "artwork",
      "colourful",
      "handicraft",
      "decorative art",
    ],
  },

  /* =========================================================
     BIODEGRADABLE FOOD PACKAGING
  ========================================================= */

  {
    id: 9,
    code: "AEL-BP-001",
    name: "Biodegradable Round Plates",
    slug: "biodegradable-round-plates",

    categorySlug: "biodegradable-food-packaging",
    subcategorySlug: "plates",

    shortDescription:
      "Food-service plate category available for bulk and institutional product sourcing discussions.",

    image: null,

    keywords: [
      "biodegradable",
      "plate",
      "food packaging",
    ],
  },

  {
    id: 10,
    code: "AEL-BP-002",
    name: "Biodegradable Food Bowls",
    slug: "biodegradable-food-bowls",

    categorySlug: "biodegradable-food-packaging",
    subcategorySlug: "bowls",

    shortDescription:
      "Food bowl category intended for food-service, distribution and bulk packaging requirements.",

    image: null,

    keywords: [
      "bowl",
      "food packaging",
      "biodegradable",
    ],
  },

  {
    id: 11,
    code: "AEL-BP-003",
    name: "Takeaway Food Containers",
    slug: "takeaway-food-containers",

    categorySlug: "biodegradable-food-packaging",
    subcategorySlug: "containers",

    shortDescription:
      "Takeaway food-container category for buyer-specific packaging and quantity requirements.",

    image: null,

    keywords: [
      "container",
      "takeaway",
      "food packaging",
    ],
  },

  {
    id: 12,
    code: "AEL-BP-004",
    name: "Food Service Meal Trays",
    slug: "food-service-meal-trays",

    categorySlug: "biodegradable-food-packaging",
    subcategorySlug: "trays",

    shortDescription:
      "Meal-tray category for catering, institutional and food-service sourcing enquiries.",

    image: null,

    keywords: [
      "tray",
      "meal tray",
      "food service",
    ],
  },

  {
    id: 13,
    code: "AEL-BP-005",
    name: "Food Service Cups",
    slug: "food-service-cups",

    categorySlug: "biodegradable-food-packaging",
    subcategorySlug: "cups",

    shortDescription:
      "Cup category for buyer-specific food-service packaging enquiries and commercial discussions.",

    image: null,

    keywords: [
      "cup",
      "food service",
      "packaging",
    ],
  },

  {
    id: 14,
    code: "AEL-BP-006",
    name: "Biodegradable Cutlery Range",
    slug: "biodegradable-cutlery-range",

    categorySlug: "biodegradable-food-packaging",
    subcategorySlug: "cutlery",

    shortDescription:
      "Cutlery product category structured for bulk food-service and distributor sourcing requirements.",

    image: null,

    keywords: [
      "cutlery",
      "biodegradable",
      "food service",
    ],
  },

  /* =========================================================
     LEATHER
  ========================================================= */

  {
    id: 15,
    code: "AEL-LB-001",
    name: "Classic Leather Handbag",
    slug: "classic-leather-handbag",

    categorySlug: "leather-purses-bags",
    subcategorySlug: "handbags",

    shortDescription:
      "A leather handbag sourcing category for buyer-specific styling, quantity and product requirements.",

    image: null,

    keywords: [
      "leather",
      "handbag",
      "bag",
    ],
  },

  {
    id: 16,
    code: "AEL-LB-002",
    name: "Leather Purse Collection",
    slug: "leather-purse-collection",

    categorySlug: "leather-purses-bags",
    subcategorySlug: "purses",

    shortDescription:
      "A purse sourcing category intended for wholesale, distribution and customised buyer discussions.",

    image: null,

    keywords: [
      "leather",
      "purse",
      "collection",
    ],
  },

  {
    id: 17,
    code: "AEL-LB-003",
    name: "Leather Wallet Collection",
    slug: "leather-wallet-collection",

    categorySlug: "leather-purses-bags",
    subcategorySlug: "wallets",

    shortDescription:
      "Wallet product category for commercial sourcing requirements and buyer-specific product discussions.",

    image: null,

    keywords: [
      "leather",
      "wallet",
    ],
  },

  {
    id: 18,
    code: "AEL-LB-004",
    name: "Leather Tote Bag",
    slug: "leather-tote-bag",

    categorySlug: "leather-purses-bags",
    subcategorySlug: "tote-bags",

    shortDescription:
      "Leather tote-bag category available for bulk and buyer-specific sourcing enquiries.",

    image: null,

    keywords: [
      "leather",
      "tote",
      "bag",
    ],
  },

  {
    id: 19,
    code: "AEL-LB-005",
    name: "Leather Business Bag",
    slug: "leather-business-bag",

    categorySlug: "leather-purses-bags",
    subcategorySlug: "business-bags",

    shortDescription:
      "Professional business-bag category intended for commercial and bulk sourcing discussions.",

    image: null,

    keywords: [
      "leather",
      "business bag",
      "office bag",
    ],
  },

  /* =========================================================
     GARMENTS & JEANS
  ========================================================= */

  {
    id: 20,
    code: "AEL-GJ-001",
    name: "Men's Denim Jeans",
    slug: "mens-denim-jeans",

    categorySlug: "garments-jeans",
    subcategorySlug: "mens-jeans",

    shortDescription:
      "Men's denim jeans category for bulk and buyer-specific garment sourcing requirements.",

    image: null,

    keywords: [
      "mens jeans",
      "denim",
      "garments",
    ],
  },

  {
    id: 21,
    code: "AEL-GJ-002",
    name: "Women's Denim Jeans",
    slug: "womens-denim-jeans",

    categorySlug: "garments-jeans",
    subcategorySlug: "womens-jeans",

    shortDescription:
      "Women's denim jeans category structured for wholesale and buyer-specific sourcing enquiries.",

    image: null,

    keywords: [
      "womens jeans",
      "denim",
      "garments",
    ],
  },

  {
    id: 22,
    code: "AEL-GJ-003",
    name: "Denim Collection",
    slug: "denim-collection",

    categorySlug: "garments-jeans",
    subcategorySlug: "denim",

    shortDescription:
      "A broader denim sourcing category for buyers exploring different garment and jeans requirements.",

    image: null,

    keywords: [
      "denim",
      "collection",
      "jeans",
    ],
  },

  {
    id: 23,
    code: "AEL-GJ-004",
    name: "Men's Garment Collection",
    slug: "mens-garment-collection",

    categorySlug: "garments-jeans",
    subcategorySlug: "mens-garments",

    shortDescription:
      "Men's garment category available for buyer-specific product, quantity and sourcing discussions.",

    image: null,

    keywords: [
      "mens garments",
      "clothing",
      "apparel",
    ],
  },

  {
    id: 24,
    code: "AEL-GJ-005",
    name: "Women's Garment Collection",
    slug: "womens-garment-collection",

    categorySlug: "garments-jeans",
    subcategorySlug: "womens-garments",

    shortDescription:
      "Women's garment category intended for wholesale, distribution and other B2B sourcing requirements.",

    image: null,

    keywords: [
      "womens garments",
      "clothing",
      "apparel",
    ],
  },
];


/* =========================================================
   CATALOGUE HELPERS
========================================================= */

export const getCatalogueCategory = (slug) =>
  catalogueCategories.find(
    (category) =>
      category.slug === slug
  );

const normalizeCatalogueProduct = (
  product
) => {
  if (!product) {
    return null;
  }

  const category =
    getCatalogueCategory(
      product.categorySlug
    );

  const subcategory =
    category?.subcategories?.find(
      (item) =>
        item.slug ===
        product.subcategorySlug
    ) || null;

  const gallery =
    Array.isArray(product.gallery) &&
    product.gallery.length > 0
      ? product.gallery
      : product.image
        ? [product.image]
        : [];

  return {
    ...product,

    category,
    subcategory,

    material:
      product.material ||
      null,

    dimensions:
      product.dimensions ||
      null,

    colour:
      product.colour ||
      null,

    minimumOrderQuantity:
      product.minimumOrderQuantity ||
      null,

    packaging:
      product.packaging ||
      null,

    customisation:
      product.customisation ||
      null,

    countryOfOrigin:
      product.countryOfOrigin ||
      "India",

    specifications:
      Array.isArray(
        product.specifications
      )
        ? product.specifications
        : [],

    gallery,

    cataloguePdf:
      product.cataloguePdf || null,

    featured:
      Boolean(product.featured),
  };
};

export const getProductBySlug = (
  categorySlug,
  productSlug
) => {
  const product =
    catalogueProducts.find(
      (item) =>
        item.categorySlug ===
          categorySlug &&
        item.slug ===
          productSlug
    );

  return normalizeCatalogueProduct(
    product
  );
};

export const getRelatedProducts = (
  product,
  limit = 4
) => {
  if (!product) {
    return [];
  }

  return catalogueProducts
    .filter(
      (item) =>
        item.categorySlug ===
          product.categorySlug &&
        item.id !== product.id
    )
    .slice(0, limit)
    .map(normalizeCatalogueProduct);
};

export const getAdjacentProducts = (
  product
) => {
  if (!product) {
    return {
      previous: null,
      next: null,
    };
  }

  const productsInCategory =
    catalogueProducts.filter(
      (item) =>
        item.categorySlug ===
        product.categorySlug
    );

  const currentIndex =
    productsInCategory.findIndex(
      (item) =>
        item.id === product.id
    );

  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  const previous =
    currentIndex > 0
      ? normalizeCatalogueProduct(
          productsInCategory[
            currentIndex - 1
          ]
        )
      : null;

  const next =
    currentIndex <
    productsInCategory.length - 1
      ? normalizeCatalogueProduct(
          productsInCategory[
            currentIndex + 1
          ]
        )
      : null;

  return {
    previous,
    next,
  };
};


/* =========================================================
   PRODUCT LOOKUP HELPERS
========================================================= */

export const getProductByAnySlug = (
  productSlug
) => {
  const product =
    catalogueProducts.find(
      (item) =>
        item.slug === productSlug
    );

  return normalizeCatalogueProduct(
    product
  );
};

export const getProductByCode = (
  productCode
) => {
  const normalizedCode =
    String(productCode || "")
      .trim()
      .toLowerCase();

  if (!normalizedCode) {
    return null;
  }

  const product =
    catalogueProducts.find(
      (item) =>
        item.code.toLowerCase() ===
        normalizedCode
    );

  return normalizeCatalogueProduct(
    product
  );
};
