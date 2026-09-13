const apiOrigin = (() => {
  try {
    return new URL(import.meta.env.VITE_API_BASE_URL).origin;
  } catch {
    return "http://127.0.0.1:8000";
  }
})();

export const mediaUrl = (media) => {
  if (!media) return null;
  if (typeof media === "string") {
    if (/^https?:\/\//.test(media)) return media;
    return media.startsWith("/storage/") ? `${apiOrigin}${media}` : media;
  }
  if (media.url) {
    if (/^https?:\/\//.test(media.url)) return media.url;
    return media.url.startsWith("/storage/") ? `${apiOrigin}${media.url}` : media.url;
  }
  if (/^https?:\/\//.test(media.path || "")) return media.path;
  return media.path
    ? `${apiOrigin}/storage/${media.disk === "media" ? "media/" : ""}${media.path}`
    : null;
};
