const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalisePhone = (
  value = ""
) =>
  String(value).replace(
    /\D/g,
    ""
  );

export const validateEmail = (
  value
) =>
  emailPattern.test(
    String(value || "").trim()
  );

export const validatePhone = (
  value
) => {
  const digits =
    normalisePhone(value);

  return (
    digits.length >= 7 &&
    digits.length <= 15
  );
};

export const validateQuoteForm = (
  values,
  attachment
) => {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName =
      "Please enter your name.";
  }

  if (!values.companyName.trim()) {
    errors.companyName =
      "Please enter your company or organisation name.";
  }

  if (!values.buyerType) {
    errors.buyerType =
      "Please select the buyer type.";
  }

  if (!values.country.trim()) {
    errors.country =
      "Please enter your country.";
  }

  if (!values.email.trim()) {
    errors.email =
      "Please enter your email address.";
  } else if (
    !validateEmail(values.email)
  ) {
    errors.email =
      "Please enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone =
      "Please enter your phone number.";
  } else if (
    !validatePhone(values.phone)
  ) {
    errors.phone =
      "Please enter a valid phone number.";
  }

  if (!values.productCategory) {
    errors.productCategory =
      "Please select a product category.";
  }

  if (
    !values.productRequirement.trim()
  ) {
    errors.productRequirement =
      "Please enter the product or sourcing requirement.";
  }

  if (
    !values.destinationCountry.trim()
  ) {
    errors.destinationCountry =
      "Please enter the shipment destination country.";
  }

  if (
    !values.message.trim()
  ) {
    errors.message =
      "Please describe your requirement.";
  } else if (
    values.message.trim().length < 10
  ) {
    errors.message =
      "Please provide a little more detail about your requirement.";
  }

  if (!values.consent) {
    errors.consent =
      "Please confirm that we may contact you regarding this enquiry.";
  }

  if (attachment) {
    const maxSize =
      5 * 1024 * 1024;

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      attachment.size > maxSize
    ) {
      errors.attachment =
        "Attachment must be 5 MB or smaller.";
    } else if (
      !allowedTypes.includes(
        attachment.type
      )
    ) {
      errors.attachment =
        "Upload a PDF, JPG, PNG or WebP file.";
    }
  }

  return errors;
};

export const validateContactForm = (
  values
) => {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName =
      "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email =
      "Please enter your email address.";
  } else if (
    !validateEmail(values.email)
  ) {
    errors.email =
      "Please enter a valid email address.";
  }

  if (
    values.phone.trim() &&
    !validatePhone(values.phone)
  ) {
    errors.phone =
      "Please enter a valid phone number.";
  }

  if (!values.subject.trim()) {
    errors.subject =
      "Please enter an enquiry subject.";
  }

  if (!values.message.trim()) {
    errors.message =
      "Please enter your message.";
  } else if (
    values.message.trim().length < 10
  ) {
    errors.message =
      "Please provide a little more detail.";
  }

  if (!values.consent) {
    errors.consent =
      "Please confirm that we may contact you regarding this enquiry.";
  }

  return errors;
};

export const buildQuotePayload = ({
  values,
  product,
  galleryItem,
  attachment,
}) => ({
  enquiry_type: product
    ? "product"
    : galleryItem
      ? "gallery"
      : "export",

  full_name:
    values.fullName.trim(),

  company_name:
    values.companyName.trim(),

  buyer_type:
    values.buyerType,

  country:
    values.country.trim(),

  email:
    values.email.trim(),

  phone:
    values.phone.trim(),

  whatsapp:
    values.whatsapp.trim(),

  product_category:
    values.productCategory,

  product_requirement:
    values.productRequirement.trim(),

  product_slug:
    product?.slug || null,

  product_code:
    product?.code || null,

  gallery_item_slug:
    galleryItem?.slug || null,

  estimated_quantity:
    values.estimatedQuantity.trim(),

  quantity_unit:
    values.quantityUnit,

  destination_country:
    values.destinationCountry.trim(),

  destination_port:
    values.destinationPort.trim(),

  preferred_trade_term:
    values.preferredTradeTerm,

  customisation_required:
    values.customisationRequired,

  packaging_requirement:
    values.packagingRequirement.trim(),

  message:
    values.message.trim(),

  preferred_contact:
    values.preferredContact,

  consent:
    values.consent,

  attachment,
});

export const buildContactPayload = (
  values
) => ({
  full_name:
    values.fullName.trim(),

  company_name:
    values.companyName.trim(),

  country:
    values.country.trim(),

  email:
    values.email.trim(),

  phone:
    values.phone.trim(),

  subject:
    values.subject.trim(),

  message:
    values.message.trim(),

  consent:
    values.consent,
});

/* =========================================================
   API VALIDATION ERROR MAPPING
========================================================= */

const apiFieldMap = {
  full_name:
    "fullName",

  company_name:
    "companyName",

  buyer_type:
    "buyerType",

  country:
    "country",

  email:
    "email",

  phone:
    "phone",

  whatsapp:
    "whatsapp",

  product_category:
    "productCategory",

  product_requirement:
    "productRequirement",

  estimated_quantity:
    "estimatedQuantity",

  quantity_unit:
    "quantityUnit",

  destination_country:
    "destinationCountry",

  destination_port:
    "destinationPort",

  preferred_trade_term:
    "preferredTradeTerm",

  customisation_required:
    "customisationRequired",

  packaging_requirement:
    "packagingRequirement",

  message:
    "message",

  preferred_contact:
    "preferredContact",

  attachment:
    "attachment",

  consent:
    "consent",

  subject:
    "subject",
};

export const mapApiValidationErrors = (
  errors = {}
) =>
  Object.entries(
    errors
  ).reduce(
    (
      result,
      [key, value]
    ) => {
      const frontendKey =
        apiFieldMap[key] ||
        key;

      result[
        frontendKey
      ] =
        Array.isArray(value)
          ? value[0]
          : value;

      return result;
    },
    {}
  );