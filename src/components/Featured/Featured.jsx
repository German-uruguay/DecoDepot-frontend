import axios from "axios";
import { useState, useEffect } from "react";
import Slider from "../Slider/Slider";

function Featured() {
  const [featured, setFeatured] = useState([]);

  const axiosConfig = {
    url: `${process.env.REACT_APP_API_PORT}/products?featured=true`,
    method: "GET",
  };

  const getFeatured = async () => {
    const response = await axios(axiosConfig);
    setFeatured(response.data);
  };

  useEffect(() => {
    getFeatured();
  }, []);

  return <Slider products={featured} title={"Featured"} />;
}

export default Featured;
