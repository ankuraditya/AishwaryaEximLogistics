import {
  ArrowRight,
  Check,
  Copy,
  Download,
  MessageCircle,
  Share2,
} from "lucide-react";

import {
  useState,
} from "react";

import { Link } from "react-router-dom";

import { useWebsiteSettings } from "../../hooks/useWebsiteSettings";

const ProductEnquiryPanel = ({
  product,
}) => {
  const companyInfo = useWebsiteSettings();
  const [
    copied,
    setCopied,
  ] = useState(false);

  const quotePath =
    `/request-a-quote?product=${encodeURIComponent(
      product.slug
    )}&code=${encodeURIComponent(
      product.code
    )}`;

  const whatsappNumber =
    companyInfo.whatsapp
      ? companyInfo.whatsapp.replace(
          /\D/g,
          ""
        )
      : "";

  const whatsappMessage =
    `Hello, I am interested in ${product.name} (${product.code}). Please share relevant product and commercial details.`;

  const whatsappUrl =
    whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`
      : null;

  const copyProductLink =
    async () => {
      try {
        if (
          !navigator.clipboard
        ) {
          return false;
        }

        await navigator.clipboard.writeText(
          window.location.href
        );

        setCopied(true);

        window.setTimeout(() => {
          setCopied(false);
        }, 1800);

        return true;
      } catch {
        return false;
      }
    };

  const shareProduct =
    async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title:
              product.name,
            text:
              product.shortDescription,
            url:
              window.location.href,
          });

          return;
        } catch {
          return;
        }
      }

      await copyProductLink();
    };

  return (
    <aside className="ael-product-enquiry-panel">
      <div className="ael-product-enquiry-panel__label">
        B2B / Bulk Enquiry
      </div>

      <h2>
        Interested in this product?
      </h2>

      <p>
        Share your requirement so the
        relevant product and commercial
        information can be discussed.
      </p>

      <div className="ael-product-enquiry-panel__requirements">
        <div>
          <Check size={14} />
          Required quantity
        </div>

        <div>
          <Check size={14} />
          Destination
        </div>

        <div>
          <Check size={14} />
          Product specifications
        </div>

        <div>
          <Check size={14} />
          Packaging requirements
        </div>
      </div>

      <Link
        to={quotePath}
        className="ael-product-enquiry-panel__quote"
      >
        Request Product Quote

        <ArrowRight size={17} />
      </Link>

      {whatsappUrl && (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ael-product-enquiry-panel__whatsapp"
        >
          <MessageCircle
            size={17}
          />

          Enquire on WhatsApp
        </a>
      )}

      {product.cataloguePdf && (
        <a
          href={
            product.cataloguePdf
          }
          target="_blank"
          rel="noopener noreferrer"
          className="ael-product-enquiry-panel__catalogue"
        >
          <Download size={16} />

          Download Product Catalogue
        </a>
      )}

      <div className="ael-product-enquiry-panel__share">
        <button
          type="button"
          onClick={shareProduct}
        >
          <Share2 size={15} />

          Share
        </button>

        <button
          type="button"
          onClick={copyProductLink}
        >
          <Copy size={15} />

          {copied
            ? "Copied"
            : "Copy Link"}
        </button>
      </div>

      <div className="ael-product-enquiry-panel__code">
        Product Code

        <strong>
          {product.code}
        </strong>
      </div>
    </aside>
  );
};

export default ProductEnquiryPanel;
