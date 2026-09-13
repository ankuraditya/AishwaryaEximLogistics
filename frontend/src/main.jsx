import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import ErrorBoundary from "./components/common/ErrorBoundary";

import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/typography.css";
import "./styles/global.css";
import "./styles/utilities.css";
import "./styles/components.css";
import "./styles/page-polish.css";

createRoot(
  document.getElementById("root")
).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
