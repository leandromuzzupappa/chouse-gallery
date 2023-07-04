import categoriesData from "../data/categories.json";

export const getCategories = async () => {
  return categoriesData;
};

export const getCategoryById = async (id) => {
  return categoriesData.find((category) => category.id === id);
};

export const getCategoryBySlug = async (slug) => {
  return categoriesData.find((category) => category.slug === slug);
};
