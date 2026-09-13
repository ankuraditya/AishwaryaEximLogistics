import api from "./axios";

export const getCategories = async () => {
  const response = await api.get("/categories");

  return response.data;
};

export const getCategoryBySlug = async (slug) => {
  const response = await api.get(`/categories/${slug}`);

  return response.data;
};