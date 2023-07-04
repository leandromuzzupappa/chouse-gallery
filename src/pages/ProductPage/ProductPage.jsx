import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";

export const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProductData = async () => {
      const product = await getProductById(productId);

      setProduct(product);
    };

    getProductData();
  }, [productId]);

  return (
    <div className="product">
      <h1>{product.name}</h1>
      <p>{product.category}</p>
      <img src={product.image} alt={product.name} />
    </div>
  );
};
