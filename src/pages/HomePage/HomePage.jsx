import "./Homepage.css";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { getProducts } from "../../services/productService";
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen";

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const timelineRef = useRef(null);
  const productListref = useRef(null);

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

  useEffect(() => {
    const timeline = gsap.timeline({ paused: true });

    if (products) {
      onProductsLoad(timeline);
    }

    timelineRef.current = timeline;
    timelineRef.current.play();
  }, [products]);

  const onProductsLoad = (timeline) => {
    timeline.from(
      productListref.current.children,
      {
        duration: 1,
        opacity: 0,
        y: -100,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.5"
    );
  };

  return (
    <section className="homepage">
      {isLoading && <LoadingScreen />}

      <ul ref={productListref} className="homepage--grid">
        {products.map((product) => (
          <li key={product.docId} className="homepage--grid-item">
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
