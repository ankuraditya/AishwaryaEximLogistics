import {
  ArrowUpRight,
} from "lucide-react";

import { Link } from "react-router-dom";

const FooterNavigation = ({
  title,
  links = [],
}) => {
  return (
    <div className="ael-footer-column">
      <h3 className="ael-footer-column__title">
        {title}
      </h3>

      <ul className="ael-footer-links">
        {links.map((item) => (
          <li key={`${item.label}-${item.path}`}>
            <Link to={item.path}>
              <span>{item.label}</span>

              <ArrowUpRight
                size={13}
                aria-hidden="true"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterNavigation;