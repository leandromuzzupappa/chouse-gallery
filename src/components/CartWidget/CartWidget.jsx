import "./CartWidget.css";

export const CartWidget = () => {
  return (
    <button className="cart">
      <svg
        className="cart--icon"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.563 5.5h-3.438a4.125 4.125 0 0 0-8.25 0H3.437a1.375 1.375 0 0 0-1.374 1.375v10.313a1.375 1.375 0 0 0 1.374 1.375h15.126a1.375 1.375 0 0 0 1.375-1.375V6.874A1.375 1.375 0 0 0 18.563 5.5ZM11 2.75a2.75 2.75 0 0 1 2.75 2.75h-5.5A2.75 2.75 0 0 1 11 2.75Zm7.563 14.438H3.438V6.874h3.437V8.25a.688.688 0 1 0 1.375 0V6.875h5.5V8.25a.687.687 0 1 0 1.375 0V6.875h3.438v10.313Z"
          fill="black"
        />
      </svg>

      <span className="cart--count">12</span>
    </button>
  );
};
