import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { NavbarMenu } from "../NavbarMenu/NavbarMenu";
import { CartWidget } from "../CartWidget/CartWidget";

export const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onMenuClick = () => {
    setNavbarOpen(!navbarOpen);
  };

  const onLogoClick = () => {
    if (navbarOpen) setNavbarOpen(false);
  };

  return (
    <>
      <nav className="navbar" data-active={navbarOpen}>
        <button
          className="navbar-menu--btn"
          data-active={navbarOpen}
          onClick={onMenuClick}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="navbar--logo">
          <Link to="/" onClick={onLogoClick}>
            <h2>Pepitos</h2>
          </Link>
        </div>

        <div className="navbar--actions">
          <CartWidget />
          {/* <button className="login">Login</button> */}
        </div>
      </nav>

      <NavbarMenu isOpen={navbarOpen} onClose={onMenuClick} />
    </>
  );
};
