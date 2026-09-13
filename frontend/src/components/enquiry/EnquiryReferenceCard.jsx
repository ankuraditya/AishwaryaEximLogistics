import {
  FileImage,
  PackageSearch,
} from "lucide-react";

import { Link } from "react-router-dom";

const EnquiryReferenceCard = ({
  product,
  galleryItem,
}) => {
  if (!product && !galleryItem) {
    return null;
  }

  const reference =
    product || galleryItem;

  const image =
    product?.image ||
    galleryItem?.image ||
    null;

  return (
    <div className="ael-enquiry-reference">
      <div className="ael-enquiry-reference__image">
        {image ? (
          <img
            src={image}
            alt={reference.name ||
              reference.title}
          />
        ) : (
          <span>
            {product ? (
              <PackageSearch
                size={27}
              />
            ) : (
              <FileImage
                size={27}
              />
            )}
          </span>
        )}
      </div>

      <div className="ael-enquiry-reference__content">
        <span>
          {product
            ? "Selected Product"
            : "Selected Gallery Item"}
        </span>

        <h2>
          {product?.name ||
            galleryItem?.title}
        </h2>

        {product && (
          <small>
            Product Code:{" "}
            <strong>
              {product.code}
            </strong>
          </small>
        )}

        {galleryItem && (
          <small>
            {
              galleryItem.categoryName
            }
          </small>
        )}

        {product && (
          <Link
            to={`/products/${product.categorySlug}/${product.slug}`}
          >
            View Product
          </Link>
        )}

        {galleryItem && (
          <Link
            to={`/handicrafts-gallery?image=${encodeURIComponent(
              galleryItem.slug
            )}`}
          >
            View Gallery Item
          </Link>
        )}
      </div>
    </div>
  );
};

export default EnquiryReferenceCard;