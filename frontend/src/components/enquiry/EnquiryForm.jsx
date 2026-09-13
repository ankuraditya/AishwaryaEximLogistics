import {
  FileUp,
  LoaderCircle,
  Send,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  buyerTypeOptions,
  categoryOptions,
  contactPreferenceOptions,
  customisationOptions,
  quantityUnitOptions,
  tradeTermOptions,
} from "../../data/enquiry";

import {
  buildQuotePayload,
  mapApiValidationErrors,
  validateQuoteForm,
} from "../../utils/enquiry";

import {
  submitQuoteRequest,
} from "../../services/enquiryService";

import FormField from "./FormField";
import EnquirySuccess from "./EnquirySuccess";

const createInitialValues = ({
  product,
  galleryItem,
  requestedCategory,
}) => ({
  fullName: "",
  companyName: "",
  buyerType: "",
  country: "",

  email: "",
  phone: "",
  whatsapp: "",

  productCategory:
    product?.categorySlug ||
    (
      galleryItem
        ? "handicrafts"
        : requestedCategory || ""
    ),

  productRequirement:
    product?.name ||
    galleryItem?.title ||
    "",

  estimatedQuantity: "",
  quantityUnit: "",

  destinationCountry: "",
  destinationPort: "",

  preferredTradeTerm: "",

  customisationRequired:
    "",

  packagingRequirement:
    "",

  message: "",

  preferredContact:
    "email",

  consent: false,
});

const EnquiryForm = ({
  product,
  galleryItem,
  requestedCategory,
}) => {
  const initialValues =
    createInitialValues({
      product,
      galleryItem,
      requestedCategory,
    });

  const [
    values,
    setValues,
  ] = useState(initialValues);

  const [
    errors,
    setErrors,
  ] = useState({});

  const [
    attachment,
    setAttachment,
  ] = useState(null);

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

  const handleAttachment =
    (event) => {
      const file =
        event.target
          .files?.[0] || null;

      setAttachment(file);

      setErrors(
        (current) => ({
          ...current,
          attachment: undefined,
        })
      );
    };

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      setSubmitError("");

      const validationErrors =
        validateQuoteForm(
          values,
          attachment
        );

      if (
        Object.keys(
          validationErrors
        ).length > 0
      ) {
        setErrors(
          validationErrors
        );

        const firstErrorField =
          document.querySelector(
            ".ael-form-field.has-error input, .ael-form-field.has-error select, .ael-form-field.has-error textarea"
          );

        firstErrorField?.focus();

        return;
      }

      setErrors({});
      setSubmitting(true);

      try {
        const payload =
          buildQuotePayload({
            values,
            product,
            galleryItem,
            attachment,
          });

        const response =
          await submitQuoteRequest(
            payload
          );

        setResult(response);
      } catch (error) {
        setSubmitError(
          error.message ||
            "Unable to submit the enquiry. Please try again."
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

  const handleReset = () => {
    setValues(
      createInitialValues({
        product,
        galleryItem,
        requestedCategory,
      })
    );

    setAttachment(null);
    setErrors({});
    setResult(null);
    setSubmitError("");
  };

  if (result) {
    return (
      <EnquirySuccess
        title="Enquiry Form Completed"
        result={result}
        onReset={handleReset}
      />
    );
  }

  const lockedReference =
    Boolean(
      product ||
      galleryItem
    );

  return (
    <form
      className="ael-enquiry-form"
      aria-busy={submitting}
      onSubmit={handleSubmit}
      noValidate
    >
      <section className="ael-enquiry-form__section">
        <div className="ael-enquiry-form__section-heading">
          <span>01</span>

          <div>
            <h2>
              Buyer Information
            </h2>

            <p>
              Tell us who is making
              the enquiry.
            </p>
          </div>
        </div>

        <div className="ael-enquiry-form__grid">
          <FormField
            label="Full Name"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            error={errors.fullName}
            required
            placeholder="Your full name"
            autoComplete="name"
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
            required
            placeholder="Company name"
            autoComplete="organization"
          />

          <FormField
            label="Buyer Type"
            name="buyerType"
            type="select"
            value={values.buyerType}
            onChange={handleChange}
            error={errors.buyerType}
            required
            options={
              buyerTypeOptions
            }
          />

          <FormField
            label="Your Country"
            name="country"
            value={values.country}
            onChange={handleChange}
            error={errors.country}
            required
            placeholder="e.g. India, UAE, United Kingdom"
            autoComplete="country-name"
          />

          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            required
            placeholder="name@company.com"
            autoComplete="email"
          />

          <FormField
            label="Phone Number"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            required
            placeholder="+91..."
            autoComplete="tel"
          />

          <FormField
            label="WhatsApp Number"
            name="whatsapp"
            type="tel"
            value={
              values.whatsapp
            }
            onChange={handleChange}
            error={
              errors.whatsapp
            }
            placeholder="Optional"
          />
        </div>
      </section>

      <section className="ael-enquiry-form__section">
        <div className="ael-enquiry-form__section-heading">
          <span>02</span>

          <div>
            <h2>
              Product Requirement
            </h2>

            <p>
              Provide the information
              required to understand
              what you are sourcing.
            </p>
          </div>
        </div>

        <div className="ael-enquiry-form__grid">
          <FormField
            label="Product Category"
            name="productCategory"
            type="select"
            value={
              values.productCategory
            }
            onChange={handleChange}
            error={
              errors.productCategory
            }
            required
            disabled={
              Boolean(product)
            }
            options={
              categoryOptions
            }
          />

          <FormField
            label="Product / Requirement"
            name="productRequirement"
            value={
              values.productRequirement
            }
            onChange={handleChange}
            error={
              errors.productRequirement
            }
            required
            readOnly={
              lockedReference
            }
            placeholder="What product are you looking for?"
          />

          <FormField
            label="Estimated Quantity"
            name="estimatedQuantity"
            value={
              values.estimatedQuantity
            }
            onChange={handleChange}
            error={
              errors.estimatedQuantity
            }
            placeholder="e.g. 500"
          />

          <FormField
            label="Quantity Unit"
            name="quantityUnit"
            type="select"
            value={
              values.quantityUnit
            }
            onChange={handleChange}
            error={
              errors.quantityUnit
            }
            options={
              quantityUnitOptions
            }
          />

          <FormField
            label="Destination Country"
            name="destinationCountry"
            value={
              values.destinationCountry
            }
            onChange={handleChange}
            error={
              errors.destinationCountry
            }
            required
            placeholder="Shipment destination"
          />

          <FormField
            label="Destination Port / City"
            name="destinationPort"
            value={
              values.destinationPort
            }
            onChange={handleChange}
            error={
              errors.destinationPort
            }
            placeholder="Optional"
          />

          <FormField
            label="Preferred Trade Term"
            name="preferredTradeTerm"
            type="select"
            value={
              values.preferredTradeTerm
            }
            onChange={handleChange}
            error={
              errors.preferredTradeTerm
            }
            options={
              tradeTermOptions
            }
          />

          <FormField
            label="Customisation Required?"
            name="customisationRequired"
            type="select"
            value={
              values.customisationRequired
            }
            onChange={handleChange}
            error={
              errors.customisationRequired
            }
            options={
              customisationOptions
            }
          />
        </div>

        <div className="ael-enquiry-form__full">
          <FormField
            label="Packaging Requirement"
            name="packagingRequirement"
            value={
              values.packagingRequirement
            }
            onChange={handleChange}
            error={
              errors.packagingRequirement
            }
            textarea
            placeholder="Mention packaging, branding, private-label or carton requirements if applicable."
          />

          <FormField
            label="Detailed Requirement"
            name="message"
            value={values.message}
            onChange={handleChange}
            error={errors.message}
            required
            textarea
            placeholder="Describe the product specifications, intended use, required variations, timeline or any other relevant information."
          />
        </div>
      </section>

      <section className="ael-enquiry-form__section">
        <div className="ael-enquiry-form__section-heading">
          <span>03</span>

          <div>
            <h2>
              Supporting Information
            </h2>

            <p>
              Add an optional reference
              file and choose how you
              prefer to be contacted.
            </p>
          </div>
        </div>

        <div className="ael-enquiry-form__grid">
          <FormField
            label="Preferred Contact Method"
            name="preferredContact"
            type="select"
            value={
              values.preferredContact
            }
            onChange={handleChange}
            error={
              errors.preferredContact
            }
            options={
              contactPreferenceOptions
            }
          />

          <div
            className={[
              "ael-form-field",
              errors.attachment
                ? "has-error"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <label htmlFor="ael-enquiry-attachment">
              Reference File
            </label>

            <label
              htmlFor="ael-enquiry-attachment"
              className="ael-enquiry-upload"
            >
              <FileUp size={18} />

              <span>
                {attachment
                  ? attachment.name
                  : "Upload PDF or image"}
              </span>

              <small>
                Maximum 5 MB
              </small>
            </label>

            <input
              id="ael-enquiry-attachment"
              className="ael-enquiry-upload__input"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={
                handleAttachment
              }
            />

            {errors.attachment && (
              <small className="ael-form-field__error">
                {
                  errors.attachment
                }
              </small>
            )}
          </div>
        </div>

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
            I agree that Aishwary
            Exim & Logistics may use
            the information provided
            to respond to this business
            enquiry.
          </span>
        </label>

        {errors.consent && (
          <small className="ael-form-field__error">
            {errors.consent}
          </small>
        )}
      </section>

      {submitError && (
        <div
          className="ael-enquiry-form__submit-error"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <div className="ael-enquiry-form__footer">
        <div>
          <strong>
            No fixed retail pricing
          </strong>

          <span>
            Quotations depend on the
            actual product and buyer
            requirement.
          </span>
        </div>

        <button
          type="submit"
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
              Submit Enquiry

              <Send size={17} />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default EnquiryForm;