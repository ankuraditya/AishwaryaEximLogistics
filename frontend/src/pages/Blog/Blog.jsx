import {
  BookOpen,
  RotateCcw,
} from "lucide-react";

import {
  useEffect,
  useMemo,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import Container from "../../components/common/Container";

import BlogHero from "../../components/blog/BlogHero";
import BlogFilters from "../../components/blog/BlogFilters";
import BlogCard from "../../components/blog/BlogCard";

import { useBlogData } from "../../hooks/useBlogData";

import "../../components/blog/blog.css";
import "./blog-pages.css";

const Blog = () => {
  const { categories: blogCategories, posts: blogPosts } = useBlogData();
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const requestedCategory =
    searchParams.get(
      "category"
    ) || "all";

  const search =
    searchParams.get(
      "search"
    ) || "";

  const validCategory =
    requestedCategory ===
      "all" ||
    blogCategories.some((category) => category.slug === requestedCategory);

  const activeCategory =
    validCategory
      ? requestedCategory
      : "all";

  useEffect(() => {
    if (validCategory) {
      return;
    }

    const next =
      new URLSearchParams(
        searchParams
      );

    next.delete("category");

    setSearchParams(
      next,
      {
        replace: true,
      }
    );
  }, [
    validCategory,
    searchParams,
    setSearchParams,
  ]);

  const counts =
    useMemo(() => {
      const result = {
        all:
          blogPosts.length,
      };

      blogCategories
        .filter(
          (category) =>
            category.slug !==
            "all"
        )
        .forEach(
          (category) => {
            result[
              category.slug
            ] =
              blogPosts.filter(
                (post) =>
                  post.categorySlug ===
                  category.slug
              ).length;
          }
        );

      return result;
    }, [blogCategories, blogPosts]);

  const visiblePosts =
    useMemo(() => {
      const normalisedSearch =
        search
          .trim()
          .toLowerCase();

      return blogPosts.filter(
        (post) => {
          if (
            activeCategory !==
              "all" &&
            post.categorySlug !==
              activeCategory
          ) {
            return false;
          }

          if (
            !normalisedSearch
          ) {
            return true;
          }

          const text = [
            post.title,
            post.excerpt,
            post.categoryName,
          ]
            .join(" ")
            .toLowerCase();

          return text.includes(
            normalisedSearch
          );
        }
      );
    }, [
      activeCategory,
      blogPosts,
      search,
    ]);

  const changeCategory = (
    category
  ) => {
    const next =
      new URLSearchParams(
        searchParams
      );

    if (
      category === "all"
    ) {
      next.delete(
        "category"
      );
    } else {
      next.set(
        "category",
        category
      );
    }

    setSearchParams(next);
  };

  const changeSearch = (
    value
  ) => {
    const next =
      new URLSearchParams(
        searchParams
      );

    if (value.trim()) {
      next.set(
        "search",
        value
      );
    } else {
      next.delete(
        "search"
      );
    }

    setSearchParams(
      next,
      {
        replace: true,
      }
    );
  };

  const reset = () =>
    setSearchParams({});

  return (
    <>
      <BlogHero
        featuredPost={
          blogPosts.find((post) => post.featured) || blogPosts[0] || null
        }
      />

      <section className="ael-section ael-blog-page">
        <Container>
          <div className="ael-blog-page__heading">
            <div>
              <span>
                Knowledge Centre
              </span>

              <h2>
                Latest Insights
              </h2>
            </div>

            <p>
              Educational content
              designed to support
              product and sourcing
              discussions.
            </p>
          </div>

          <BlogFilters
            categories={
              blogCategories
            }
            activeCategory={
              activeCategory
            }
            search={search}
            counts={counts}
            onCategoryChange={
              changeCategory
            }
            onSearchChange={
              changeSearch
            }
          />

          {visiblePosts.length ? (
            <div className="ael-blog-page__grid">
              {visiblePosts.map(
                (post) => (
                  <BlogCard
                    key={
                      post.id
                    }
                    post={post}
                  />
                )
              )}
            </div>
          ) : (
            <div className="ael-blog-page__empty">
              <BookOpen
                size={35}
              />

              <h2>
                No matching articles
                found.
              </h2>

              <p>
                Try another category
                or search term.
              </p>

              <button
                type="button"
                onClick={reset}
              >
                <RotateCcw
                  size={15}
                />

                Reset Articles
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default Blog;
