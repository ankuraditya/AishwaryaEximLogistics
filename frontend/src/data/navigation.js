export const mainNavigation = [
  {
    label: "Home",
    path: "/",
  },

  {
    label: "About Us",
    path: "/about-us",
  },

  {
    label: "Products",
    path: "/products",
    megaMenu: true,

    categories: [
      {
        title: "Handicrafts",
        slug: "handicrafts",
        path: "/products/handicrafts",

        items: [
          {
            label: "Hand-Painted Bags",
            path: "/products/handicrafts?type=hand-painted-bags",
          },
          {
            label: "Tote Bags",
            path: "/products/handicrafts?type=tote-bags",
          },
          {
            label: "Purses & Clutches",
            path: "/products/handicrafts?type=purses-clutches",
          },
          {
            label: "Folders & Accessories",
            path: "/products/handicrafts?type=folders-accessories",
          },
          {
            label: "Decorative Artwork",
            path: "/products/handicrafts?type=decorative-artwork",
          },
        ],
      },

      {
        title: "Biodegradable Food Packaging",
        slug: "biodegradable-food-packaging",
        path: "/products/biodegradable-food-packaging",

        items: [
          {
            label: "Plates",
            path: "/products/biodegradable-food-packaging?type=plates",
          },
          {
            label: "Bowls",
            path: "/products/biodegradable-food-packaging?type=bowls",
          },
          {
            label: "Containers",
            path: "/products/biodegradable-food-packaging?type=containers",
          },
          {
            label: "Trays",
            path: "/products/biodegradable-food-packaging?type=trays",
          },
          {
            label: "Cups",
            path: "/products/biodegradable-food-packaging?type=cups",
          },
          {
            label: "Cutlery",
            path: "/products/biodegradable-food-packaging?type=cutlery",
          },
        ],
      },

      {
        title: "Leather Purses & Bags",
        slug: "leather-purses-bags",
        path: "/products/leather-purses-bags",

        items: [
          {
            label: "Handbags",
            path: "/products/leather-purses-bags?type=handbags",
          },
          {
            label: "Purses",
            path: "/products/leather-purses-bags?type=purses",
          },
          {
            label: "Wallets",
            path: "/products/leather-purses-bags?type=wallets",
          },
          {
            label: "Tote Bags",
            path: "/products/leather-purses-bags?type=tote-bags",
          },
          {
            label: "Business Bags",
            path: "/products/leather-purses-bags?type=business-bags",
          },
        ],
      },

      {
        title: "Garments & Jeans",
        slug: "garments-jeans",
        path: "/products/garments-jeans",

        items: [
          {
            label: "Men's Jeans",
            path: "/products/garments-jeans?type=mens-jeans",
          },
          {
            label: "Women's Jeans",
            path: "/products/garments-jeans?type=womens-jeans",
          },
          {
            label: "Denim Collection",
            path: "/products/garments-jeans?type=denim",
          },
          {
            label: "Men's Garments",
            path: "/products/garments-jeans?type=mens-garments",
          },
          {
            label: "Women's Garments",
            path: "/products/garments-jeans?type=womens-garments",
          },
        ],
      },
    ],
  },

  {
    label: "Handicrafts Gallery",
    path: "/handicrafts-gallery",
  },

  {
    label: "Export & Logistics",
    path: "/export-logistics",
  },

  {
    label: "Blog",
    path: "/blog",
  },

  {
    label: "Contact",
    path: "/contact-us",
  },
];