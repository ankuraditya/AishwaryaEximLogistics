import {
  ArrowUpRight,
  BookOpen,
  Globe2,
  Leaf,
  PackageSearch,
  Palette,
} from "lucide-react";

import { Link } from "react-router-dom";

import {
  estimateReadingTime,
} from "../../data/blog";

const iconMap = {
  handicrafts: Palette,
  sustainability: Leaf,
  "export-sourcing":
    Globe2,
  "buyer-guides":
    PackageSearch,
};

const BlogCard = ({
  post,
}) => {
  const Icon =
    iconMap[
      post.categorySlug
    ] || BookOpen;

  return (
    <article className="ael-blog-card">
      <Link
        to={`/blog/${post.slug}`}
        className="ael-blog-card__visual"
        aria-label={`Read ${post.title}`}
      >
        <span>
          <Icon size={38} />
        </span>

        <small>
          {post.categoryName}
        </small>
      </Link>

      <div className="ael-blog-card__content">
        <div className="ael-blog-card__meta">
          <span>
            {post.categoryName}
          </span>

          <small>
            {estimateReadingTime(
              post
            )}{" "}
            min read
          </small>
        </div>

        <Link
          to={`/blog/${post.slug}`}
        >
          <h2>
            {post.title}
          </h2>
        </Link>

        <p>
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="ael-blog-card__link"
        >
          Read Article

          <ArrowUpRight
            size={15}
          />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;