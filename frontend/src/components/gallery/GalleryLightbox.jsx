import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquareText,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
} from "react";

import { Link } from "react-router-dom";

import useFocusTrap from "../../hooks/useFocusTrap";

const GalleryLightbox = ({
  item,
  items = [],
  onClose,
  onChange,
}) => {
  const modalRef =
    useRef(null);

  const currentIndex =
    item
      ? items.findIndex(
          (galleryItem) =>
            galleryItem.id === item.id
        )
      : -1;

  const hasNavigation =
    items.length > 1 &&
    currentIndex !== -1;

  useFocusTrap(
    modalRef,
    Boolean(item)
  );

  const previous = () => {
    if (!hasNavigation) {
      return;
    }

    const index =
      (currentIndex -
        1 +
        items.length) %
      items.length;

    onChange(
      items[index]
    );
  };

  const next = () => {
    if (!hasNavigation) {
      return;
    }

    const index =
      (currentIndex + 1) %
      items.length;

    onChange(
      items[index]
    );
  };

  useEffect(() => {
    if (!item) {
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
        onClose();

        return;
      }

      if (
        items.length <= 1 ||
        currentIndex === -1
      ) {
        return;
      }

      if (
        event.key ===
        "ArrowLeft"
      ) {
        const index =
          (currentIndex -
            1 +
            items.length) %
          items.length;

        onChange(
          items[index]
        );
      }

      if (
        event.key ===
        "ArrowRight"
      ) {
        const index =
          (currentIndex + 1) %
          items.length;

        onChange(
          items[index]
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
    item,
    currentIndex,
    items,
    onChange,
    onClose,
  ]);

  if (!item) {
    return null;
  }

  const enquiryPath =
    `/request-a-quote?gallery=${encodeURIComponent(
      item.slug
    )}`;

  return (
    <div
      className="ael-gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        type="button"
        className="ael-gallery-lightbox__backdrop"
        onClick={onClose}
        aria-label="Close image viewer"
      />

      <div
        ref={modalRef}
        className="ael-gallery-lightbox__modal"
      >
        <div className="ael-gallery-lightbox__image-panel">
          <img
            src={item.image}
            alt={item.title}
          />

          {hasNavigation && (
            <>
              <button
                type="button"
                className="ael-gallery-lightbox__nav ael-gallery-lightbox__nav--previous"
                onClick={previous}
                aria-label="Previous gallery item"
              >
                <ChevronLeft
                  size={24}
                />
              </button>

              <button
                type="button"
                className="ael-gallery-lightbox__nav ael-gallery-lightbox__nav--next"
                onClick={next}
                aria-label="Next gallery item"
              >
                <ChevronRight
                  size={24}
                />
              </button>
            </>
          )}

          <div className="ael-gallery-lightbox__counter">
            {currentIndex + 1}
            {" / "}
            {items.length}
          </div>
        </div>

        <div className="ael-gallery-lightbox__details">
          <button
            type="button"
            className="ael-gallery-lightbox__close"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <X size={21} />
          </button>

          <span className="ael-gallery-lightbox__category">
            {item.categoryName}
          </span>

          <h2>
            {item.title}
          </h2>

          <p>
            {item.description}
          </p>

          <div className="ael-gallery-lightbox__actions">
            {item.productPath && (
              <Link
                to={item.productPath}
                onClick={onClose}
                className="ael-gallery-lightbox__product"
              >
                {item.productLabel ||
                  "View Product"}

                <ArrowRight
                  size={16}
                />
              </Link>
            )}

            <Link
              to={enquiryPath}
              onClick={onClose}
              className="ael-gallery-lightbox__enquiry"
            >
              <MessageSquareText
                size={16}
              />

              Enquire About This Item
            </Link>
          </div>

          <div className="ael-gallery-lightbox__help">
            <strong>
              Interested in this design?
            </strong>

            <span>
              Share your required
              quantity and product
              requirement for further
              discussion.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryLightbox;