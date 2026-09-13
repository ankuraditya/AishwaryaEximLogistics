import GalleryCard from "./GalleryCard";

const GalleryGrid = ({
  items = [],
  onOpen,
}) => {
  return (
    <div className="ael-gallery-grid">
      {items.map((item) => (
        <GalleryCard
          key={item.id}
          item={item}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
};

export default GalleryGrid;