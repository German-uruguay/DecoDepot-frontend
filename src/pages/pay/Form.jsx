import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./Form.module.css";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaCcMastercard, FaCcVisa, FaCcAmex, FaCcPaypal, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";

function CheckoutForm() {
  const state = useSelector((state) => state);
  const [cardNumber, setCardNumber] = useState("4321 5678 9012 1234");
  const [fullName, setFullName] = useState(state.user.firstname + " " + state.user.lastname);
  const [expirationDate, setExpirationDate] = useState("12/28");
  const [securityCode, setSecurityCode] = useState("354");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [backendMessage, setBackendMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !cardNumber || !expirationDate || !securityCode) {
      setError(true);
      return false;
    }
    const postOrder = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/orders`,
        method: "POST",
        headers: {
          Authorization: "Bearer " + state.user.token,
        },
        data: {
          products: state.cart.items,
          status: "Paid",
          address: state.shippingAddress,
          total: state.cart.total,
        },
      });
      if (response.data.msg) {
        setBackendMessage(response.data.msg);
      } else {
        console.log(response.data._id);
        navigate(`/purchase-completed/${response.data._id}`);
        dispatch(clearCart());
      }
    };
    postOrder();
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={`${styles.shippingAddress} mb-4 mx-auto`}>Shipping</h2>
      <form className={styles.form2}>
        <div className={`d-flex form-group`}>
          <button disabled className={`${styles.button} btn`}>
            <BsCheckCircleFill className={`${styles.check}`} />
          </button>
          <h4 className={`${styles.item2} ${styles.freeShipping}`}>Free Shipping</h4>
        </div>
      </form>

      <p className={styles.line}></p>
      <div className={styles.formWrapper}>
        <h2 className={`${styles.shippingAddress} mb-4`}>Billing & payment</h2>
        <form className={styles.form3}>
          <div className={`d-flex justify-content-between form-group`}>
            <div className="d-flex">
              <button disabled className={`${styles.button2} btn`}>
                <BsCheckCircleFill className={`${styles.check}`} />
              </button>
              <h4 className={`${styles.item3} ${styles.freeShipping}`}>Credit Card</h4>
            </div>
            <div className="mx-1">
              <FaCcMastercard className={styles.cardsIcons} />

              <FaCcVisa className={styles.cardsIcons} />

              <FaCcAmex className={styles.cardsIcons} />

              <FaCcPaypal className={styles.cardsIcons} />
            </div>
          </div>
        </form>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={`d-flex mb-4`}>
            <label className={styles.label} htmlFor="nameOnCard">
              Name
            </label>
            <input
              type="text"
              className={`${styles.item} form-control`}
              placeholder="Name on card"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          {error && !fullName && <span className={styles.message}>Required field</span>}

          <div className={`d-flex mb-4 position-relative`}>
            <label className={styles.label} htmlFor="cardNumber">
              Card Number
            </label>
            <input
              type="text"
              className={`${styles.item} form-control`}
              id="cardNumber"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              autoComplete="cc-number"
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <FaLock className={styles.faLock} />
          </div>
          {error && !cardNumber && <span className={styles.message}>Required field</span>}

          <div className={`d-flex mb-4`}>
            <label className={styles.label} htmlFor="expiration">
              Expiration
            </label>
            <input
              type="text"
              className={`${styles.item} form-control`}
              placeholder="MM / AA"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />
          </div>
          {error && !expirationDate && <span className={styles.message}>Required field</span>}
          <div className={`d-flex mb-4`}>
            <label className={styles.label} htmlFor="cvv">
              CVV
            </label>
            <input
              type="number"
              className={`${styles.item} form-control`}
              placeholder="CVV"
              value={securityCode}
              onChange={(e) => setSecurityCode(e.target.value)}
            />
          </div>
          {error && !securityCode && <span className={styles.message}>Required field</span>}

          <p className={styles.message}>{backendMessage}</p>
          <div className={`${styles.links} `}>
            <button type="submit" className={`${styles.placeMyOrder} btn btn-block`}>
              Place my order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
