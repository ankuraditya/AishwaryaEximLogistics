import {
  LoaderCircle,
} from "lucide-react";

const PageLoader = () => {
  return (
    <div
      className="ael-page-loader"
      role="status"
      aria-live="polite"
    >
      <LoaderCircle
        size={28}
        className="ael-spin"
        aria-hidden="true"
      />

      <span>
        Loading page...
      </span>
    </div>
  );
};

export default PageLoader;