import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import ProductVisual from "./ProductVisual";

import useFocusTrap from "../../hooks/useFocusTrap";

const ProductGalleryContent = ({
  product,
}) => {
  const images =
    product.gallery || [];

  const lightboxRef =
    useRef(null);

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState(0);

  const [
    lightboxOpen,
    setLightboxOpen,
  ] = useState(false);

  useFocusTrap(
    lightboxRef,
    lightboxOpen
  );

  useEffect(() => {
    if (!lightboxOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleKeydown = (
      event
    ) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (
        event.key ===
          "ArrowRight" &&
        images.length > 1
      ) {
        setSelectedIndex(
          (current) =>
            (current + 1) %
            images.length
        );
      }

      if (
        event.key ===
          "ArrowLeft" &&
        images.length > 1
      ) {
        setSelectedIndex(
          (current) =>
            (current -
              1 +
              images.length) %
            images.length
        );
      }
    };

    document.addEventListener(
      "keydown",
      handleKeydown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeydown
      );
    };
  }, [
    lightboxOpen,
    images.length,
  ]);

  const previousImage = () => {
    if (images.length <= 1) {
      return;
    }

    setSelectedIndex(
      (current) =>
        (current -
          1 +
          images.length) %
        images.length
    );
  };

  const nextImage = () => {
    if (images.length <= 1) {
      return;
    }

    setSelectedIndex(
      (current) =>
        (current + 1) %
        images.length
    );
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  if (images.length === 0) {
    return (
      <div className="ael-product-gallery">
        <div className="ael-product-gallery__main">
          <ProductVisual
            product={product}
            className="ael-product-gallery__fallback"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="ael-product-gallery">
        <div className="ael-product-gallery__main">
          <img
            src={images[selectedIndex]}
            alt={product.name}
          />

          <button
            type="button"
            className="ael-product-gallery__expand"
            onClick={() =>
              setLightboxOpen(true)
            }
            aria-label="View larger image"
          >
            <Maximize2 size={18} />

            <span>
              View Larger
            </span>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="ael-product-gallery__control ael-product-gallery__control--previous"
                onClick={previousImage}
                aria-label="Previous image"
              >
                <ChevronLeft
                  size={20}
                />
              </button>

              <button
                type="button"
                className="ael-product-gallery__control ael-product-gallery__control--next"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight
                  size={20}
                />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="ael-product-gallery__thumbnails">
            {images.map(
              (image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className={
                    selectedIndex ===
                    index
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedIndex(
                      index
                    )
                  }
                  aria-label={`View product image ${
                    index + 1
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                  />
                </button>
              )
            )}
          </div>
        )}

        <div className="ael-product-gallery__count">
          Image{" "}
          <strong>
            {selectedIndex + 1}
          </strong>

          {" / "}

          <strong>
            {images.length}
          </strong>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="ael-product-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image gallery`}
        >
          <button
            type="button"
            className="ael-product-lightbox__backdrop"
            onClick={
              closeLightbox
            }
            aria-label="Close image viewer"
          />

          <button
            type="button"
            className="ael-product-lightbox__close"
            onClick={
              closeLightbox
            }
            aria-label="Close image viewer"
          >
            <X size={22} />
          </button>

          <div
            ref={lightboxRef}
            className="ael-product-lightbox__content"
          >
            <img
              src={
                images[selectedIndex]
              }
              alt={product.name}
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="ael-product-lightbox__nav ael-product-lightbox__nav--previous"
                  onClick={
                    previousImage
                  }
                  aria-label="Previous image"
                >
                  <ChevronLeft
                    size={25}
                  />
                </button>

                <button
                  type="button"
                  className="ael-product-lightbox__nav ael-product-lightbox__nav--next"
                  onClick={
                    nextImage
                  }
                  aria-label="Next image"
                >
                  <ChevronRight
                    size={25}
                  />
                </button>
              </>
            )}

            <div className="ael-product-lightbox__count">
              {selectedIndex + 1}
              {" / "}
              {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ProductGallery = ({
  product,
}) => {
  return (
    <ProductGalleryContent
      key={product.id}
      product={product}
    />
  );
};

export default ProductGallery;