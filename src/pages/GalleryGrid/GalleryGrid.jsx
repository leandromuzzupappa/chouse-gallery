import "./GalleryGrid.css";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useParams } from "react-router-dom";
import { getCategoryBySlug } from "../../services/categoryService";
import { getProductsByCategorySlug } from "../../services/productService";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import { LoadingScreen } from "../../components/LoadingScreen/LoadingScreen";

export const GalleryGrid = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const timelineRef = useRef(null);
  const productListref = useRef(null);

  useEffect(() => {
    const getCategoryData = async () => {
      const category = await getCategoryBySlug(categoryName);
      const products = await getProductsByCategorySlug(categoryName);

      setCategory(category);
      setProducts(products);
      setIsLoading(false);
    };

    getCategoryData();
  }, [categoryName]);

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
    <section className="gallery-page">
      {isLoading && <LoadingScreen />}

      <h1 className="gallery-page--title">{category.name}</h1>

      <ul ref={productListref} className="gallery-page--grid">
        {products.map((product) => (
          <li key={product.id} className="gallery-page--grid-item">
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
