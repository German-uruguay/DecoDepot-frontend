import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";
import Combo from "./components/combo/Combo";

function App() {
  return (
    <div className={styles.body}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/combo" element={<Combo />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
