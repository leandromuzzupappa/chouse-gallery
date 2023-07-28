import "./CheckoutPage.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export const CheckoutPage = () => {
  const { cart, getTotal } = useContext(CartContext);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      buyer: formData,
      items: cart,
      date: new Date(),
      total: getTotal(),
    };

    console.log(order);
  };

  return (
    <section className="checkout-page">
      <div className="checkout--wrapper">
        <div className="checkout--content">
          <h1>Checkout</h1>
          <form onSubmit={handleSubmit}>
            <div className="checkout--form-item">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="checkout--form-item">
              <label htmlFor="lastName">LastName:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="checkout--form-item">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="checkout--form-item">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <button className="checkout--form-item-submit" type="submit">
              Place order
            </button>
          </form>
        </div>
        <div className="checkout--order-background"></div>
        <div className="checkout--order">
          <h2>
            You order - <span>{getTotal()}</span>
          </h2>
          <Link to="/">Back to home</Link>

          <span>Products:</span>

          <div className="checkout--order-items">
            {cart &&
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="checkout--order-item">
                  <img src={product.image} alt={product.name} />
                  <span className="item-name">{product.name}</span>
                  <span className="item-price">
                    {product.price.toLocaleString("es-AR", {
                      style: "currency",
                      currency: "ARS",
                    })}
                  </span>
                  <span className="item-qty">{quantity}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
