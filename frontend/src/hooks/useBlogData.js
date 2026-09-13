import { useEffect, useState } from "react";

import { getBlogs } from "../api/contentApi";
import { blogCategories, blogPosts } from "../data/blog";

const parseContent = (content) => {
  if (Array.isArray(content)) return content;
  try { const parsed = JSON.parse(content); return Array.isArray(parsed) ? parsed : []; } catch { return [{ type: "paragraph", text: content || "" }]; }
};

export const useBlogData = () => {
  const [state, setState] = useState({ categories: blogCategories, posts: blogPosts, loading: true, error: null });
  useEffect(() => {
    let active = true;
    getBlogs().then((response) => {
      if (!active) return;
      const records = response?.data?.data || response?.data;
      if (!Array.isArray(records) || !records.length) throw new Error("The CMS insights library is empty.");
      const posts = records.map((record, index) => ({
        ...(blogPosts.find((item) => item.slug === record.slug) || {}),
        id: record.id,
        title: record.title,
        slug: record.slug,
        categorySlug: record.category?.slug || "company-updates",
        categoryName: record.category?.name || "Company Updates",
        excerpt: record.excerpt,
        content: parseContent(record.content),
        featured: index === 0,
      }));
      const categories = [{ slug: "all", name: "All Insights" }, ...Array.from(new Map(posts.map((post) => [post.categorySlug, { slug: post.categorySlug, name: post.categoryName }])).values())];
      setState({ categories, posts, loading: false, error: null });
    }).catch((error) => active && setState((current) => ({ ...current, loading: false, error: error.message })));
    return () => { active = false; };
  }, []);
  return state;
};
