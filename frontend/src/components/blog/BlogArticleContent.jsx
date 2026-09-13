const BlogArticleContent = ({
  content = [],
}) => {
  return (
    <div className="ael-blog-article-content">
      {content.map(
        (block, index) => {
          const key =
            `${block.type}-${index}`;

          if (
            block.type ===
            "heading"
          ) {
            return (
              <h2 key={key}>
                {block.text}
              </h2>
            );
          }

          if (
            block.type ===
            "list"
          ) {
            return (
              <ul key={key}>
                {block.items.map(
                  (item) => (
                    <li key={item}>
                      {item}
                    </li>
                  )
                )}
              </ul>
            );
          }

          return (
            <p key={key}>
              {block.text}
            </p>
          );
        }
      )}
    </div>
  );
};

export default BlogArticleContent;