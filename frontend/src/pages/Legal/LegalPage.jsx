import {
  ArrowRight,
  FileText,
  ShieldCheck,
} from "lucide-react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import Breadcrumb from "../../components/common/Breadcrumb";
import Container from "../../components/common/Container";
import LegalDocument from "../../components/legal/LegalDocument";

import {
  legalPages,
} from "../../data/legal";

import "./legal.css";

const LegalPage = () => {
  const { pathname } =
    useLocation();

  const slug =
    pathname.replace(
      /^\//,
      ""
    );

  const page =
    legalPages[slug];

  if (!page) {
    return null;
  }

  return (
    <>
      <section className="ael-legal-hero">
        <Container>
          <div className="ael-legal-hero__content">
            <span>
              <FileText
                size={16}
              />

              {page.eyebrow}
            </span>

            <h1>
              {page.title}
            </h1>

            <p>
              {page.intro}
            </p>

            <small>
              Last updated:{" "}
              {page.lastUpdated}
            </small>
          </div>
        </Container>
      </section>

      <section className="ael-legal-breadcrumb">
        <Container>
          <Breadcrumb
            items={[
              {
                label:
                  page.title,
              },
            ]}
          />
        </Container>
      </section>

      <section className="ael-section ael-legal-page">
        <Container>
          <div className="ael-legal-page__layout">
            <LegalDocument
              sections={
                page.sections
              }
            />

            <aside className="ael-legal-page__aside">
              <ShieldCheck
                size={25}
              />

              <h2>
                Need clarification?
              </h2>

              <p>
                Contact the company
                regarding website,
                enquiry or business
                information.
              </p>

              <Link to="/contact-us">
                Contact Us

                <ArrowRight
                  size={15}
                />
              </Link>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
};

export default LegalPage;