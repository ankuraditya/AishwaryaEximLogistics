import { Globe2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../../common/Container";

const TopBar = () => {
  return (
    <div className="ael-topbar">
      <Container className="ael-topbar__container">
        <div className="ael-topbar__left">
          <div className="ael-topbar__item">
            <MapPin size={14} />

            <span>Bihar, India</span>
          </div>

          <div className="ael-topbar__divider" />

          <div className="ael-topbar__item">
            <Globe2 size={14} />

            <span>Connecting Bihar, India to the World</span>
          </div>
        </div>

        <div className="ael-topbar__right">
          <Link to="/quality-compliance">
            Quality & Compliance
          </Link>

          <Link to="/global-reach">
            Global Reach
          </Link>

          <Link
            to="/request-a-quote"
            className="ael-topbar__quote"
          >
            Export Enquiry
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default TopBar;