import {
  Menu,
  Search,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import logo from "../../../assets/images/brand/aishwarya-logo.png";
import { useWebsiteSettings } from "../../../hooks/useWebsiteSettings";

import Button from "../../common/Button";
import Container from "../../common/Container";

import DesktopNavigation from "./DesktopNavigation";
import MobileMenu from "./MobileMenu";
import SearchOverlay from "./SearchOverlay";
import TopBar from "./TopBar";

import "./header.css";

const Header = () => {
  const companyInfo = useWebsiteSettings();
  const [isScrolled, setIsScrolled] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <>
      <header
        className={[
          "ael-site-header",
          isScrolled ? "is-scrolled" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <TopBar />

        <div className="ael-main-header">
          <Container className="ael-main-header__container">
            <Link
              to="/"
              className="ael-header-logo"
              aria-label="Aishwary Exim & Logistics home"
            >
              <img
                src={companyInfo.branding?.logo || logo}
                alt={companyInfo.name}
              />
            </Link>

            <DesktopNavigation />

            <div className="ael-header-actions">
              <button
                type="button"
                className="ael-header-search"
                onClick={() =>
                  setSearchOpen(true)
                }
                aria-label="Search website"
              >
                <Search size={20} />
              </button>

              <Button
                to="/request-a-quote"
                variant="secondary"
                className="ael-header-quote"
              >
                Request a Quote
              </Button>
            </div>

            <div className="ael-header-mobile-actions">
              <button
                type="button"
                className="ael-header-mobile-search"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                aria-label="Search website"
              >
                <Search size={20} />
              </button>

              <button
                type="button"
                className="ael-header-menu-trigger"
                onClick={() => {
                  setSearchOpen(false);
                  setMobileOpen(true);
                }}
                aria-label="Open navigation"
              >
                <Menu size={23} />
              </button>
            </div>
          </Container>
        </div>
      </header>

      <SearchOverlay
        open={searchOpen}
        onClose={() =>
          setSearchOpen(false)
        }
      />

      <MobileMenu
        open={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
      />
    </>
  );
};

export default Header;
