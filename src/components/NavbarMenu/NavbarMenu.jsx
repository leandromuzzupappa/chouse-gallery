/* eslint-disable react/prop-types */
import "./NavbarMenu.css";

export const NavbarMenu = ({ isOpen }) => {
  return (
    <div className="navbarMenu" data-open={isOpen}>
      <ul>
        <li>
          <a href="#link1"> Glass and Iron</a>
        </li>
        <li>
          <a href="#link2"> Art Pottery</a>
        </li>
        <li>
          <a href="#link3"> Art Deco</a>
        </li>
      </ul>
    </div>
  );
};
