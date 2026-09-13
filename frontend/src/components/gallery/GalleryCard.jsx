import {
  Maximize2,
} from "lucide-react";

const GalleryCard = ({
  item,
  onOpen,
}) => {
  return (
    <article className="ael-gallery-card">
      <button
        type="button"
        className="ael-gallery-card__image"
        onClick={() =>
          onOpen(item)
        }
        aria-label={`View ${item.title}`}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
        />

        <span className="ael-gallery-card__overlay">
          <span className="ael-gallery-card__expand">
            <Maximize2 size={18} />
          </span>

          <span className="ael-gallery-card__overlay-content">
            <small>
              {item.categoryName}
            </small>

            <strong>
              {item.title}
            </strong>
          </span>
        </span>
      </button>

      <div className="ael-gallery-card__caption">
        <span>
          {item.categoryName}
        </span>

        <h3>
          {item.title}
        </h3>
      </div>
    </article>
  );
};

export default GalleryCard;