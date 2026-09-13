import {
  ArrowRight,
  ChevronDown,
  Globe2,
  X,
} from "lucide-react";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { mainNavigation } from "../../../data/navigation";

import logo from "../../../assets/images/brand/aishwarya-logo.png";

import useFocusTrap from "../../../hooks/useFocusTrap";
import { useWebsiteSettings } from "../../../hooks/useWebsiteSettings";

const MobileMenu = ({
  open,
  onClose,
}) => {
  const companyInfo = useWebsiteSettings();
  const location = useLocation();

  const drawerRef =
    useRef(null);

  const [
    productsExpanded,
    setProductsExpanded,
  ] = useState(false);

  const [
    openCategory,
    setOpenCategory,
  ] = useState(null);

  const productsNavigation =
    mainNavigation.find(
      (item) =>
        item.label === "Products"
    );

  const handleClose =
    useCallback(() => {
      setProductsExpanded(false);
      setOpenCategory(null);
      onClose();
    }, [onClose]);

  useFocusTrap(
    drawerRef,
    open
  );

  // Lock body scroll while the mobile
  // navigation is open and allow ESC
  // to close the drawer.
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
        handleClose();
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
    handleClose,
  ]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="ael-mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        type="button"
        className="ael-mobile-menu__backdrop"
        onClick={handleClose}
        aria-label="Close navigation"
      />

      <div
        ref={drawerRef}
        className="ael-mobile-menu__drawer"
      >
        <div className="ael-mobile-menu__header">
          <Link
            to="/"
            className="ael-mobile-menu__logo"
            onClick={handleClose}
          >
            <img
              src={companyInfo.branding?.logo || logo}
              alt="Aishwary Exim & Logistics"
            />
          </Link>

          <button
            type="button"
            className="ael-mobile-menu__close"
            onClick={handleClose}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="ael-mobile-menu__body">
          <nav aria-label="Mobile navigation">
            <ul className="ael-mobile-menu__links">
              {mainNavigation.map(
                (item) => {
                  if (
                    item.megaMenu
                  ) {
                    return (
                      <li
                        key={
                          item.label
                        }
                        className="ael-mobile-menu__products"
                      >
                        <div className="ael-mobile-menu__link-row">
                          <Link
                            to="/products"
                            onClick={
                              handleClose
                            }
                          >
                            Products
                          </Link>

                          <button
                            type="button"
                            aria-label="Toggle product categories"
                            aria-expanded={
                              productsExpanded
                            }
                            onClick={() =>
                              setProductsExpanded(
                                (
                                  previous
                                ) =>
                                  !previous
                              )
                            }
                          >
                            <ChevronDown
                              size={
                                18
                              }
                              className={
                                productsExpanded
                                  ? "is-rotated"
                                  : ""
                              }
                            />
                          </button>
                        </div>

                        {productsExpanded && (
                          <div className="ael-mobile-menu__product-categories">
                            {productsNavigation?.categories?.map(
                              (
                                category
                              ) => {
                                const expanded =
                                  openCategory ===
                                  category.slug;

                                return (
                                  <div
                                    key={
                                      category.slug
                                    }
                                    className="ael-mobile-menu__category"
                                  >
                                    <div className="ael-mobile-menu__category-heading">
                                      <Link
                                        to={
                                          category.path
                                        }
                                        onClick={
                                          handleClose
                                        }
                                      >
                                        {
                                          category.title
                                        }
                                      </Link>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          setOpenCategory(
                                            expanded
                                              ? null
                                              : category.slug
                                          )
                                        }
                                        aria-expanded={
                                          expanded
                                        }
                                        aria-label={`Toggle ${category.title}`}
                                      >
                                        <ChevronDown
                                          size={
                                            17
                                          }
                                          className={
                                            expanded
                                              ? "is-rotated"
                                              : ""
                                          }
                                        />
                                      </button>
                                    </div>

                                    {expanded && (
                                      <ul className="ael-mobile-menu__subcategory-list">
                                        {category.items?.map(
                                          (
                                            productItem
                                          ) => (
                                            <li
                                              key={
                                                productItem.path
                                              }
                                            >
                                              <Link
                                                to={
                                                  productItem.path
                                                }
                                                onClick={
                                                  handleClose
                                                }
                                              >
                                                {
                                                  productItem.label
                                                }
                                              </Link>
                                            </li>
                                          )
                                        )}

                                        <li>
                                          <Link
                                            to={
                                              category.path
                                            }
                                            onClick={
                                              handleClose
                                            }
                                            className="ael-mobile-menu__view-category"
                                          >
                                            View
                                            All

                                            <ArrowRight
                                              size={
                                                14
                                              }
                                            />
                                          </Link>
                                        </li>
                                      </ul>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </li>
                    );
                  }

                  return (
                    <li
                      key={
                        item.path
                      }
                    >
                      <Link
                        to={
                          item.path
                        }
                        onClick={
                          handleClose
                        }
                        className={
                          location.pathname ===
                            item.path ||
                          (
                            item.path !==
                              "/" &&
                            location.pathname.startsWith(
                              item.path
                            )
                          )
                            ? "is-active"
                            : ""
                        }
                      >
                        {
                          item.label
                        }
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
          </nav>

          <div className="ael-mobile-menu__secondary">
            <Link
              to="/quality-compliance"
              onClick={handleClose}
            >
              Quality & Compliance
            </Link>

            <Link
              to="/global-reach"
              onClick={handleClose}
            >
              Global Reach
            </Link>
          </div>
        </div>

        <div className="ael-mobile-menu__footer">
          <div className="ael-mobile-menu__global">
            <Globe2
              size={18}
            />

            <span>
              Connecting Bihar,
              India to the World
            </span>
          </div>

          <Link
            to="/request-a-quote"
            className="ael-mobile-menu__quote"
            onClick={handleClose}
          >
            Request a Quote

            <ArrowRight
              size={17}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
