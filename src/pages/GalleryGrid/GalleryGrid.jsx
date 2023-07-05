import "./GalleryGrid.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategoryBySlug } from "../../services/categoryService";
import { getProductsByCategorySlug } from "../../services/productService";
import { ProductCard } from "../../components/ProductCard/ProductCard";

export const GalleryGrid = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});

  useEffect(() => {
    const getCategoryData = async () => {
      const category = await getCategoryBySlug(categoryName);
      const products = await getProductsByCategorySlug(categoryName);

      setCategory(category);
      setProducts(products);
    };

    getCategoryData();
  }, [categoryName]);

  return (
    <section className="gallery-page">
      <h1 className="gallery-page--title">{category.name}</h1>

      <ul className="gallery-page--grid">
        {products.map((product) => (
          <li key={product.id} className="gallery-page--grid-item">
            <ProductCard {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
