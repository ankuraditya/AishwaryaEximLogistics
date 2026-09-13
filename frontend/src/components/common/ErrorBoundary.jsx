import {
  Component,
} from "react";

import {
  AlertTriangle,
} from "lucide-react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(
    error,
    info
  ) {
    if (
      import.meta.env.DEV
    ) {
      console.error(
        "Application error:",
        error,
        info
      );
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (
      this.state.hasError
    ) {
      return (
        <div className="ael-error-boundary">
          <span>
            <AlertTriangle
              size={35}
            />
          </span>

          <h1>
            Something went wrong.
          </h1>

          <p>
            The page encountered an
            unexpected frontend error.
            Please reload and try
            again.
          </p>

          <button
            type="button"
            onClick={
              this.handleReload
            }
          >
            Reload Website
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;