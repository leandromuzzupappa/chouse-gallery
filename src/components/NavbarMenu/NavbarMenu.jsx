/* eslint-disable react/prop-types */
import "./NavbarMenu.css";
import { galleries } from "../../data/data";

export const NavbarMenu = ({ isOpen, onClose }) => {
  return (
    <>
      <div className="navbarMenu" data-open={isOpen}>
        <button className="navbarMenu--close" onClick={onClose}>
          <span></span>
        </button>

        <h3 className="navbarMenu--title">Galleries</h3>

        <ul className="navbarMenu--list">
          {galleries.map(({ id, name, link }, i) => (
            <li key={id} className="navbarMenu--list-item">
              <a href={link}>
                <span>0{i}</span> {name}
              </a>
            </li>
          ))}
        </ul>

        <ul className="navbarMenu--links">
          <li>
            <a href="/"> - Behance</a>
          </li>
          <li>
            <a href="/"> - Dribbble</a>
          </li>
          <li>
            <a href="/"> - Instagram</a>
          </li>
        </ul>
      </div>
      <div
        className="navbarMenu-overlay"
        data-open={isOpen}
        onClick={onClose}
      ></div>
    </>
  );
};
