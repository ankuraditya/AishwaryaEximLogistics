import {
  ArrowRight,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import Container from "../../components/common/Container";

import CatalogueHero from "../../components/product/CatalogueHero";
import CatalogueEmptyState from "../../components/product/CatalogueEmptyState";
import ProductCard from "../../components/product/ProductCard";
import ProductFilters from "../../components/product/ProductFilters";
import ProductPagination from "../../components/product/ProductPagination";
import ProductToolbar from "../../components/product/ProductToolbar";

import { useCatalogueData } from "../../hooks/useCatalogueData";

import {
  filterCatalogueProducts,
  paginateCatalogueProducts,
  sortCatalogueProducts,
} from "../../utils/catalogue";

import "../../components/product/product.css";
import "./products.css";

const PRODUCTS_PER_PAGE = 8;

const Products = () => {
  const { categories: catalogueCategories, products: catalogueProducts } = useCatalogueData();
  const { categorySlug } =
    useParams();

  const navigate = useNavigate();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const [
    mobileFiltersOpen,
    setMobileFiltersOpen,
  ] = useState(false);

  const routeCategory = categorySlug
    ? catalogueCategories.find((category) => category.slug === categorySlug)
    : null;

  const categoryIsInvalid =
    Boolean(categorySlug) &&
    !routeCategory;

  const search =
    searchParams.get("search") || "";

  const type =
    searchParams.get("type") || "";

  const sort =
    searchParams.get("sort") ||
    "default";

  const requestedPage = Number(
    searchParams.get("page") || 1
  );

  const page =
    Number.isFinite(requestedPage) &&
    requestedPage > 0
      ? requestedPage
      : 1;

  const activeCategory =
    routeCategory?.slug || "";

  const availableSubcategories =
    routeCategory?.subcategories || [];

  const filteredProducts =
    useMemo(() => {
      if (categoryIsInvalid) {
        return [];
      }

      return filterCatalogueProducts({
        products: catalogueProducts,
        categorySlug:
          activeCategory || null,
        search,
        type,
      });
    }, [
      activeCategory,
      catalogueProducts,
      search,
      type,
      categoryIsInvalid,
    ]);

  const sortedProducts =
    useMemo(
      () =>
        sortCatalogueProducts(
          filteredProducts,
          sort
        ),
      [filteredProducts, sort]
    );

  const pagination =
    useMemo(
      () =>
        paginateCatalogueProducts({
          products: sortedProducts,
          page,
          perPage:
            PRODUCTS_PER_PAGE,
        }),
      [sortedProducts, page]
    );

  useEffect(() => {
    if (
      page !== pagination.page
    ) {
      const next =
        new URLSearchParams(
          searchParams
        );

      if (pagination.page <= 1) {
        next.delete("page");
      } else {
        next.set(
          "page",
          String(pagination.page)
        );
      }

      setSearchParams(next, {
        replace: true,
      });
    }
  }, [
    page,
    pagination.page,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    if (
      type &&
      routeCategory &&
      !routeCategory.subcategories.some(
        (subcategory) =>
          subcategory.slug === type
      )
    ) {
      const next =
        new URLSearchParams(
          searchParams
        );

      next.delete("type");
      next.delete("page");

      setSearchParams(next, {
        replace: true,
      });
    }
  }, [
    type,
    routeCategory,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    if (!mobileFiltersOpen) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileFiltersOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [mobileFiltersOpen]);

  const updateParam = (
    key,
    value
  ) => {
    const next =
      new URLSearchParams(
        searchParams
      );

    if (
      value === undefined ||
      value === null ||
      value === "" ||
      value === "default"
    ) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    if (key !== "page") {
      next.delete("page");
    }

    setSearchParams(next);
  };

  const handleCategoryChange = (
    nextCategorySlug
  ) => {
    const next =
      new URLSearchParams(
        searchParams
      );

    next.delete("type");
    next.delete("page");

    const query =
      next.toString();

    if (!nextCategorySlug) {
      navigate(
        query
          ? `/products?${query}`
          : "/products"
      );

      setMobileFiltersOpen(false);

      return;
    }

    navigate(
      query
        ? `/products/${nextCategorySlug}?${query}`
        : `/products/${nextCategorySlug}`
    );

    setMobileFiltersOpen(false);
  };

  const handleTypeChange = (
    nextType
  ) => {
    updateParam(
      "type",
      nextType || null
    );

    setMobileFiltersOpen(false);
  };

  const handleClearFilters = () => {
    const next =
      new URLSearchParams(
        searchParams
      );

    next.delete("type");
    next.delete("page");

    setSearchParams(next);
  };

  const handleClearAll = () => {
    setSearchParams({});

    if (categorySlug) {
      navigate("/products");
    }

    setMobileFiltersOpen(false);
  };

  const handlePageChange = (
    nextPage
  ) => {
    updateParam(
      "page",
      nextPage <= 1
        ? null
        : String(nextPage)
    );

    window.scrollTo({
      top: 430,
      behavior: "smooth",
    });
  };

  const hasActiveFilters =
    Boolean(search) ||
    Boolean(type) ||
    Boolean(categorySlug) ||
    sort !== "default";

  if (categoryIsInvalid) {
    return (
      <section className="ael-invalid-category">
        <Container>
          <div className="ael-invalid-category__card">
            <span>
              Product Catalogue
            </span>

            <h1>
              Category not found.
            </h1>

            <p>
              The requested product
              category does not exist in
              the current catalogue.
            </p>

            <Link to="/products">
              Browse All Products

              <ArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      <CatalogueHero
        category={routeCategory}
        totalProducts={
          activeCategory
            ? catalogueProducts.filter(
                (product) =>
                  product.categorySlug ===
                  activeCategory
              ).length
            : catalogueProducts.length
        }
      />

      <section className="ael-catalogue-categories">
        <Container>
          <div className="ael-catalogue-category-nav">
            <button
              type="button"
              className={
                !activeCategory
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                handleCategoryChange(null)
              }
            >
              All Products
            </button>

            {catalogueCategories.map(
              (category) => (
                <button
                  type="button"
                  key={category.slug}
                  className={
                    activeCategory ===
                    category.slug
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    handleCategoryChange(
                      category.slug
                    )
                  }
                >
                  {category.shortName}
                </button>
              )
            )}
          </div>
        </Container>
      </section>

      <section className="ael-section ael-products-page">
        <Container>
          <div className="ael-products-layout">
            <ProductFilters
              categories={catalogueCategories}
              activeCategory={
                activeCategory
              }
              activeType={type}
              availableSubcategories={
                availableSubcategories
              }
              onCategoryChange={
                handleCategoryChange
              }
              onTypeChange={
                handleTypeChange
              }
              onClear={
                handleClearFilters
              }
              mobileOpen={
                mobileFiltersOpen
              }
              onMobileClose={() =>
                setMobileFiltersOpen(
                  false
                )
              }
            />

            <div className="ael-products-content">
              <ProductToolbar
                search={search}
                onSearchChange={(
                  value
                ) =>
                  updateParam(
                    "search",
                    value
                  )
                }
                sort={sort}
                onSortChange={(
                  value
                ) =>
                  updateParam(
                    "sort",
                    value
                  )
                }
                resultCount={
                  filteredProducts.length
                }
                onOpenFilters={() =>
                  setMobileFiltersOpen(
                    true
                  )
                }
                hasActiveFilters={
                  hasActiveFilters
                }
                onClearAll={
                  handleClearAll
                }
              />

              {search && (
                <div className="ael-products-search-context">
                  Search results for:

                  <strong>
                    “{search}”
                  </strong>
                </div>
              )}

              {type &&
                routeCategory && (
                  <div className="ael-products-active-filter">
                    Showing:

                    <strong>
                      {
                        routeCategory.subcategories.find(
                          (
                            subcategory
                          ) =>
                            subcategory.slug ===
                            type
                        )?.name
                      }
                    </strong>

                    <button
                      type="button"
                      onClick={() =>
                        handleTypeChange(
                          null
                        )
                      }
                    >
                      Clear
                    </button>
                  </div>
                )}

              {pagination.items
                .length > 0 ? (
                <>
                  <div className="ael-products-grid">
                    {pagination.items.map(
                      (product) => (
                        <ProductCard
                          key={
                            product.id
                          }
                          product={
                            product
                          }
                        />
                      )
                    )}
                  </div>

                  <div className="ael-products-pagination-wrap">
                    <ProductPagination
                      page={
                        pagination.page
                      }
                      totalPages={
                        pagination.totalPages
                      }
                      onPageChange={
                        handlePageChange
                      }
                    />

                    <div className="ael-products-pagination-info">
                      Showing{" "}
                      <strong>
                        {pagination.totalItems ===
                        0
                          ? 0
                          : (pagination.page -
                              1) *
                              pagination.perPage +
                            1}
                      </strong>

                      {" – "}

                      <strong>
                        {Math.min(
                          pagination.page *
                            pagination.perPage,
                          pagination.totalItems
                        )}
                      </strong>

                      {" of "}

                      <strong>
                        {
                          pagination.totalItems
                        }
                      </strong>
                    </div>
                  </div>
                </>
              ) : (
                <CatalogueEmptyState
                  onReset={
                    handleClearAll
                  }
                />
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="ael-catalogue-note">
        <Container>
          <div className="ael-catalogue-note__inner">
            <div>
              <span>
                Catalogue Information
              </span>

              <h2>
                Need specifications,
                quantity information or
                custom requirements?
              </h2>

              <p>
                Product specifications,
                MOQ, available variations,
                packaging and
                customisation should be
                confirmed according to
                the actual buyer
                requirement.
              </p>
            </div>

            <Link
              to="/request-a-quote"
            >
              Send Product Requirement

              <ArrowRight size={17} />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Products;
