import api from "./axios";

export const getWebsiteSettings = async () => {
  const response = await api.get("/settings");

  return response.data;
};