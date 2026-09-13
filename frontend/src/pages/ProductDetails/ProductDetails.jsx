import {
  ArrowRight,
} from "lucide-react";

import {
  Link,
  useParams,
} from "react-router-dom";

import Breadcrumb from "../../components/common/Breadcrumb";
import Container from "../../components/common/Container";

import ProductGallery from "../../components/product/ProductGallery";
import ProductDetailsInfo from "../../components/product/ProductDetailsInfo";
import ProductSpecifications from "../../components/product/ProductSpecifications";
import ProductCommercialDetails from "../../components/product/ProductCommercialDetails";
import ProductEnquiryPanel from "../../components/product/ProductEnquiryPanel";
import RelatedProducts from "../../components/product/RelatedProducts";
import ProductNavigation from "../../components/product/ProductNavigation";

import { useCatalogueData } from "../../hooks/useCatalogueData";

import "../../components/product/product.css";
import "./product-details.css";

const ProductDetails = () => {
  const { categories, products } = useCatalogueData();
  const {
    categorySlug,
    productSlug,
  } = useParams();

  const category = categories.find((item) => item.slug === categorySlug);

  const product = products.find((item) => item.categorySlug === categorySlug && item.slug === productSlug);

  if (!product || !category) {
    return (
      <section className="ael-product-not-found">
        <Container>
          <div className="ael-product-not-found__card">
            <span>
              Product Catalogue
            </span>

            <h1>
              Product not found.
            </h1>

            <p>
              The requested product
              could not be found in the
              current Aishwary
              catalogue.
            </p>

            <Link to="/products">
              Browse Product Catalogue

              <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const subcategoryName = category.subcategories?.find((item) => item.slug === product.subcategorySlug)?.name;

  const productsInCategory = products.filter((item) => item.categorySlug === product.categorySlug);
  const relatedProducts = productsInCategory.filter((item) => item.id !== product.id).slice(0, 4);

  const currentIndex = productsInCategory.findIndex((item) => item.id === product.id);
  const previous = currentIndex > 0 ? productsInCategory[currentIndex - 1] : null;
  const next = currentIndex >= 0 && currentIndex < productsInCategory.length - 1 ? productsInCategory[currentIndex + 1] : null;

  return (
    <>
      <section className="ael-product-detail-breadcrumb">
        <Container>
          <Breadcrumb
            items={[
              {
                label:
                  "Products",
                to:
                  "/products",
              },

              {
                label:
                  category.name,
                to:
                  `/products/${category.slug}`,
              },

              ...(subcategoryName
                ? [
                    {
                      label:
                        subcategoryName,
                      to:
                        `/products/${category.slug}?type=${product.subcategorySlug}`,
                    },
                  ]
                : []),

              {
                label:
                  product.name,
              },
            ]}
          />
        </Container>
      </section>

      <section className="ael-product-detail-main">
        <Container>
          <div className="ael-product-detail-main__grid">
            <ProductGallery
              product={product}
            />

            <div className="ael-product-detail-main__information">
              <ProductDetailsInfo
                product={product}
              />

              <ProductEnquiryPanel
                product={product}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="ael-section ael-product-detail-content">
        <Container>
          <div className="ael-product-detail-content__grid">
            <div className="ael-product-description">
              <div className="ael-product-section-heading">
                <span>
                  Product Overview
                </span>

                <h2>
                  Product Description
                </h2>
              </div>

              <p>
                {
                  product.longDescription
                }
              </p>

              <div className="ael-product-description__notice">
                Product characteristics
                and commercial details
                should be confirmed
                against the actual buyer
                requirement before order
                finalisation.
              </div>
            </div>

            <ProductSpecifications
              product={product}
            />
          </div>

          <ProductCommercialDetails
            product={product}
          />

          <ProductNavigation
            previous={previous}
            next={next}
          />
        </Container>
      </section>

      <RelatedProducts
        products={relatedProducts}
        categorySlug={
          product.categorySlug
        }
      />
    </>
  );
};

export default ProductDetails;
