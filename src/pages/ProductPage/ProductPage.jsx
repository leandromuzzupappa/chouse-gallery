import "./ProductPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { ProductMedia } from "../../components/ProductMedia/ProductMedia";

const pattern = Math.random() > 0.5 ? "bg-rectangles" : "bg-rhombus";

export const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProductData = async () => {
      const product = await getProductById(productId);

      setProduct(product);
    };

    getProductData();
  }, [productId]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section className={`product-page product-page--${pattern}`}>
      <div className="product-page--content">
        <Link
          to={".."}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Back to {product.category}
        </Link>
        <h1>{product.name}</h1>
        <p>{product.dimentions}</p>

        <div className="product-page--content-actions">
          <div className="price">
            <span>{product.price}</span>

            <div className="quantity">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
          </div>

          <button className="addToCart">Add to cart</button>
        </div>
      </div>
      <div className="product-page--media">
        {product.image && <ProductMedia image={product.image} />}
      </div>
    </section>
  );
};
