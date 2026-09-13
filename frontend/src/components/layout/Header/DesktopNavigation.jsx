import { useState } from "react";

import {
  ChevronDown,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import { mainNavigation } from "../../../data/navigation";

import ProductsMegaMenu from "./ProductsMegaMenu";

const DesktopNavigation = () => {
  const location = useLocation();

  const [productsOpen, setProductsOpen] =
    useState(false);

  const productsNavigation =
    mainNavigation.find(
      (item) => item.label === "Products"
    );

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleMegaMenuClose = () => {
    setProductsOpen(false);
  };

  return (
    <nav
      className="ael-desktop-nav"
      aria-label="Primary navigation"
    >
      <ul className="ael-desktop-nav__list">
        {mainNavigation.map((item) => {
          if (item.megaMenu) {
            const productsActive =
              location.pathname.startsWith(
                "/products"
              );

            return (
              <li
                key={item.label}
                className={[
                  "ael-desktop-nav__item",
                  "ael-desktop-nav__item--mega",
                  productsOpen
                    ? "is-open"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter={() =>
                  setProductsOpen(true)
                }
                onMouseLeave={() =>
                  setProductsOpen(false)
                }
              >
                <button
                  type="button"
                  className={[
                    "ael-desktop-nav__link",
                    productsActive
                      ? "is-active"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                  onClick={() =>
                    setProductsOpen(
                      (previous) => !previous
                    )
                  }
                >
                  Products

                  <ChevronDown
                    size={15}
                    className="ael-desktop-nav__chevron"
                  />
                </button>

                <ProductsMegaMenu
                  categories={
                    productsNavigation?.categories || []
                  }
                  onNavigate={handleMegaMenuClose}
                />
              </li>
            );
          }

          return (
            <li
              key={item.path}
              className="ael-desktop-nav__item"
            >
              <Link
                to={item.path}
                className={[
                  "ael-desktop-nav__link",
                  isActive(item.path)
                    ? "is-active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopNavigation;