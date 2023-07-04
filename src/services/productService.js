import productData from "../data/products.json";

export const getProducts = async () => {
  return productData;
};

export const getProductById = async (id) => {
  return productData.find((product) => product.id === id);
};
