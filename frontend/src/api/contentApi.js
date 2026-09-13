import api from "./axios";

export const getGallery = async () => (await api.get("/gallery")).data;
export const getBlogs = async () => (await api.get("/blogs")).data;
export const getBlog = async (slug) => (await api.get(`/blogs/${slug}`)).data;
export const getPage = async (slug) => (await api.get(`/pages/${slug}`)).data;
