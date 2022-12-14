import styles from "./Cart.module.css";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import axios from "axios";
import SuggestionItem from "./SuggestionItem";

function Cart() {
  const cart = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios({
        url: `${process.env.REACT_APP_API_URL}/products`,
        method: "GET",
      });

      setProducts(response.data);
    };

    getProducts();
  }, []);

  if (cart && cart.length === 0) {
    return (
      <div>
        <div className="d-flex flex-column ">
          {" "}
          <h5 className={`${styles.subtitle} text-center`}>
            Your cart is empty, give it some love!
          </h5>
        </div>
        {products &&
          products.map((product, index) => {
            return <SuggestionItem key={index} product={product} />;
          })}
      </div>
    );
  } else {
    return (
      cart && (
        <div>
          {cart && cart.map((product, index) => <CartItem key={index} product={product} />)}
        </div>
      )
    );
  }
}

export default Cart;
