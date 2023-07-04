import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCategoryBySlug } from "../../services/categoryService";
import { getProductsByCategorySlug } from "../../services/productService";
import { handleProductName } from "../../utils/utils";

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

  const handleProductLink = ({ id, name }) => {
    return `/${id}/${handleProductName(name)}`;
  };

  return (
    <>
      <h1>{category.name}</h1>

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={handleProductLink(product)}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};
