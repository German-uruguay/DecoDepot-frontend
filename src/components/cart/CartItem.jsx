import styles from "./CartItem.module.css";

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../redux/cartSlice";
import { useSelector } from "react-redux";
import { current } from "@reduxjs/toolkit";

function CartItem({ product }) {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const formRef = useRef();
  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  function handleSubmitAdd(event) {
    event.preventDefault();
    const { value } = formRef.current.quantity;

    dispatch(
      addItem({
        id: product.id,
        name: product.name,
        qty: quantity,
        image: product.productImage,
        price: product.price,
      }),
      setQuantity(0),
    );
  }

  function handleSubmitRemove(event) {
    event.preventDefault();
    dispatch(removeItem({ name: product.name, qty: quantity })), setQuantity(0);
  }
  function handleSubmitClear(event) {
    event.preventDefault();
    dispatch(removeItem({ name: product.name, qty: 10000 }));
  }
  console.log(product.qty);
  return (
    <div>
      <div className={`${styles.productContainer} container-fluid`}>
        <div className={`container-fluid`}>
          <div className="row">
            <div className="col-5">
              <div className={`${styles.productImage}`}>
                <img
                  className={`${styles.productImage}`}
                  src={process.env.REACT_APP_IMAGE_PATH + product.image}
                  alt=""
                />
                <h3 className="text-center">{"$" + product.price}</h3>
              </div>
            </div>
            <div className="col-7 d-flex align-items-center">
              <div>
                <h2>{product.name}</h2>
                <span>Ships in 7-10 Days</span>
              </div>
            </div>
            <div className={`${styles.formContainer} d-flex align-items-center`}>
              <form ref={formRef} className={styles.form} /* onSubmit={handleSubmitAdd} */>
                <div className={styles.inline}>
                  <button
                    className={`${styles.plus} btn`}
                    type="button"
                    onClick={() => handleMinus()}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className={styles.quantity}
                    value={quantity}
                    name="quantity"
                    onChange={(event) => setQuantity(event.target.value)}
                  />
                  <button
                    className={`${styles.minus} btn`}
                    type="button"
                    onClick={() => handlePlus()}
                  >
                    +
                  </button>{" "}
                  <button type="submit" className={styles.shopBtn} onClick={handleSubmitAdd}>
                    Add item
                  </button>
                  <button type="submit" className={styles.shopBtn} onClick={handleSubmitRemove}>
                    Remove
                  </button>
                </div>{" "}
              </form>{" "}
            </div>{" "}
            <div className="d-flex justify-content-between mt-4">
              <p className={styles.amount}>You have {product.qty} of this in your cart</p>
              <form onSubmit={handleSubmitClear}>
                <button type="submit" className={styles.delete}>
                  <i className={`${styles.trash} bi bi-trash`}></i>{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default CartItem;