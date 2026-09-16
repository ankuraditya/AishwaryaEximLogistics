import { useEffect, useState } from "react";

import { getCategories } from "../api/categoriesApi";
import { getProducts } from "../api/productsApi";
import { catalogueCategories, catalogueProducts } from "../data/catalogue";

const apiOrigin = (() => {
  try {
    return new URL(import.meta.env.VITE_API_BASE_URL).origin;
  } catch {
    return "http://127.0.0.1:8000";
  }
})();

const mediaUrl = (media) => {
  if (!media) return null;
  if (media.url) return media.url;
  if (/^https?:\/\//.test(media.path || "")) return media.path;
  return media.path ? `${apiOrigin}/storage/${media.disk === "media" ? "media/" : ""}${media.path}` : null;
};

const mapCategory = (record) => {
  const fallback = catalogueCategories.find((item) => item.slug === record.slug) || {};
  return {
    ...fallback,
    id: record.id,
    slug: record.slug,
    name: record.name,
    shortName: fallback.shortName || record.name,
    description: record.description || fallback.description,
    subcategories: (record.subcategories || []).map((subcategory) => ({
      id: subcategory.id,
      slug: subcategory.slug.replace(`${record.slug}-`, ""),
      name: subcategory.name,
    })),
  };
};

const mapProduct = (record) => {
  const fallback = catalogueProducts.find((item) => item.slug === record.slug) || {};
  const primary = (record.media || []).find((item) => item.pivot?.is_primary) || record.media?.[0];
  const gallery = (record.media || []).map(mediaUrl).filter(Boolean);
  return {
    ...fallback,
    id: record.id,
    code: record.sku || fallback.code,
    name: record.name,
    slug: record.slug,
    categorySlug: record.category?.slug || fallback.categorySlug,
    subcategorySlug: record.subcategory?.slug?.replace(`${record.category?.slug}-`, "") || fallback.subcategorySlug,
    shortDescription: record.short_description || fallback.shortDescription,
    longDescription: record.description || record.short_description || fallback.longDescription,
    image: mediaUrl(primary) || fallback.image || null,
    gallery: gallery.length ? gallery : fallback.gallery,
    material: record.material || fallback.material,
    dimensions: record.dimensions || fallback.dimensions,
    colour: record.colour || fallback.colour,
    minimumOrderQuantity: record.moq || fallback.minimumOrderQuantity,
    packaging: record.packaging || fallback.packaging,
    customisation: record.customisation || fallback.customisation,
    countryOfOrigin: record.country_of_origin || fallback.countryOfOrigin || "India",
    specifications: record.specifications?.length
      ? record.specifications.map((item) => ({ label: item.label, value: item.value }))
      : fallback.specifications || [],
    cataloguePdf: mediaUrl(record.catalogue_media) || fallback.cataloguePdf || null,
    featured: Boolean(record.is_featured),
  };
};

export const useCatalogueData = () => {
  const [state, setState] = useState({
    categories: catalogueCategories,
    products: catalogueProducts.map((product) => ({
      ...product,
      longDescription: product.longDescription || product.shortDescription || "",
      specifications: product.specifications || [],
      gallery: product.gallery?.length ? product.gallery : product.image ? [product.image] : [],
      countryOfOrigin: product.countryOfOrigin || "India",
    })),
    loading: true,
    error: null,
    source: "fallback",
  });

  useEffect(() => {
    let active = true;
    const getAllProducts = async () => {
      const firstResponse = await getProducts({ per_page: 60 });
      const firstPage = firstResponse?.data;
      const records = Array.isArray(firstPage?.data) ? [...firstPage.data] : Array.isArray(firstPage) ? [...firstPage] : [];
      const lastPage = Number(firstPage?.last_page || 1);

      for (let page = 2; page <= lastPage; page += 1) {
        const response = await getProducts({ per_page: 60, page });
        const pageRecords = response?.data?.data || response?.data;
        if (Array.isArray(pageRecords)) records.push(...pageRecords);
      }

      return records;
    };

    Promise.all([getCategories(), getAllProducts()])
      .then(([categoryResponse, products]) => {
        if (!active) return;
        const categories = categoryResponse?.data;
        if (!Array.isArray(categories) || !categories.length || !Array.isArray(products) || !products.length) {
          throw new Error("The CMS catalogue is currently empty.");
        }
        setState({ categories: categories.map(mapCategory), products: products.map(mapProduct), loading: false, error: null, source: "api" });
      })
      .catch((error) => {
        if (active) setState((current) => ({ ...current, loading: false, error: error.message, source: "fallback" }));
      });
    return () => { active = false; };
  }, []);

  return state;
};
