import "./ProductPage.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { ProductMedia } from "../../components/ProductMedia/ProductMedia";
import { CartContext } from "../../context/CartContext";

const pattern = Math.random() > 0.5 ? "bg-rectangles" : "bg-rhombus";

export const ProductPage = () => {
  const navigate = useNavigate();
  const { addItem } = useContext(CartContext);

  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [productPrice, setProductPrice] = useState(0);

  useEffect(() => {
    const getProductData = async () => {
      const product = await getProductById(productId);

      setProduct(product);
    };

    getProductData();
  }, [productId]);

  useEffect(() => {
    if (!product.price) return;

    setProductPrice(product.price * quantity);
  }, [quantity, product.price]);

  const onIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    setProductPrice(product.price * quantity);
  };

  const onDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      setProductPrice(product.price * quantity);
    }
  };

  const onAddToCart = () => {
    addItem(product, quantity);
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
        <p>
          <strong>Dimensions:</strong> <br />
          {product.dimensions}
        </p>

        <div className="product-page--content-actions">
          <div className="price">
            <span>
              {productPrice.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
              })}
            </span>

            <div className="quantity">
              <button onClick={onDecreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={onIncreaseQuantity}>+</button>
            </div>
          </div>

          <button className="addToCart" onClick={onAddToCart}>
            Add to cart
          </button>
        </div>
      </div>
      <div className="product-page--media">
        {product.image && <ProductMedia image={product.image} />}
      </div>
    </section>
  );
};
