import {
  ArrowRight,
  BookOpenText,
  Globe2,
} from "lucide-react";

import { Link } from "react-router-dom";

import Container from "../common/Container";

import {
  estimateReadingTime,
} from "../../data/blog";

const BlogHero = ({
  featuredPost,
}) => {
  return (
    <section className="ael-blog-hero">
      <Container>
        <div className="ael-blog-hero__heading">
          <div className="ael-blog-hero__eyebrow">
            <BookOpenText
              size={16}
            />

            Insights & Updates
          </div>

          <h1>
            Product, Sourcing &
            <span>
              {" "}
              Trade Insights.
            </span>
          </h1>

          <p>
            Explore practical
            information around Indian
            products, sourcing,
            handicrafts, sustainable
            packaging and export-oriented
            buyer requirements.
          </p>
        </div>

        {featuredPost && (
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="ael-blog-featured"
          >
            <div className="ael-blog-featured__visual">
              <Globe2 size={78} />

              <span className="ael-blog-featured__orbit ael-blog-featured__orbit--one" />
              <span className="ael-blog-featured__orbit ael-blog-featured__orbit--two" />
            </div>

            <div className="ael-blog-featured__content">
              <span>
                Featured Insight
              </span>

              <small>
                {
                  featuredPost.categoryName
                }

                {" • "}

                {estimateReadingTime(
                  featuredPost
                )}{" "}
                min read
              </small>

              <h2>
                {
                  featuredPost.title
                }
              </h2>

              <p>
                {
                  featuredPost.excerpt
                }
              </p>

              <strong>
                Read Featured Article

                <ArrowRight
                  size={16}
                />
              </strong>
            </div>
          </Link>
        )}
      </Container>
    </section>
  );
};

export default BlogHero;