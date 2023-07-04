import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();

      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>homepage</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {/* <Link to={`/products/${product.id}`}>{product.name}</Link> */}
            <img alt="ImageName" src={product.image} />
          </li>
        ))}
      </ul>
    </>
  );
};
