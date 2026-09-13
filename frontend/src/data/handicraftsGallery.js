import handicraft01 from "../assets/images/handicrafts/handicraft-01.webp";
import handicraft02 from "../assets/images/handicrafts/handicraft-02.webp";
import handicraft03 from "../assets/images/handicrafts/handicraft-03.webp";
import handicraft04 from "../assets/images/handicrafts/handicraft-04.webp";
import handicraft05 from "../assets/images/handicrafts/handicraft-05.webp";
import handicraft06 from "../assets/images/handicrafts/handicraft-06.webp";
import handicraft07 from "../assets/images/handicrafts/handicraft-07.webp";
import handicraft08 from "../assets/images/handicrafts/handicraft-08.webp";
import handicraft09 from "../assets/images/handicrafts/handicraft-09.webp";
import handicraft10 from "../assets/images/handicrafts/handicraft-10.webp";
import handicraft11 from "../assets/images/handicrafts/handicraft-11.webp";
import handicraft12 from "../assets/images/handicrafts/handicraft-12.webp";

export const handicraftGalleryCategories = [
  {
    slug: "all",
    name: "All Handicrafts",
  },

  {
    slug: "bags-totes",
    name: "Bags & Totes",
  },

  {
    slug: "clutches-wallets",
    name: "Clutches & Wallets",
  },

  {
    slug: "folders-accessories",
    name: "Folders & Accessories",
  },

  {
    slug: "traditional-artwork",
    name: "Traditional Artwork",
  },
];

export const handicraftGalleryItems = [
  {
    id: 1,
    slug: "fish-pattern-hand-painted-handbag",

    title:
      "Fish Pattern Hand-Painted Handbag",

    category:
      "bags-totes",

    categoryName:
      "Bags & Totes",

    image:
      handicraft01,

    description:
      "A colourful hand-painted handbag featuring a distinctive fish-inspired Indian folk-art composition.",

    productPath:
      "/products/handicrafts/hand-painted-fish-pattern-handbag",

    productLabel:
      "View Product",
  },

  {
    id: 2,
    slug: "yellow-fish-motif-clutch",

    title:
      "Yellow Fish Motif Clutch",

    category:
      "clutches-wallets",

    categoryName:
      "Clutches & Wallets",

    image:
      handicraft02,

    description:
      "A vibrant clutch with colourful fish-inspired artwork and traditional decorative detailing.",

    productPath:
      "/products/handicrafts/yellow-fish-motif-clutch",

    productLabel:
      "View Product",
  },

  {
    id: 3,
    slug: "traditional-hand-painted-tote",

    title:
      "Traditional Hand-Painted Tote",

    category:
      "bags-totes",

    categoryName:
      "Bags & Totes",

    image:
      handicraft03,

    description:
      "A large tote-style handicraft piece featuring symmetrical traditional Indian visual motifs.",

    productPath:
      "/products/handicrafts/traditional-hand-painted-tote-bag",

    productLabel:
      "View Product",
  },

  {
    id: 4,
    slug: "purse-clutch-collection",

    title:
      "Hand-Painted Purse & Clutch Collection",

    category:
      "clutches-wallets",

    categoryName:
      "Clutches & Wallets",

    image:
      handicraft04,

    description:
      "A coordinated collection of colourful purses and clutches displaying varied folk-art patterns.",

    productPath:
      "/products/handicrafts/hand-painted-purse-clutch-collection",

    productLabel:
      "View Product",
  },

  {
    id: 5,
    slug: "traditional-handbag-collection",

    title:
      "Traditional Handbag Collection",

    category:
      "bags-totes",

    categoryName:
      "Bags & Totes",

    image:
      handicraft05,

    description:
      "A collection of handcrafted bags displaying colourful traditional artwork and decorative motifs.",

    productPath:
      "/products/handicrafts/traditional-handbag-collection",

    productLabel:
      "View Product",
  },

  {
    id: 6,
    slug: "wooden-handle-handbag-collection",

    title:
      "Wooden Handle Handbag Collection",

    category:
      "bags-totes",

    categoryName:
      "Bags & Totes",

    image:
      handicraft06,

    description:
      "Decorative hand-painted handbags combining expressive folk artwork with wooden handles.",

    productPath:
      "/products/handicrafts/wooden-handle-hand-painted-bags",

    productLabel:
      "View Product",
  },

  {
    id: 7,
    slug: "traditional-folk-art-collection",

    title:
      "Traditional Folk-Art Collection",

    category:
      "traditional-artwork",

    categoryName:
      "Traditional Artwork",

    image:
      handicraft07,

    description:
      "A colourful collection featuring figurative and traditional Indian folk-art compositions.",

    productPath:
      "/products/handicrafts/traditional-folk-artwork-collection",

    productLabel:
      "View Product",
  },

  {
    id: 8,
    slug: "colourful-handicraft-artwork",

    title:
      "Colourful Handicraft Artwork",

    category:
      "traditional-artwork",

    categoryName:
      "Traditional Artwork",

    image:
      handicraft08,

    description:
      "A vibrant handicraft composition reflecting traditional artistic character and detailed visual storytelling.",

    productPath:
      "/products/handicrafts/colourful-handicraft-artwork",

    productLabel:
      "View Product",
  },

  {
    id: 9,
    slug: "hand-painted-folders-accessories",

    title:
      "Hand-Painted Folders & Accessories",

    category:
      "folders-accessories",

    categoryName:
      "Folders & Accessories",

    image:
      handicraft09,

    description:
      "Decorative hand-painted folders featuring colourful floral, butterfly and traditional design elements.",

    productPath: null,

    productLabel: null,
  },

  {
    id: 10,
    slug: "figurative-traditional-artwork",

    title:
      "Figurative Traditional Artwork",

    category:
      "traditional-artwork",

    categoryName:
      "Traditional Artwork",

    image:
      handicraft10,

    description:
      "A detailed figurative folk-art composition reflecting traditional Indian artistic storytelling.",

    productPath: null,

    productLabel: null,
  },

  {
    id: 11,
    slug: "traditional-fish-artwork",

    title:
      "Traditional Fish Folk Artwork",

    category:
      "traditional-artwork",

    categoryName:
      "Traditional Artwork",

    image:
      handicraft11,

    description:
      "A decorative fish-inspired composition highlighting the bold patterns and colours of traditional folk artwork.",

    productPath: null,

    productLabel: null,
  },

  {
    id: 12,
    slug: "four-fish-folk-artwork",

    title:
      "Four Fish Folk-Art Composition",

    category:
      "traditional-artwork",

    categoryName:
      "Traditional Artwork",

    image:
      handicraft12,

    description:
      "A vertically composed fish-themed folk artwork featuring highly detailed traditional patterns.",

    productPath: null,

    productLabel: null,
  },
];

export const getHandicraftGalleryItem = (
  slug
) =>
  handicraftGalleryItems.find(
    (item) => item.slug === slug
  );
