/* eslint-disable react/prop-types */
import "./NavbarMenu.css";

export const NavbarMenu = ({ isOpen }) => {
  return (
    <div className="navbarMenu" data-open={isOpen}>
      <ul>
        <li>Glass and Iron</li>
        <li>Art Pottery</li>
        <li>Art Deco</li>
      </ul>
    </div>
  );
};
