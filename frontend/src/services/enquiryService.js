const API_BASE_URL =
  (
    import.meta.env
      .VITE_API_BASE_URL || ""
  ).replace(/\/$/, "");

const API_ENABLED =
  import.meta.env
    .VITE_ENABLE_API === "true";

const API_ORIGIN = (() => {
  try { return new URL(API_BASE_URL).origin; } catch { return ""; }
})();

const csrfHeaders = async () => {
  await fetch(`${API_ORIGIN}/sanctum/csrf-cookie`, { credentials: "include", headers: { Accept: "application/json" } });
  const token = document.cookie.split("; ").find((cookie) => cookie.startsWith("XSRF-TOKEN="))?.split("=").slice(1).join("=");
  return token ? { "X-XSRF-TOKEN": decodeURIComponent(token) } : {};
};

const normalisePayload = (
  payload
) => ({
  product_id:
    payload.product_id || null,
  name:
    payload.full_name,
  company:
    payload.company_name || null,
  country:
    payload.country || null,
  email: payload.email,
  phone:
    payload.phone || null,
  quantity:
    payload.estimated_quantity || null,
  destination_country:
    payload.destination_country || null,
  subject:
    payload.subject ||
    payload.product_requirement || null,
  message: payload.message,
  consent: payload.consent,
  website: "",
});

const delay = (milliseconds) =>
  new Promise((resolve) => {
    window.setTimeout(
      resolve,
      milliseconds
    );
  });

const buildFormData = (
  payload
) => {
  const formData =
    new FormData();

  Object.entries(
    payload
  ).forEach(
    ([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === ""
      ) {
        return;
      }

      if (
        key === "attachment"
      ) {
        if (value instanceof File) {
          formData.append(
            key,
            value
          );
        }

        return;
      }

      if (
        typeof value ===
        "boolean"
      ) {
        formData.append(
          key,
          value ? "1" : "0"
        );

        return;
      }

      formData.append(
        key,
        String(value)
      );
    }
  );

  return formData;
};

const parseResponse = async (
  response
) => {
  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    return response.json();
  }

  return {};
};

export const submitQuoteRequest =
  async (payload) => {
    if (
      !API_ENABLED ||
      !API_BASE_URL
    ) {
      await delay(700);

      return {
        success: true,
        developmentMode: true,
        reference:
          `AEL-DEMO-${Date.now()}`,
      };
    }

    const response =
      await csrfHeaders();

    const result =
      await fetch(
        `${API_BASE_URL}/enquiries/${payload.enquiry_type === "product" ? "product" : "quote"}`,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",
            ...response,
          },
          credentials: "include",

          body:
            buildFormData(
              normalisePayload(payload)
            ),
        }
      );

    const data =
      await parseResponse(
        result
      );

    if (!result.ok) {
      const error =
        new Error(
          data.message ||
            "Unable to submit the enquiry."
        );

      error.validationErrors =
        data.errors || null;

      throw error;
    }

    return {
      success: true,
      developmentMode: false,
      ...data,
      reference:
        data.data?.reference,
    };
  };

export const submitContactEnquiry =
  async (payload) => {
    if (
      !API_ENABLED ||
      !API_BASE_URL
    ) {
      await delay(650);

      return {
        success: true,
        developmentMode: true,
        reference:
          `AEL-CONTACT-DEMO-${Date.now()}`,
      };
    }

    const response =
      await csrfHeaders();

    const result =
      await fetch(
        `${API_BASE_URL}/enquiries/contact`,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",

            "Content-Type":
              "application/json",
            ...response,
          },
          credentials: "include",

          body:
            JSON.stringify(
              normalisePayload(payload)
            ),
        }
      );

    const data =
      await parseResponse(
        result
      );

    if (!result.ok) {
      const error =
        new Error(
          data.message ||
            "Unable to submit the message."
        );

      error.validationErrors =
        data.errors || null;

      throw error;
    }

    return {
      success: true,
      developmentMode: false,
      ...data,
      reference:
        data.data?.reference,
    };
  };
