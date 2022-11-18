import styles from "./MyAccount.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

function MyAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="row">
      <div className="col-4">
        <div className={`${styles.container} row`}>
          <div className="col-5"></div>
          <div className="col-5">
            <Link className={styles.link} to="/myaccount_details">
              Account Details
            </Link>
            <div className={styles.line}></div>
            <Link className={styles.link} to="/myaccount_edit">
              Edit account
            </Link>
            <div className={styles.line}></div>
            <Link className={styles.link} to="/myaccount_subscriptions">
              Subscriptions
            </Link>
            <div className={styles.line}></div>
            <Link className={styles.link} to="/myaccount_orderhistory">
              Order History
            </Link>
            <div className={styles.line}></div>
            <Link className={styles.link} onClick={() => handleLogout()}>
              Log Out
            </Link>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
      <div className="col-8"></div>
    </div>
  );
}

export default MyAccount;
