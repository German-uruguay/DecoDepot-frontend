import React, { useEffect, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import styles from "./Navbar.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { toggleCart } from "../../redux/offCanvasSlice";
import { TiArrowSortedDown } from "react-icons/ti";

import LeftNavbar from "./LeftNavbar";
import RightNavbar from "./RightNavbar";

function Navbar() {
  const url = process.env.REACT_APP_IMAGE_PATH + "navLogo.png";
  const [colorChange, setColorchange] = useState(false);
  const [showLeftNavbar, setShowLeftNavbar] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const toggle = useSelector((state) => state.offCanvas);

  const location = useLocation();

  const handleToggle = () => {
    dispatch(toggleCart());
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseLeftNavbar = () => setShowLeftNavbar(false);
  const handleShowLeftNavbar = () => setShowLeftNavbar(true);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const changeNavbarColor = () => {
    if (window.scrollY >= 100) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  let fixed = "fixed-top";
  let container = "container";

  // if (location.pathname.startsWith("/admin")) {
  //   adminNavbar = "";
  //   container = "";
  //   return;
  // }

  window.addEventListener("scroll", changeNavbarColor);
  return (
    <nav
      className={`${colorChange ? styles.backBlue : styles.backGrey} 
        ${styles.navbarStyle} 
        navbar navbar-expand fixed-top`}
    >
      <LeftNavbar
        showLeftNavbar={showLeftNavbar}
        handleCloseLeftNavbar={handleCloseLeftNavbar}
        handleLogout={handleLogout}
        user={user}
      />
      <RightNavbar
        showCart={showCart}
        handleToggle={handleToggle}
        cart={cart}
        toggle={toggle}
        toggleCart={toggleCart}
      />

      <div className={`${styles.nav} container `}>
        <div className="d-flex">
          <div className={`${styles.logoContainer} nav-item`}>
            <Link to="/" className={`${styles.customNavLinkLogo} nav-link`}>
              {/* <div className={styles.logo} style={{ backgroundImage: `url(${url})` }}></div> */}
              <img src={url} className={styles.logo} alt="logo" />
            </Link>
          </div>
          <button
            className={`${styles.customNavLinkButton}  nav-link`}
            onClick={handleShowLeftNavbar}
          >
            Explore
            <TiArrowSortedDown className={styles.icon} />
            {/* <i className={`${styles.icon} bi bi-arrow-down-circle-fill`}></i> */}
          </button>
        </div>

        <ul className="navbar-nav mb-0">
          <li className="nav-item">
            <button className={`${styles.customNavLinkButton} nav-link`} onClick={handleToggle}>
              <i className={`${styles.customNavLink} ${styles.cart} bi bi-cart-fill`}></i>
            </button>
          </li>
          {user && (
            <li className={`${styles.myAccount} nav-item`}>
              <Link to={`/myaccount_details`} className={`${styles.customNavLink} nav-link`}>
                My account
              </Link>
            </li>
          )}

          {user ? (
            <div></div>
          ) : (
            <li className="nav-item">
              <Link to="/login" className={`${styles.customNavLink} nav-link`}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
