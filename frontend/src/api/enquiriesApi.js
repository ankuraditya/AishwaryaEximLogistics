import api from "./axios";

export const submitContactEnquiry = async (payload) => {
  const response = await api.post("/enquiries/contact", payload);

  return response.data;
};

export const submitProductEnquiry = async (payload) => {
  const response = await api.post("/enquiries/product", payload);

  return response.data;
};

export const submitQuoteRequest = async (payload) => {
  const response = await api.post("/enquiries/quote", payload);

  return response.data;
};