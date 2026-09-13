const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = "text",
  placeholder = "",
  options = [],
  textarea = false,
  disabled = false,
  readOnly = false,
  autoComplete,
}) => {
  const inputId =
    `ael-field-${name}`;

  return (
    <div
      className={[
        "ael-form-field",
        error
          ? "has-error"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <label htmlFor={inputId}>
        {label}

        {required && (
          <span
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      {textarea ? (
        <textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={
            placeholder
          }
          rows={5}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={
            Boolean(error)
          }
          aria-describedby={
            error
              ? `${inputId}-error`
              : undefined
          }
        />
      ) : type === "select" ? (
        <select
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={
            Boolean(error)
          }
          aria-describedby={
            error
              ? `${inputId}-error`
              : undefined
          }
        >
          {options.map(
            (option) => (
              <option
                key={
                  option.value
                }
                value={
                  option.value
                }
              >
                {
                  option.label
                }
              </option>
            )
          )}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={
            placeholder
          }
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={
            autoComplete
          }
          aria-invalid={
            Boolean(error)
          }
          aria-describedby={
            error
              ? `${inputId}-error`
              : undefined
          }
        />
      )}

      {error && (
        <small
          id={`${inputId}-error`}
          className="ael-form-field__error"
        >
          {error}
        </small>
      )}
    </div>
  );
};

export default FormField;