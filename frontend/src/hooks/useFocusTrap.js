import {
  useEffect,
} from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const useFocusTrap = (
  containerRef,
  active,
  options = {}
) => {
  const {
    initialFocusRef,
  } = options;

  useEffect(() => {
    if (
      !active ||
      !containerRef.current
    ) {
      return undefined;
    }

    const container =
      containerRef.current;

    const previouslyFocused =
      document.activeElement;

    const focusables =
      Array.from(
        container.querySelectorAll(
          focusableSelector
        )
      );

    const first =
      initialFocusRef?.current ||
      focusables[0];

    const last =
      focusables[
        focusables.length - 1
      ];

    const focusTimer =
      window.setTimeout(
        () => {
          first?.focus();
        },
        0
      );

    const handleKeydown = (
      event
    ) => {
      if (
        event.key !== "Tab" ||
        focusables.length === 0
      ) {
        return;
      }

      if (
        event.shiftKey &&
        document.activeElement ===
          first
      ) {
        event.preventDefault();

        last?.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement ===
          last
      ) {
        event.preventDefault();

        first?.focus();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeydown
    );

    return () => {
      window.clearTimeout(
        focusTimer
      );

      document.removeEventListener(
        "keydown",
        handleKeydown
      );

      if (
        previouslyFocused instanceof
        HTMLElement
      ) {
        previouslyFocused.focus();
      }
    };
  }, [
    active,
    containerRef,
    initialFocusRef,
  ]);
};

export default useFocusTrap;