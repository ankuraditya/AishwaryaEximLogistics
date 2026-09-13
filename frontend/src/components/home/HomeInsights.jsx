import {
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import Button from "../common/Button";
import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

import { insightItems as fallbackInsights } from "../../data/home";
import { useBlogData } from "../../hooks/useBlogData";
import { useCmsSection } from "../../hooks/useCmsSection";
import handicraftsInsight from "../../assets/images/categories/handicrafts-category.webp";
import sustainabilityInsight from "../../assets/images/categories/packaging-category.webp";
import sourcingInsight from "../../assets/images/why-aishwary/sourcing.webp";

const insightImages = [handicraftsInsight, sustainabilityInsight, sourcingInsight];

const HomeInsights = () => {
  const { posts } = useBlogData();
  const { content } = useCmsSection("home", "insights", {
    eyebrow: "Insights & Updates", heading: "Knowledge Around Products, Sourcing & Trade.",
    body: "The website will provide useful product, sustainability and sourcing information alongside company updates.",
  });
  const insightItems = posts.length ? posts.slice(0, 3).map((post) => ({ category: post.categoryName, title: post.title, description: post.excerpt, path: `/blog/${post.slug}` })) : fallbackInsights;
  return (
    <section className="ael-section ael-home-insights">
      <Container>
        <div className="ael-home-insights__header">
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.heading}
            description={content.body}
          />

          <Button
            to="/blog"
            variant="outline-primary"
          >
            View All Insights

            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="ael-home-insights__grid">
          {insightItems.map(
            (item, index) => (
              <Link
                to={item.path || "/blog"}
                className="ael-home-insight-card"
                key={item.title}
              >
                <div className="ael-home-insight-card__image">
                  <img
                    src={insightImages[index]}
                    alt=""
                    loading="lazy"
                  />
                  <span>Explore Insight</span>
                </div>

                <div className="ael-home-insight-card__body">
                <div className="ael-home-insight-card__top">
                  <span>
                    {item.category}
                  </span>

                  <span>
                    0{index + 1}
                  </span>
                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.description}
                </p>

                <div className="ael-home-insight-card__link">
                  Read Insight

                  <ArrowUpRight size={15} />
                </div>
                </div>
              </Link>
            )
          )}
        </div>
      </Container>
    </section>
  );
};

export default HomeInsights;
