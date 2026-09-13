import {
  ArrowRight,
  Images,
  PackageSearch,
} from "lucide-react";

import {
  useCallback,
} from "react";

import {
  Link,
  useSearchParams,
} from "react-router-dom";

import Breadcrumb from "../../components/common/Breadcrumb";
import Container from "../../components/common/Container";
import SectionHeading from "../../components/common/SectionHeading";

import GalleryGrid from "../../components/gallery/GalleryGrid";
import GalleryLightbox from "../../components/gallery/GalleryLightbox";

import { useGalleryData } from "../../hooks/useGalleryData";
import { useCmsSection } from "../../hooks/useCmsSection";

import "../../components/gallery/gallery.css";
import "./gallery-page.css";

const Gallery = () => {
  const { items: handicraftGalleryItems } = useGalleryData();
  const { content: hero } = useCmsSection("gallery", "hero", { eyebrow: "Media Gallery", heading: "Products & Visual Collections.", body: "Explore available product photography and visual collections from Aishwary Exim & Logistics." });
  const { content: collection } = useCmsSection("gallery", "collection", { eyebrow: "Featured Collection", heading: "Original Handicraft Photography.", body: "The currently verified media collection consists primarily of original handicraft and folk-art photography." });
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const selectedSlug =
    searchParams.get(
      "image"
    ) || "";

  const selectedItem =
    selectedSlug
      ? handicraftGalleryItems.find((item) => item.slug === selectedSlug)
      : null;

  const previewItems =
    handicraftGalleryItems.slice(
      0,
      8
    );

  const openItem =
    useCallback(
      (item) => {
        const next =
          new URLSearchParams(
            searchParams
          );

        next.set(
          "image",
          item.slug
        );

        setSearchParams(next);
      },
      [
        searchParams,
        setSearchParams,
      ]
    );

  const closeItem =
    useCallback(() => {
      const next =
        new URLSearchParams(
          searchParams
        );

      next.delete("image");

      setSearchParams(next);
    }, [
      searchParams,
      setSearchParams,
    ]);

  return (
    <>
      <section className="ael-media-gallery-hero">
        <Container>
          <div className="ael-media-gallery-hero__content">
            <div>
              <Images size={16} />

              {hero.eyebrow}
            </div>

            <h1>{hero.heading}</h1>

            <p>
              {hero.body}
            </p>
          </div>
        </Container>
      </section>

      <section className="ael-media-gallery-breadcrumb">
        <Container>
          <Breadcrumb
            items={[
              {
                label:
                  "Gallery",
              },
            ]}
          />
        </Container>
      </section>

      <section className="ael-section ael-media-gallery">
        <Container>
          <div className="ael-media-gallery__header">
            <SectionHeading
              eyebrow={collection.eyebrow}
              title={collection.heading}
              description={collection.body}
            />

            <Link
              to="/handicrafts-gallery"
            >
              Full Handicrafts Gallery

              <ArrowRight
                size={16}
              />
            </Link>
          </div>

          <GalleryGrid
            items={previewItems}
            onOpen={openItem}
          />
        </Container>
      </section>

      <section className="ael-media-gallery-catalogue">
        <Container>
          <div className="ael-media-gallery-catalogue__inner">
            <span>
              <PackageSearch
                size={30}
              />
            </span>

            <div>
              <small>
                Looking for products?
              </small>

              <h2>
                Explore the complete
                product catalogue.
              </h2>

              <p>
                Browse handicrafts,
                sustainable packaging,
                leather goods and
                garments through the
                structured catalogue.
              </p>
            </div>

            <Link to="/products">
              Browse Products

              <ArrowRight
                size={16}
              />
            </Link>
          </div>
        </Container>
      </section>

      <GalleryLightbox
        item={selectedItem}
        items={previewItems}
        onClose={closeItem}
        onChange={openItem}
      />
    </>
  );
};

export default Gallery;
