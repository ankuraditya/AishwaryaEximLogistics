import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Clock3,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import Breadcrumb from "../../components/common/Breadcrumb";
import Container from "../../components/common/Container";

import BlogArticleContent from "../../components/blog/BlogArticleContent";
import RelatedArticles from "../../components/blog/RelatedArticles";

import { estimateReadingTime } from "../../data/blog";
import { useBlogData } from "../../hooks/useBlogData";

import "../../components/blog/blog.css";
import "./blog-pages.css";

const BlogDetails = () => {
  const { posts } = useBlogData();
  const { slug } =
    useParams();

  const post = posts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <section className="ael-blog-not-found">
        <Container>
          <div>
            <BookOpenText
              size={38}
            />

            <span>
              Insights
            </span>

            <h1>
              Article not found.
            </h1>

            <p>
              The requested article
              does not exist in the
              current insights
              library.
            </p>

            <Link to="/blog">
              <ArrowLeft
                size={16}
              />

              Back to Insights
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const related = posts.filter((item) => item.id !== post.id && item.categorySlug === post.categorySlug).concat(posts.filter((item) => item.id !== post.id && item.categorySlug !== post.categorySlug)).slice(0, 3);

  return (
    <>
      <section className="ael-blog-detail-breadcrumb">
        <Container>
          <Breadcrumb
            items={[
              {
                label:
                  "Insights",
                to:
                  "/blog",
              },
              {
                label:
                  post.categoryName,
                to:
                  `/blog?category=${post.categorySlug}`,
              },
              {
                label:
                  post.title,
              },
            ]}
          />
        </Container>
      </section>

      <article className="ael-blog-detail">
        <Container>
          <header className="ael-blog-detail__header">
            <span>
              {
                post.categoryName
              }
            </span>

            <h1>
              {post.title}
            </h1>

            <p>
              {post.excerpt}
            </p>

            <div className="ael-blog-detail__meta">
              <div>
                <Clock3 size={15} />

                {estimateReadingTime(
                  post
                )}{" "}
                min read
              </div>

              <div>
                <BookOpenText
                  size={15}
                />

                Editorial Insight
              </div>
            </div>
          </header>

          <div className="ael-blog-detail__visual">
            <BookOpenText
              size={78}
            />

            <span>
              {
                post.categoryName
              }
            </span>
          </div>

          <div className="ael-blog-detail__body">
            <BlogArticleContent
              content={
                post.content
              }
            />

            <aside className="ael-blog-detail__aside">
              <span>
                Business Enquiry
              </span>

              <h2>
                Have a related product
                requirement?
              </h2>

              <p>
                Share the product,
                quantity, destination
                and relevant sourcing
                information.
              </p>

              <Link to="/request-a-quote">
                Send Requirement

                <ArrowRight
                  size={16}
                />
              </Link>
            </aside>
          </div>
        </Container>
      </article>

      <RelatedArticles
        posts={related}
      />
    </>
  );
};

export default BlogDetails;
