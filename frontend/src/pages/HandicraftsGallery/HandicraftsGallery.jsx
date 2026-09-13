import {
  ArrowRight,
  Palette,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useMemo,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import Breadcrumb from "../../components/common/Breadcrumb";
import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";

import GalleryHero from "../../components/gallery/GalleryHero";
import GalleryFilters from "../../components/gallery/GalleryFilters";
import GalleryGrid from "../../components/gallery/GalleryGrid";
import GalleryLightbox from "../../components/gallery/GalleryLightbox";
import GalleryEmptyState from "../../components/gallery/GalleryEmptyState";

import { useGalleryData } from "../../hooks/useGalleryData";
import { useCmsSection } from "../../hooks/useCmsSection";

import "../../components/gallery/gallery.css";
import "./handicrafts-gallery.css";

const HandicraftsGallery = () => {
  const { categories: handicraftGalleryCategories, items: handicraftGalleryItems } = useGalleryData();
  const { content: hero } = useCmsSection("handicrafts-gallery", "hero", {});
  const { content: collection } = useCmsSection("handicrafts-gallery", "collection", { eyebrow: "Explore the Collection", heading: "Original Handicrafts & Traditional Artwork.", body: "Browse the collection by category and open any image for a closer look." });
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const requestedType =
    searchParams.get("type") ||
    "all";

  const requestedImage =
    searchParams.get("image") ||
    "";

  const validCategory =
    handicraftGalleryCategories.some(
      (category) =>
        category.slug ===
        requestedType
    );

  const activeCategory =
    validCategory
      ? requestedType
      : "all";

  const selectedItem =
    requestedImage
      ? handicraftGalleryItems.find((item) => item.slug === requestedImage)
      : null;

  useEffect(() => {
    const next =
      new URLSearchParams(
        searchParams
      );

    let changed = false;

    if (
      requestedType !== "all" &&
      !validCategory
    ) {
      next.delete("type");

      changed = true;
    }

    if (
      requestedImage &&
      !selectedItem
    ) {
      next.delete("image");

      changed = true;
    }

    if (changed) {
      setSearchParams(
        next,
        {
          replace: true,
        }
      );
    }
  }, [
    requestedType,
    requestedImage,
    validCategory,
    selectedItem,
    searchParams,
    setSearchParams,
  ]);

  const visibleItems =
    useMemo(() => {
      if (
        activeCategory ===
        "all"
      ) {
        return handicraftGalleryItems;
      }

      return handicraftGalleryItems.filter(
        (item) =>
          item.category ===
          activeCategory
      );
    }, [activeCategory, handicraftGalleryItems]);

  const counts =
    useMemo(() => {
      const result = {
        all:
          handicraftGalleryItems.length,
      };

      handicraftGalleryCategories
        .filter(
          (category) =>
            category.slug !== "all"
        )
        .forEach((category) => {
          result[category.slug] =
            handicraftGalleryItems.filter(
              (item) =>
                item.category ===
                category.slug
            ).length;
        });

      return result;
    }, [handicraftGalleryCategories, handicraftGalleryItems]);

  const updateParams =
    useCallback(
      (updates = {}) => {
        const next =
          new URLSearchParams(
            searchParams
          );

        Object.entries(
          updates
        ).forEach(
          ([key, value]) => {
            if (
              value === null ||
              value === undefined ||
              value === "" ||
              (
                key === "type" &&
                value === "all"
              )
            ) {
              next.delete(key);
            } else {
              next.set(
                key,
                value
              );
            }
          }
        );

        setSearchParams(next);
      },
      [
        searchParams,
        setSearchParams,
      ]
    );

  const handleCategoryChange =
    (categorySlug) => {
      const next =
        new URLSearchParams();

      if (
        categorySlug !== "all"
      ) {
        next.set(
          "type",
          categorySlug
        );
      }

      setSearchParams(next);
    };

  const handleOpen =
    useCallback(
      (item) => {
        updateParams({
          image:
            item.slug,
        });
      },
      [updateParams]
    );

  const handleClose =
    useCallback(() => {
      updateParams({
        image: null,
      });
    }, [updateParams]);

  const handleLightboxChange =
    useCallback(
      (item) => {
        updateParams({
          image:
            item.slug,
        });
      },
      [updateParams]
    );

  return (
    <>
      <GalleryHero
        totalItems={
          handicraftGalleryItems.length
        }
        cms={hero}
      />

      <section className="ael-gallery-breadcrumb">
        <Container>
          <Breadcrumb
            items={[
              {
                label:
                  "Handicrafts Gallery",
              },
            ]}
          />
        </Container>
      </section>

      <section className="ael-section ael-handicrafts-gallery">
        <Container>
          <div className="ael-handicrafts-gallery__header">
            <SectionHeading
              eyebrow={collection.eyebrow}
              title={collection.heading}
              description={collection.body}
            />

            <div className="ael-handicrafts-gallery__result">
              <strong>
                {
                  visibleItems.length
                }
              </strong>

              <span>
                {visibleItems.length ===
                1
                  ? " item"
                  : " items"}
              </span>
            </div>
          </div>

          <GalleryFilters
            categories={
              handicraftGalleryCategories
            }
            activeCategory={
              activeCategory
            }
            counts={counts}
            onChange={
              handleCategoryChange
            }
          />

          {visibleItems.length >
          0 ? (
            <GalleryGrid
              items={
                visibleItems
              }
              onOpen={
                handleOpen
              }
            />
          ) : (
            <GalleryEmptyState
              onReset={() =>
                handleCategoryChange(
                  "all"
                )
              }
            />
          )}
        </Container>
      </section>

      <section className="ael-handicrafts-gallery-cta">
        <Container>
          <div className="ael-handicrafts-gallery-cta__inner">
            <div className="ael-handicrafts-gallery-cta__icon">
              <Palette size={27} />
            </div>

            <div>
              <span>
                Handicraft Sourcing
              </span>

              <h2>
                Interested in a design
                from the gallery?
              </h2>

              <p>
                Share the design,
                approximate quantity
                and your product
                requirement for further
                discussion.
              </p>
            </div>

            <div className="ael-handicrafts-gallery-cta__actions">
              <Link
                to="/request-a-quote?category=handicrafts"
              >
                Send Handicraft Enquiry

                <ArrowRight
                  size={17}
                />
              </Link>

              <Link
                to="/products/handicrafts"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <GalleryLightbox
        item={selectedItem}
        items={visibleItems}
        onClose={
          handleClose
        }
        onChange={
          handleLightboxChange
        }
      />
    </>
  );
};

export default HandicraftsGallery;
