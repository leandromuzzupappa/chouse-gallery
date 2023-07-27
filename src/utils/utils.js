export const handleProductName = (productName) => {
  if (!productName) return;

  return productName.replaceAll(" ", "-").toLowerCase();
};
