import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";

function RightNavbar({ showCart, handleCloseCart, cart }) {
  return (
    <Offcanvas
      show={showCart}
      onHide={handleCloseCart}
      placement={"end"}
      className={styles.cartSideBar}
    >
      <Offcanvas.Header className={`${styles.cartHeader} `}>
        <button onClick={handleCloseCart} className={styles.btnClose}>
          <i className="bi bi-chevron-left"></i>
        </button>
        <h5
          className={`${
            cart.items.length !== 0 ? styles.cartTitle : styles.cartTitle2
          } text-center`}
        >
          My cart
        </h5>
      </Offcanvas.Header>

      <Offcanvas.Body className={`${cart.items.length !== 0 ? styles.cartBody1 : styles.cartBody}`}>
        <div className={styles.rssBlock}>
          <span className={styles.marqueeStyle}>&nbsp;FREE SHIPPING ON ORDERS OVER $32</span>
        </div>
        <Cart />
      </Offcanvas.Body>
      {cart.items.length !== 0 && (
        <div
          className={`${styles.cartFooter} d-flex  align-items-center justify-content-center order-2 w-100`}
        >
          <div className="d-flex flex-column align-items-center">
            <span>SUBTOTAL</span>
            <h3>{cart.total}$</h3>
          </div>

          <Link to="/checkout" className={styles.linkContinue}>
            <button className={styles.btnContinue}> Continue to checkout</button>
          </Link>
        </div>
      )}
    </Offcanvas>
  );
}

export default RightNavbar;
