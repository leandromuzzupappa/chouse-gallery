import { useState } from "react";
import { CartWidget } from "../CartWidget/CartWidget";

import "./Navbar.css";

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onMenuClick = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <>
      <nav className={`navbar ${navbarOpen ? "navbar-active" : ""}`}>
        <button
          className={`navbar-menu--btn ${
            navbarOpen ? "navbar-menu--btn-active" : ""
          }`}
          onClick={onMenuClick}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="navbar--logo">
          <h2>Pepitos</h2>
        </div>

        <div className="navbar--actions">
          <CartWidget />
          <button className="login">Login</button>
        </div>
      </nav>

      {navbarOpen && <h1>mostrar menu</h1>}
    </>
  );
};
