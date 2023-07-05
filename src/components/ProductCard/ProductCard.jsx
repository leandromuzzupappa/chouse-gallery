/* eslint-disable react/prop-types */
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { handleProductName } from "../../utils/utils";

export const ProductCard = ({ id, image, name }) => {
  return (
    <article className="product-card">
      <Link to={`/${id}/${handleProductName(name)}`}>
        <div className="product-card--media">
          <img src={image} alt={name} />
        </div>
        <div className="product-card--info">
          <h3 className="product-card--info-title">{name}</h3>
        </div>
      </Link>
    </article>
  );
};
