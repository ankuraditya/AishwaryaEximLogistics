import { Link } from "react-router-dom";

const Button = ({
  children,
  to,
  href,
  variant = "primary",
  size = "default",
  type = "button",
  className = "",
  onClick,
  target,
  rel,
  ...props
}) => {
  const classes = [
    "ael-btn",
    `ael-btn--${variant}`,
    size !== "default" ? `ael-btn--${size}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link
        to={to}
        className={classes}
        {...props}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={target}
        rel={rel}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;