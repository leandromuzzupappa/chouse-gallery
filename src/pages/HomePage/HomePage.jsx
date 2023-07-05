import "./Homepage.css";
import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
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
    <section className="homepage">
      <ul className="homepage--grid">
        {products.map((product) => (
          <li key={product.id} className="homepage--grid-item">
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
