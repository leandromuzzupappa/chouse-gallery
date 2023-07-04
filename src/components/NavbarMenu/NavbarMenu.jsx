/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { getCategories } from "../../services/categoryService";
import "./NavbarMenu.css";

export const NavbarMenu = ({ isOpen, onClose }) => {
  const timelineRef = useRef(null);
  const menuRef = useRef(null);
  const titleRef = useRef(null);
  const categoriesRef = useRef(null);
  const linksRef = useRef(null);
  const overlayRef = useRef(null);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoriesData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };

    getCategoriesData();
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({ paused: true });

    if (isOpen) {
      onEnterAnimation(timeline);
    } else {
      onLeaveAnimation(timeline);
    }

    timelineRef.current = timeline;
    timelineRef.current.play();

    return () => {
      timelineRef.current.kill();
    };
  }, [isOpen]);

  const onEnterAnimation = (timeline) => {
    /* menu width */
    timeline.fromTo(
      menuRef.current,
      { width: 0, x: -30 },
      {
        autoAlpha: 1,
        display: "block",
        duration: 0.3,
        width: 350,
        x: 0,
        ease: "power.inOut",
      }
    );

    /* Title */
    timeline.fromTo(
      titleRef.current,
      { autoAlpha: 0, x: -30 },
      {
        duration: 0.5,
        autoAlpha: 1,
        x: 0,
        ease: "expo.inOut",
      },
      "+=0.05"
    );

    /* categories */
    timeline.fromTo(
      categoriesRef.current.children,
      { autoAlpha: 0, x: -30 },
      {
        duration: 0.5,
        autoAlpha: 1,
        x: 0,
        stagger: 0.2,
        ease: "expo.inOut",
      },
      "-=0.125"
    );

    /* links */
    timeline.fromTo(
      linksRef.current.children,
      { autoAlpha: 0, x: -30 },
      {
        duration: 0.5,
        autoAlpha: 1,
        x: 0,
        stagger: 0.2,
        ease: "expo.inOut",
      },
      "-=0.125"
    );

    /* overlay */
    timeline.to(
      overlayRef.current,
      {
        display: "block",
        duration: 0.2,
        autoAlpha: 1,
        ease: "power3.inOut",
      },
      0
    );
  };

  const onLeaveAnimation = (timeline) => {
    /* menu hide */
    timeline.to(menuRef.current, {
      display: "none",
      duration: 0.4,
      autoAlpha: 0,
      x: -30,
      ease: "power3.inOut",
    });

    /* overlay */
    timeline.to(
      overlayRef.current,
      {
        display: "none",
        duration: 0.4,
        autoAlpha: 0,
        ease: "power3.inOut",
      },
      0
    );
  };

  return (
    <>
      <div ref={menuRef} className="navbarMenu" data-open={isOpen}>
        <button className="navbarMenu--close" onClick={onClose}>
          <span></span>
        </button>

        <h3 ref={titleRef} className="navbarMenu--title">
          Galleries
        </h3>

        <ul ref={categoriesRef} className="navbarMenu--list">
          {categories.map(({ id, name, slug }, i) => (
            <li key={id} className="navbarMenu--list-item">
              <NavLink
                to={`/${slug}`}
                className={({ isActive }) =>
                  isActive ? "navbarMenu--list-item-active" : ""
                }
                onClick={onClose}
              >
                <span>0{i}</span> {name}
              </NavLink>
            </li>
          ))}
        </ul>

        <ul ref={linksRef} className="navbarMenu--links">
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
        ref={overlayRef}
        className="navbarMenu-overlay"
        data-open={isOpen}
        onClick={onClose}
      ></div>
    </>
  );
};
