import {
  CheckCircle2,
  FileSearch,
  Globe2,
  ShieldCheck,
} from "lucide-react";

import {
  useEffect,
  useMemo,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import Breadcrumb from "../../components/common/Breadcrumb";
import Container from "../../components/common/Container";

import EnquiryHero from "../../components/enquiry/EnquiryHero";
import EnquiryReferenceCard from "../../components/enquiry/EnquiryReferenceCard";
import EnquiryForm from "../../components/enquiry/EnquiryForm";

import {
  getCatalogueCategory,
  getProductByAnySlug,
  getProductByCode,
} from "../../data/catalogue";

import {
  getHandicraftGalleryItem,
} from "../../data/handicraftsGallery";

import "../../components/enquiry/enquiry.css";
import "./request-quote.css";

const RequestQuote = () => {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const requestedProduct =
    searchParams.get("product") ||
    "";

  const requestedCode =
    searchParams.get("code") ||
    "";

  const requestedGallery =
    searchParams.get("gallery") ||
    "";

  const requestedCategory =
    searchParams.get("category") ||
    "";

  const product =
    useMemo(
      () =>
        requestedProduct
          ? getProductByAnySlug(
              requestedProduct
            )
          : requestedCode
            ? getProductByCode(
                requestedCode
              )
            : null,
      [
        requestedProduct,
        requestedCode,
      ]
    );

  const galleryItem =
    useMemo(
      () =>
        requestedGallery
          ? getHandicraftGalleryItem(
              requestedGallery
            )
          : null,
      [requestedGallery]
    );

  const category =
    requestedCategory
      ? getCatalogueCategory(
          requestedCategory
        )
      : null;

  useEffect(() => {
    const next =
      new URLSearchParams(
        searchParams
      );

    let changed = false;

    if (
      requestedProduct &&
      !product
    ) {
      next.delete("product");
      next.delete("code");

      changed = true;
    }

    if (
      requestedCode &&
      !product &&
      !requestedProduct
    ) {
      next.delete("code");

      changed = true;
    }

    if (
      requestedGallery &&
      !galleryItem
    ) {
      next.delete("gallery");

      changed = true;
    }

    if (
      requestedCategory &&
      !category
    ) {
      next.delete("category");

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
    requestedProduct,
    requestedCode,
    requestedGallery,
    requestedCategory,
    product,
    galleryItem,
    category,
    searchParams,
    setSearchParams,
  ]);

  const formKey =
    product?.slug ||
    galleryItem?.slug ||
    category?.slug ||
    "general-export-enquiry";

  return (
    <>
      <EnquiryHero
        product={product}
        galleryItem={
          galleryItem
        }
      />

      <section className="ael-request-quote-breadcrumb">
        <Container>
          <Breadcrumb
            items={[
              {
                label:
                  "Request a Quote",
              },
            ]}
          />
        </Container>
      </section>

      <section className="ael-section ael-request-quote">
        <Container>
          <div className="ael-request-quote__layout">
            <div className="ael-request-quote__form-column">
              <EnquiryReferenceCard
                product={product}
                galleryItem={
                  galleryItem
                }
              />

              <EnquiryForm
                key={formKey}
                product={product}
                galleryItem={
                  galleryItem
                }
                requestedCategory={
                  category?.slug ||
                  ""
                }
              />
            </div>

            <aside className="ael-request-quote__aside">
              <div className="ael-request-quote__aside-card">
                <span>
                  <FileSearch
                    size={22}
                  />
                </span>

                <h3>
                  Better Information,
                  Better Discussion
                </h3>

                <p>
                  Product, quantity,
                  destination and
                  specification details
                  help make commercial
                  discussions more
                  relevant.
                </p>
              </div>

              <div className="ael-request-quote__aside-card">
                <span>
                  <Globe2 size={22} />
                </span>

                <h3>
                  Export Context
                </h3>

                <p>
                  Destination and trade
                  requirements can affect
                  packaging, documentation
                  and logistics discussion.
                </p>
              </div>

              <div className="ael-request-quote__aside-card">
                <span>
                  <ShieldCheck
                    size={22}
                  />
                </span>

                <h3>
                  No Unsupported Claims
                </h3>

                <p>
                  Specifications,
                  certifications and
                  commercial terms should
                  be confirmed for the
                  actual product and
                  transaction.
                </p>
              </div>

              <div className="ael-request-quote__aside-note">
                <CheckCircle2
                  size={19}
                />

                <div>
                  <strong>
                    Product-aware forms
                  </strong>

                  <span>
                    Product and gallery
                    references are carried
                    into the enquiry
                    automatically.
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
};

export default RequestQuote;