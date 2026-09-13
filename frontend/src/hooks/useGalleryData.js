import { useEffect, useState } from "react";

import { getGallery } from "../api/contentApi";
import { handicraftGalleryCategories, handicraftGalleryItems } from "../data/handicraftsGallery";

const apiOrigin = (() => {
  try { return new URL(import.meta.env.VITE_API_BASE_URL).origin; } catch { return "http://127.0.0.1:8000"; }
})();

const mediaUrl = (media) => media?.url || (media?.path ? `${apiOrigin}/storage/${media.disk === "media" ? "media/" : ""}${media.path}` : null);
const slugify = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const useGalleryData = () => {
  const [state, setState] = useState({ categories: handicraftGalleryCategories, items: handicraftGalleryItems, loading: true, error: null });
  useEffect(() => {
    let active = true;
    getGallery().then((response) => {
      if (!active) return;
      const records = response?.data?.data || response?.data;
      if (!Array.isArray(records) || !records.length) throw new Error("The CMS gallery is empty.");
      const mapped = records.map((record, index) => {
        const fallback = handicraftGalleryItems[index] || {};
        return {
          ...fallback,
          id: record.id,
          slug: fallback.slug || slugify(record.title),
          title: record.title,
          category: record.category?.slug || fallback.category,
          categoryName: record.category?.name || fallback.categoryName,
          image: mediaUrl(record.media) || fallback.image,
          description: record.caption || fallback.description,
          productPath: record.product ? `/products/${record.product.category?.slug || "handicrafts"}/${record.product.slug}` : fallback.productPath,
        };
      });
      const categories = [{ slug: "all", name: "All Handicrafts" }, ...Array.from(new Map(mapped.filter((item) => item.category).map((item) => [item.category, { slug: item.category, name: item.categoryName }])).values())];
      setState({ categories, items: mapped, loading: false, error: null });
    }).catch((error) => active && setState((current) => ({ ...current, loading: false, error: error.message })));
    return () => { active = false; };
  }, []);
  return state;
};
