import "./CheckoutPage.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { CartContext } from "../../context/CartContext";
import { addCheckoutSnapshot } from "../../services/checkoutService";

export const CheckoutPage = () => {
  const { cart, getTotal } = useContext(CartContext);

  const timelineRef = useRef(null);
  const contentRef = useRef(null);
  const buyButtonRef = useRef(null);
  const checkoutRef = useRef(null);
  const backgroundRef = useRef(null);
  const orderRef = useRef(null);

  const [order, setOrder] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (order) {
      const timeline = gsap.timeline({ paused: true });

      handleLoadOrderData(timeline);

      timelineRef.current = timeline;
      timelineRef.current.play();
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrderValidations = (order) => {
    const errors = {};

    if (order.buyer.name === "") errors.name = "Input name is required";
    if (order.buyer.lastName === "")
      errors.lastName = "Input last name is required";
    if (order.buyer.email === "") errors.email = "Input email is required";
    if (order.buyer.phone === "") errors.phone = "Input phone is required";
    if (order.items.length === 0) errors.items = "Cart is empty";
    if (order.total === 0) errors.total = "Total is 0";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onSendingData = () => {
    contentRef.current.style.pointerEvents = "none";

    if (buyButtonRef.current) {
      Object.assign(buyButtonRef.current.style, {
        pointerEvents: "none",
        backgroundColor: "gray",
      });

      buyButtonRef.current.innerText = "Placing order...";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors({});
    onSendingData();

    const order = {
      buyer: formData,
      items: cart,
      date: new Date(),
      total: getTotal(),
    };

    if (!handleOrderValidations(order)) {
      contentRef.current.style.pointerEvents = "auto";

      if (buyButtonRef.current) {
        Object.assign(buyButtonRef.current.style, {
          pointerEvents: "all",
          backgroundColor: "black",
        });

        buyButtonRef.current.innerText = "Place order";
      }

      return;
    }

    const orderId = await addCheckoutSnapshot(order);
    setOrder(orderId);
  };

  const handleLoadOrderData = (timeline) => {
    timeline.fromTo(
      contentRef.current,
      { autoAlpha: 1, y: 0 },
      {
        y: -100,
        duration: 0.5,
        autoAlpha: 0,
        ease: "power.inOut",
      }
    );

    timeline.fromTo(
      checkoutRef.current,
      { autoAlpha: 1, y: 0 },
      {
        duration: 0.5,
        autoAlpha: 0,
        y: -100,
        ease: "power.inOut",
      }
    );

    timeline.to(
      backgroundRef.current,
      {
        width: "100vw",
        duration: 0.5,
        ease: "power.inOut",
      },
      "-=0.5"
    );

    timeline.fromTo(
      orderRef.current,
      { autoAlpha: 0, y: 100, display: "none" },
      {
        display: "block",
        duration: 0.5,
        autoAlpha: 1,
        y: 0,
        ease: "power.inOut",
      },
      "-=0.2"
    );
  };

  return (
    <section className="checkout-page">
      <div className="checkout--wrapper">
        <div ref={contentRef} className="checkout--content">
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
              {formErrors.name && (
                <span className="checkout--form-item-error">
                  {formErrors.name}
                </span>
              )}
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
              {formErrors.lastName && (
                <span className="checkout--form-item-error">
                  {formErrors.lastName}
                </span>
              )}
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
              {formErrors.email && (
                <span className="checkout--form-item-error">
                  {formErrors.email}
                </span>
              )}
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
              {formErrors.phone && (
                <span className="checkout--form-item-error">
                  {formErrors.phone}
                </span>
              )}
            </div>
            <button
              ref={buyButtonRef}
              className="checkout--form-item-submit"
              type="submit"
            >
              Place order
            </button>
          </form>
        </div>
        <div ref={checkoutRef} className="checkout--order">
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
      <div ref={backgroundRef} className="checkout--order-background"></div>

      <div ref={orderRef} className="order">
        <h2>
          Congratulations <span className="order-name">{formData.name}</span>!
        </h2>
        <h3>
          Your order ID is: <span className="order-id">{order}</span>
        </h3>
      </div>
    </section>
  );
};
