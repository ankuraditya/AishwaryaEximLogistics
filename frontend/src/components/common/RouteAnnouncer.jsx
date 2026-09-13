import {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
} from "react-router-dom";

const RouteAnnouncer = () => {
  const location =
    useLocation();

  const [
    announcement,
    setAnnouncement,
  ] = useState("");

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        const heading =
          document.querySelector(
            "main h1"
          );

        const text =
          heading?.textContent
            ?.trim() ||
          document.title;

        setAnnouncement(
          text
        );

        const main =
          document.getElementById(
            "main-content"
          );

        main?.focus({
          preventScroll: true,
        });
      }, 0);

    return () =>
      window.clearTimeout(
        timer
      );
  }, [
    location.pathname,
  ]);

  return (
    <div
      className="ael-route-announcer"
      aria-live="polite"
      aria-atomic="true"
    >
      {announcement}
    </div>
  );
};

export default RouteAnnouncer;