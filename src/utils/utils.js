export const handleProductName = (productName) => {
  return productName.replaceAll(" ", "-").toLowerCase();
};
