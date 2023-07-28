/* eslint-disable react/prop-types */

import "./CartProduct.css";

export const CartProduct = ({
  product,
  onDecrease,
  onIncrease,
  onRemove,
  myRef,
}) => {
  const onDecreaseClick = () => onDecrease(product.id);
  const onIncreaseClick = () => onIncrease(product.id);
  const onRemoveClick = () => onRemove(product.id);

  return (
    <div ref={myRef} className="cartProduct">
      <div className="cartProduct--img">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="cartProduct--info">
        <h3 className="cartProduct--title">{product.title}</h3>
        <div className="cartProduct--price">
          <p>
            ${product.price} x {product.quantity}
          </p>
          <div className="cartProduct--qty">
            <button title="decrease one" onClick={onDecreaseClick}>
              -
            </button>
            <button title="increase one" onClick={onIncreaseClick}>
              +
            </button>
          </div>
        </div>
        <button className="cartProduct--remove" onClick={onRemoveClick}>
          Remove
        </button>
      </div>
    </div>
  );
};
