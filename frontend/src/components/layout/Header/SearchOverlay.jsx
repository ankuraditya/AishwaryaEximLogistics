import {
  Search,
  X,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Container from "../../common/Container";

import useFocusTrap from "../../../hooks/useFocusTrap";

const SearchOverlay = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();

  const panelRef =
    useRef(null);

  const inputRef =
    useRef(null);

  const [
    query,
    setQuery,
  ] = useState("");

  useFocusTrap(
    panelRef,
    open,
    {
      initialFocusRef:
        inputRef,
    }
  );

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
        onClose();
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
  }, [
    open,
    onClose,
  ]);

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    const cleanedQuery =
      query.trim();

    if (!cleanedQuery) {
      return;
    }

    navigate(
      `/products?search=${encodeURIComponent(
        cleanedQuery
      )}`
    );

    setQuery("");
    onClose();
  };

  const handleCategoryNavigate =
    () => {
      setQuery("");
      onClose();
    };

  if (!open) {
    return null;
  }

  return (
    <div
      className="ael-search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Website search"
    >
      <button
        type="button"
        className="ael-search-overlay__backdrop"
        aria-label="Close search"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className="ael-search-overlay__panel"
      >
        <Container>
          <div className="ael-search-overlay__top">
            <div>
              <span>
                Search Aishwary
              </span>

              <h2>
                What are you looking
                for?
              </h2>
            </div>

            <button
              type="button"
              className="ael-search-overlay__close"
              onClick={onClose}
              aria-label="Close search"
            >
              <X size={22} />
            </button>
          </div>

          <form
            className="ael-search-overlay__form"
            onSubmit={
              handleSubmit
            }
          >
            <Search
              size={24}
              aria-hidden="true"
            />

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(
                event
              ) =>
                setQuery(
                  event.target
                    .value
                )
              }
              placeholder="Search products, handicrafts, bags, packaging, jeans..."
              aria-label="Search products"
            />

            <button
              type="submit"
            >
              Search
            </button>
          </form>

          <div className="ael-search-overlay__popular">
            <span className="ael-search-overlay__popular-label">
              Browse Categories
            </span>

            <div className="ael-search-overlay__category-links">
              <Link
                to="/products/handicrafts"
                onClick={
                  handleCategoryNavigate
                }
              >
                Handicrafts
              </Link>

              <Link
                to="/products/biodegradable-food-packaging"
                onClick={
                  handleCategoryNavigate
                }
              >
                Biodegradable
                Packaging
              </Link>

              <Link
                to="/products/leather-purses-bags"
                onClick={
                  handleCategoryNavigate
                }
              >
                Leather Bags
              </Link>

              <Link
                to="/products/garments-jeans"
                onClick={
                  handleCategoryNavigate
                }
              >
                Garments & Jeans
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default SearchOverlay;