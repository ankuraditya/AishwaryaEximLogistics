import {
  Images,
  RotateCcw,
} from "lucide-react";

const GalleryEmptyState = ({
  onReset,
}) => {
  return (
    <div className="ael-gallery-empty">
      <span>
        <Images size={34} />
      </span>

      <h2>
        No gallery items found.
      </h2>

      <p>
        Try selecting another
        handicraft category.
      </p>

      <button
        type="button"
        onClick={onReset}
      >
        <RotateCcw size={15} />

        View All Handicrafts
      </button>
    </div>
  );
};

export default GalleryEmptyState;