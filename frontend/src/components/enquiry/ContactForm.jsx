import {
  LoaderCircle,
  Send,
} from "lucide-react";

import {
  useState,
} from "react";

import FormField from "./FormField";
import EnquirySuccess from "./EnquirySuccess";

import {
  buildContactPayload,
  mapApiValidationErrors,
  validateContactForm,
} from "../../utils/enquiry";

import {
  submitContactEnquiry,
} from "../../services/enquiryService";

const initialValues = {
  fullName: "",
  companyName: "",
  country: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  consent: false,
};

const ContactForm = () => {
  const [
    values,
    setValues,
  ] = useState(initialValues);

  const [
    errors,
    setErrors,
  ] = useState({});

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    result,
    setResult,
  ] = useState(null);

  const [
    submitError,
    setSubmitError,
  ] = useState("");

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setValues(
      (current) => ({
        ...current,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );

    setErrors(
      (current) => ({
        ...current,
        [name]: undefined,
      })
    );
  };

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setSubmitError("");

      const validationErrors =
        validateContactForm(
          values
        );

      if (
        Object.keys(
          validationErrors
        ).length
      ) {
        setErrors(
          validationErrors
        );

        window.setTimeout(() => {
          const firstError =
            document.querySelector(
              ".ael-contact-form .ael-form-field.has-error input, .ael-contact-form .ael-form-field.has-error textarea, .ael-contact-form .ael-form-field.has-error select"
            );

          firstError?.focus();
        }, 0);

        return;
      }

      setErrors({});
      setSubmitting(true);

      try {
        const response =
          await submitContactEnquiry(
            buildContactPayload(
              values
            )
          );

        setResult(response);
      } catch (error) {
        setSubmitError(
          error.message ||
            "Unable to submit your message."
        );

        if (
          error.validationErrors
        ) {
          setErrors(
            mapApiValidationErrors(
              error.validationErrors
            )
          );
        }
      } finally {
        setSubmitting(false);
      }
    };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setResult(null);
    setSubmitError("");
  };

  if (result) {
    return (
      <EnquirySuccess
        title="Contact Form Completed"
        result={result}
        onReset={reset}
      />
    );
  }

  return (
    <form
      className="ael-contact-form"
      aria-busy={submitting}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="ael-contact-form__grid">
        <FormField
          label="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
          autoComplete="name"
          placeholder="Your name"
        />

        <FormField
          label="Company / Organisation"
          name="companyName"
          value={
            values.companyName
          }
          onChange={handleChange}
          error={
            errors.companyName
          }
          autoComplete="organization"
          placeholder="Optional"
        />

        <FormField
          label="Country"
          name="country"
          value={values.country}
          onChange={handleChange}
          error={errors.country}
          placeholder="Your country"
        />

        <FormField
          label="Email Address"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          required
          autoComplete="email"
          placeholder="name@company.com"
        />

        <FormField
          label="Phone Number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          error={errors.phone}
          autoComplete="tel"
          placeholder="+91..."
        />

        <FormField
          label="Subject"
          name="subject"
          value={values.subject}
          onChange={handleChange}
          error={errors.subject}
          required
          placeholder="What would you like to discuss?"
        />
      </div>

      <FormField
        label="Message"
        name="message"
        value={values.message}
        onChange={handleChange}
        error={errors.message}
        required
        textarea
        placeholder="Tell us how we can help."
      />

      <label
        className={[
          "ael-enquiry-consent",
          errors.consent
            ? "has-error"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <input
          type="checkbox"
          name="consent"
          checked={
            values.consent
          }
          onChange={handleChange}
        />

        <span>
          I agree that Aishwary Exim
          & Logistics may contact me
          regarding this enquiry.
        </span>
      </label>

      {errors.consent && (
        <small className="ael-form-field__error">
          {errors.consent}
        </small>
      )}

      {submitError && (
        <div
          className="ael-enquiry-form__submit-error"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <button
        type="submit"
        className="ael-contact-form__submit"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <LoaderCircle
              size={17}
              className="ael-spin"
            />

            Processing...
          </>
        ) : (
          <>
            Send Message

            <Send size={17} />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;