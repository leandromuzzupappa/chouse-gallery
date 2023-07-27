import "./Homepage.css";
import { useEffect, useState } from "react";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/productService";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchProducts();

    return () => {};
  }, []);

  return (
    <section className="homepage">
      {isLoading && <p>Loading...</p>}

      <ul className="homepage--grid">
        {products.map((product) => (
          <li key={product.docId} className="homepage--grid-item">
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
