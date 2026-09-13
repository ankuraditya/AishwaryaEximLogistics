import {
  lazy,
  Suspense,
} from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import PageLoader from "../components/common/PageLoader";

const Home = lazy(
  () =>
    import(
      "../pages/Home/Home"
    )
);

const About = lazy(
  () =>
    import(
      "../pages/About/About"
    )
);

const Products = lazy(
  () =>
    import(
      "../pages/Products/Products"
    )
);

const ProductDetails = lazy(
  () =>
    import(
      "../pages/ProductDetails/ProductDetails"
    )
);

const HandicraftsGallery =
  lazy(
    () =>
      import(
        "../pages/HandicraftsGallery/HandicraftsGallery"
      )
  );

const ExportLogistics =
  lazy(
    () =>
      import(
        "../pages/ExportLogistics/ExportLogistics"
      )
  );

const QualityCompliance =
  lazy(
    () =>
      import(
        "../pages/QualityCompliance/QualityCompliance"
      )
  );

const GlobalReach = lazy(
  () =>
    import(
      "../pages/GlobalReach/GlobalReach"
    )
);

const Gallery = lazy(
  () =>
    import(
      "../pages/Gallery/Gallery"
    )
);

const Blog = lazy(
  () =>
    import(
      "../pages/Blog/Blog"
    )
);

const BlogDetails = lazy(
  () =>
    import(
      "../pages/Blog/BlogDetails"
    )
);

const Contact = lazy(
  () =>
    import(
      "../pages/Contact/Contact"
    )
);

const RequestQuote = lazy(
  () =>
    import(
      "../pages/RequestQuote/RequestQuote"
    )
);

const LegalPage = lazy(
  () =>
    import(
      "../pages/Legal/LegalPage"
    )
);

const NotFound = lazy(
  () =>
    import(
      "../pages/NotFound/NotFound"
    )
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "about-us",
        element: <About />,
      },

      {
        path: "products",
        element: <Products />,
      },

      {
        path: "products/:categorySlug",
        element: <Products />,
      },

      {
        path: "products/:categorySlug/:productSlug",
        element: <ProductDetails />,
      },

      {
        path: "handicrafts-gallery",
        element: <HandicraftsGallery />,
      },

      {
        path: "export-logistics",
        element: <ExportLogistics />,
      },

      {
        path: "quality-compliance",
        element: <QualityCompliance />,
      },

      {
        path: "global-reach",
        element: <GlobalReach />,
      },

      {
        path: "gallery",
        element: <Gallery />,
      },

      {
        path: "blog",
        element: <Blog />,
      },

      {
        path: "blog/:slug",
        element: <BlogDetails />,
      },

      {
        path: "contact-us",
        element: <Contact />,
      },

      {
        path: "request-a-quote",
        element: <RequestQuote />,
      },

      {
        path: "privacy-policy",
        element: <LegalPage />,
      },

      {
        path: "terms-and-conditions",
        element: <LegalPage />,
      },

      {
        path: "disclaimer",
        element: <LegalPage />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const AppRoutes = () => (
  <Suspense
    fallback={
      <PageLoader />
    }
  >
    <RouterProvider
      router={router}
    />
  </Suspense>
);

export default AppRoutes;