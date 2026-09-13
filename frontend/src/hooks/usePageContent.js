import { useEffect, useState } from "react";
import { getPage } from "../api/contentApi";

const requests = new Map();

export const usePageContent = (slug) => {
  const [state, setState] = useState({ page: null, loading: true, error: null });
  useEffect(() => {
    let active = true;
    // Cache only an in-flight request. Keeping a resolved Promise forever made
    // CMS changes look stale during client-side navigation.
    if (!requests.has(slug)) {
      const request = getPage(slug).finally(() => requests.delete(slug));
      requests.set(slug, request);
    }
    requests.get(slug).then((response) => active && setState({ page: response?.data || null, loading: false, error: null })).catch((error) => active && setState({ page: null, loading: false, error: error.message }));
    return () => { active = false; };
  }, [slug]);
  return state;
};
