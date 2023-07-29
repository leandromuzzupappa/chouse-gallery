import "./CartWidget.css";
import { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { CartContext } from "../../context/CartContext";
import { CartProduct } from "../CartProduct/CartProduct";

export const CartWidget = () => {
  const { cart, getQuantity, getTotal, removeItem, increaseOne, decreaseOne } =
    useContext(CartContext);

  const timelineRef = useRef(null);
  const cartModalRef = useRef(null);
  const cartItemsRef = useRef(null);
  const titleRef = useRef(null);
  const overlayRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const onCartClick = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);

  useEffect(() => {
    const timeline = gsap.timeline({ paused: true });

    if (isOpen) {
      onEnterAnimation(timeline);
    }

    timelineRef.current = timeline;
    timelineRef.current.play();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const onEnterAnimation = (timeline) => {
    timeline.fromTo(
      cartModalRef.current,
      { autoAlpha: 0, x: +100 },
      {
        duration: 0.5,
        autoAlpha: 1,
        x: 0,
        ease: "power.inOut",
      }
    );

    timeline.fromTo(
      titleRef.current,
      { autoAlpha: 0, x: -30 },
      {
        duration: 0.5,
        autoAlpha: 1,
        x: 0,
        ease: "power.inOut",
      },
      "-=0.3"
    );

    timeline.fromTo(
      overlayRef.current,
      { autoAlpha: 0 },
      {
        duration: 0.3,
        autoAlpha: 1,
        ease: "power.inOut",
      },
      0
    );

    // animate cartItems children
    const cartItems = cartItemsRef.current?.children;
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item, index) => {
        timeline.fromTo(
          item,
          { autoAlpha: 0, x: -320 },
          {
            duration: 0.5,
            autoAlpha: 1,
            x: 0,
            ease: "power.inOut",
          },
          index * 0.1
        );
      });
    }
  };

  return (
    <>
      <button className="cart" onClick={onCartClick}>
        [ <span className="cart--count">{getQuantity()}</span> ]
      </button>

      {isOpen && (
        <>
          <div ref={cartModalRef} className="cartModal">
            <header className="cartModal--header">
              <h3 ref={titleRef} className="cartModal--title">
                My cart <span> - {getQuantity()} items</span>
                <span className="cartModal--header-total">
                  Total: {getTotal()}
                </span>
              </h3>
              <button className="cartModal--close" onClick={onClose}>
                <span></span>
              </button>
            </header>
            <div className="cartModal--items">
              {cart.map(({ product, quantity }) => (
                <CartProduct
                  key={product.docId}
                  product={{ quantity, ...product }}
                  onIncrease={increaseOne}
                  onDecrease={decreaseOne}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <Link
              className="cartModal--checkout"
              to="/checkout"
              onClick={() => setIsOpen(false)}
            >
              Checkout
            </Link>
          </div>

          <div
            ref={overlayRef}
            className="cartModal-overlay"
            data-open={isOpen}
            onClick={onClose}
          ></div>
        </>
      )}
    </>
  );
};
