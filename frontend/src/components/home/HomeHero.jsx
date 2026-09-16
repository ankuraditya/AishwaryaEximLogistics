import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe2,
  PackageCheck,
  SearchCheck,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import Button from "../common/Button";
import Container from "../common/Container";
import { useCmsSection } from "../../hooks/useCmsSection";
import { mediaUrl } from "../../utils/media";

import handicraft01 from "../../assets/images/banners/hero-handicrafts.png";
import handicraft03 from "../../assets/images/banners/hero-mithila.png";
import handicraft06 from "../../assets/images/banners/hero-global-products.png";

const heroSlides = [
  {
    image: handicraft01,
    alt: "Hand-painted Indian handicraft handbag",
    label: "Handcrafted in India",
  },
  {
    image: handicraft03,
    alt: "Traditional Indian handicraft tote bag",
    label: "Distinctive folk-art products",
    eyebrow: "Indian Handicrafts • Timeless Artistry",
    heading: "Traditional Indian Artistry, Made for Modern Buyers.",
    body: "Discover hand-painted bags, accessories and Mithila-inspired folk-art products that bring distinctive Indian craftsmanship to your collection.",
    primary_button: "Explore Handicrafts",
    primary_link: "/products/handicrafts",
    secondary_button: "View Our Gallery",
    secondary_link: "/handicrafts-gallery",
  },
  {
    image: handicraft06,
    alt: "Collection of hand-painted Indian handbags",
    label: "Created for global buyers",
    eyebrow: "From Bihar, India • To the World",
    heading: "Your Indian Sourcing Partner for Global Business.",
    body: "Share your product, quantity and destination requirements. Our team helps organise buyer-focused sourcing discussions and export-oriented coordination.",
    primary_button: "Request a Quote",
    primary_link: "/request-a-quote",
    secondary_button: "Explore Global Reach",
    secondary_link: "/global-reach",
  },
];

const heroFallback = {
  eyebrow: "Indian Products • Global Opportunities",
  heading: "Connecting Quality Indian Products to Global Markets.",
  body: "Aishwary Exim & Logistics brings together Indian handicrafts, biodegradable food packaging, leather goods and garments through a buyer-focused sourcing and export platform.",
  primary_button: "Explore Our Products",
  secondary_button: "Request a Quote",
  features: ["B2B & Bulk Enquiries", "Requirement-Based Sourcing", "Export-Focused Support"],
  floating_title: "Connecting Bihar, India",
  floating_text: "to the World",
  items: heroSlides,
};

const HomeHero = () => {
  const { content: hero } = useCmsSection("home", "hero", heroFallback);
  const slides = hero.items?.length
    ? hero.items.map((slide, index) => ({
        ...heroSlides[index % heroSlides.length],
        ...slide,
        image: mediaUrl(slide.image || slide.media) || (index === 0 ? mediaUrl(hero.media) : null) || heroSlides[index % heroSlides.length].image,
      }))
    : heroSlides;
  const [activeSlide, setActiveSlide] =
    useState(0);

  const [isPaused, setIsPaused] =
    useState(false);
  // Slide fields override section defaults, so older CMS slides remain compatible.
  const currentSlide = activeSlide % slides.length;
  const banner = { ...hero, ...slides[currentSlide] };

  useEffect(() => {
    if (
      isPaused ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return undefined;
    }

    const timer = window.setInterval(
      () => {
        setActiveSlide(
          (current) =>
            (current + 1) %
            slides.length
        );
      },
      2500
    );

    return () =>
      window.clearInterval(timer);
  }, [isPaused, slides.length]);

  const showSlide = (index) => {
    setActiveSlide(
      (index + slides.length) %
        slides.length
    );
  };

  return (
    <section className="ael-home-hero ael-home-hero--banner">
      <div
        className="ael-home-hero__mithila-pattern"
        aria-hidden="true"
      />

      <div
        className="ael-home-hero__folk-border"
        aria-hidden="true"
      />

      <div className="ael-home-hero__decoration ael-home-hero__decoration--one" />
      <div className="ael-home-hero__decoration ael-home-hero__decoration--two" />

      <Container className="ael-home-hero__container">
        <div className="ael-home-hero__content" key={currentSlide}>
          <div className="ael-home-hero__eyebrow">
            <Globe2 size={16} />

            <span>
              {banner.eyebrow}
            </span>
          </div>

          <h1>{banner.heading}</h1>

          <p className="ael-home-hero__description">
            {banner.body}
          </p>

          <div className="ael-home-hero__actions">
            <Button
              to={banner.primary_link || "/products"}
              size="lg"
            >
              {banner.primary_button}

              <ArrowRight size={18} />
            </Button>

            <Button
              to={banner.secondary_link || "/request-a-quote"}
              variant="outline-primary"
              size="lg"
            >
              {banner.secondary_button}
            </Button>
          </div>

          <div className="ael-home-hero__features">
            <div>
              <PackageCheck size={18} />

              <span>
                {banner.features?.[0] || heroFallback.features[0]}
              </span>
            </div>

            <div>
              <SearchCheck size={18} />

              <span>
                {banner.features?.[1] || heroFallback.features[1]}
              </span>
            </div>

            <div>
              <Globe2 size={18} />

              <span>
                {banner.features?.[2] || heroFallback.features[2]}
              </span>
            </div>
          </div>
        </div>

        <div
          className="ael-home-hero__visual"
          onMouseEnter={() =>
            setIsPaused(true)
          }
          onMouseLeave={() =>
            setIsPaused(false)
          }
          onFocus={() =>
            setIsPaused(true)
          }
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget
              )
            ) {
              setIsPaused(false);
            }
          }}
          aria-roledescription="carousel"
          aria-label="Featured product images"
        >
          <div className="ael-home-hero__slider">
            {slides.map(
              (slide, index) => (
                <figure
                  className={`ael-home-hero__slide${
                    index === activeSlide
                      ? " is-active"
                      : ""
                  }`}
                  aria-hidden={
                    index !== activeSlide
                  }
                  key={slide.image}
                >
                  <img
                    src={slide.image}
                    alt={
                      index === activeSlide
                        ? slide.alt
                        : ""
                    }
                  />
                </figure>
              )
            )}

            <button
              className="ael-home-hero__slider-control ael-home-hero__slider-control--previous"
              type="button"
              onClick={() =>
                showSlide(activeSlide - 1)
              }
              aria-label="Show previous image"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              className="ael-home-hero__slider-control ael-home-hero__slider-control--next"
              type="button"
              onClick={() =>
                showSlide(activeSlide + 1)
              }
              aria-label="Show next image"
            >
              <ChevronRight size={22} />
            </button>

            <div
              className="ael-home-hero__slider-dots"
              aria-label="Choose featured image"
            >
              {slides.map(
                (slide, index) => (
                  <button
                    type="button"
                    className={
                      index === activeSlide
                        ? "is-active"
                        : ""
                    }
                    onClick={() =>
                      showSlide(index)
                    }
                    aria-label={`Show image ${
                      index + 1
                    } of ${slides.length}`}
                    aria-current={
                      index === activeSlide
                        ? "true"
                        : undefined
                    }
                    key={slide.image}
                  />
                )
              )}
            </div>
          </div>

          <div className="ael-home-hero__floating-card">
            <span className="ael-home-hero__floating-icon">
              <Globe2 size={22} />
            </span>

            <div>
              <strong>
                {hero.floating_title}
              </strong>

              <span>
                {hero.floating_text}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeHero;
