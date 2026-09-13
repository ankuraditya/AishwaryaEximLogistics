import {
  getCatalogueCategory,
} from "../data/catalogue";

export const normalizeCatalogueText = (
  value = ""
) =>
  String(value)
    .trim()
    .toLowerCase();

export const getProductCategoryName = (
  categorySlug
) => {
  const category =
    getCatalogueCategory(categorySlug);

  return category?.name || "";
};

export const getProductSubcategoryName = (
  categorySlug,
  subcategorySlug
) => {
  const category =
    getCatalogueCategory(categorySlug);

  return (
    category?.subcategories.find(
      (subcategory) =>
        subcategory.slug === subcategorySlug
    )?.name || ""
  );
};

export const filterCatalogueProducts = ({
  products,
  categorySlug,
  search,
  type,
}) => {
  const normalizedSearch =
    normalizeCatalogueText(search);

  return products.filter((product) => {
    if (
      categorySlug &&
      product.categorySlug !== categorySlug
    ) {
      return false;
    }

    if (
      type &&
      product.subcategorySlug !== type
    ) {
      return false;
    }

    if (!normalizedSearch) {
      return true;
    }

    const categoryName =
      getProductCategoryName(
        product.categorySlug
      );

    const subcategoryName =
      getProductSubcategoryName(
        product.categorySlug,
        product.subcategorySlug
      );

    const searchableText = [
      product.name,
      product.code,
      product.shortDescription,
      categoryName,
      subcategoryName,
      ...(product.keywords || []),
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(
      normalizedSearch
    );
  });
};

export const sortCatalogueProducts = (
  products,
  sort
) => {
  const sorted = [...products];

  switch (sort) {
    case "name-asc":
      return sorted.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

    case "name-desc":
      return sorted.sort((a, b) =>
        b.name.localeCompare(a.name)
      );

    case "code-asc":
      return sorted.sort((a, b) =>
        a.code.localeCompare(b.code)
      );

    case "code-desc":
      return sorted.sort((a, b) =>
        b.code.localeCompare(a.code)
      );

    default:
      return sorted.sort(
        (a, b) => a.id - b.id
      );
  }
};

export const paginateCatalogueProducts = ({
  products,
  page,
  perPage,
}) => {
  const totalItems = products.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / perPage)
  );

  const safePage = Math.min(
    Math.max(page, 1),
    totalPages
  );

  const start =
    (safePage - 1) * perPage;

  const items = products.slice(
    start,
    start + perPage
  );

  return {
    items,
    page: safePage,
    perPage,
    totalItems,
    totalPages,
  };
};