import {
  Outlet,
} from "react-router-dom";

import Header from "../components/layout/Header/Header";
import Footer from "../components/layout/Footer/Footer";

import ScrollToTop from "../components/common/ScrollToTop";
import SkipLink from "../components/common/SkipLink";
import RouteAnnouncer from "../components/common/RouteAnnouncer";
import RouteSeo from "../components/common/RouteSeo";
import FloatingWhatsapp from "../components/common/FloatingWhatsapp";

const MainLayout = () => {
  return (
    <>
      <SkipLink />

      <RouteSeo />

      <RouteAnnouncer />

      <ScrollToTop />

      <Header />

      <main
        id="main-content"
        tabIndex="-1"
      >
        <Outlet />
      </main>

      <Footer />

      <FloatingWhatsapp />
    </>
  );
};

export default MainLayout;
