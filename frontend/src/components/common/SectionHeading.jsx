const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}) => {
  return (
    <div
      className={[
        "ael-section-heading",
        align === "center"
          ? "ael-section-heading--center"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <div className="ael-section-heading__eyebrow">
          {eyebrow}
        </div>
      )}

      {title && (
        <h2 className="ael-section-heading__title">
          {title}
        </h2>
      )}

      {description && (
        <p className="ael-section-heading__description">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;