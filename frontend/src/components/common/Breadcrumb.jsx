import {
  ChevronRight,
  Home,
} from "lucide-react";

import { Link } from "react-router-dom";

const Breadcrumb = ({
  items = [],
  className = "",
}) => {
  return (
    <nav
      className={[
        "ael-breadcrumb",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Breadcrumb"
    >
      <ol>
        <li>
          <Link
            to="/"
            aria-label="Home"
          >
            <Home size={14} />

            <span>Home</span>
          </Link>
        </li>

        {items.map(
          (item, index) => {
            const isLast =
              index ===
              items.length - 1;

            return (
              <li key={`${item.label}-${index}`}>
                <ChevronRight
                  size={13}
                  aria-hidden="true"
                />

                {item.to &&
                !isLast ? (
                  <Link to={item.to}>
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={
                      isLast
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          }
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;