import Container from "../common/Container";
import BlogCard from "./BlogCard";

const RelatedArticles = ({
  posts = [],
}) => {
  if (!posts.length) {
    return null;
  }

  return (
    <section className="ael-section ael-related-articles">
      <Container>
        <div className="ael-related-articles__heading">
          <span>
            Continue Reading
          </span>

          <h2>
            Related Insights
          </h2>
        </div>

        <div className="ael-related-articles__grid">
          {posts.map(
            (post) => (
              <BlogCard
                key={post.id}
                post={post}
              />
            )
          )}
        </div>
      </Container>
    </section>
  );
};

export default RelatedArticles;