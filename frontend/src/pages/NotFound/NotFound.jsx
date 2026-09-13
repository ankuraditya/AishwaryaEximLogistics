import {
  ArrowLeft,
  ArrowRight,
  SearchX,
} from "lucide-react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import Container from "../../components/common/Container";

import "./not-found.css";

const NotFound = () => {
  const navigate =
    useNavigate();

  return (
    <section className="ael-not-found">
      <Container>
        <div className="ael-not-found__card">
          <span className="ael-not-found__icon">
            <SearchX size={43} />
          </span>

          <small>
            Error 404
          </small>

          <h1>
            The page you're looking
            for isn't here.
          </h1>

          <p>
            The address may have
            changed, or the requested
            page may no longer be
            available.
          </p>

          <div className="ael-not-found__actions">
            <button
              type="button"
              onClick={() =>
                navigate(-1)
              }
            >
              <ArrowLeft
                size={16}
              />

              Go Back
            </button>

            <Link to="/">
              Back to Home

              <ArrowRight
                size={16}
              />
            </Link>
          </div>

          <div className="ael-not-found__links">
            <Link to="/products">
              Products
            </Link>

            <Link to="/handicrafts-gallery">
              Handicrafts Gallery
            </Link>

            <Link to="/request-a-quote">
              Request Quote
            </Link>

            <Link to="/contact-us">
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;