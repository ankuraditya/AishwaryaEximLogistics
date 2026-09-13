import { useMemo } from "react";
import { usePageContent } from "./usePageContent";

const mergeSection = (section, fallback = {}) => {
  if (!section) return fallback;

  const content = section.content;
  const values = content && !Array.isArray(content) && typeof content === "object"
    ? content
    : {};

  return {
    ...fallback,
    ...values,
    heading: section.heading || values.heading || fallback.heading,
    eyebrow: section.eyebrow || values.eyebrow || fallback.eyebrow,
    body: section.body || values.body || fallback.body,
    items: Array.isArray(content) ? content : (values.items || fallback.items || []),
    media: section.media || fallback.media || null,
  };
};

export const useCmsSection = (pageSlug, sectionKey, fallback = {}) => {
  const pageState = usePageContent(pageSlug);
  const section = pageState.page?.sections?.find(
    (candidate) => candidate.section_key === sectionKey,
  );

  return {
    ...pageState,
    content: useMemo(
      () => mergeSection(section, fallback),
      [section, fallback],
    ),
  };
};

export const sectionContent = mergeSection;
