import api from "./axios";

export const getCertifications = async () => {
  const response = await api.get("/certifications");
  return response.data;
};
