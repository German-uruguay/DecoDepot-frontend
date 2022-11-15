import React from "react";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Hero from "../../components/hero/Hero";
import Navbar from "../../components/navbar/Navbar";
import Reviews from "../../components/reviews/Reviews";
import Pack1 from "../../components/pack/Pack1";
import Pack2 from "../../components/pack/Pack2";
import Store from "../../components/store/Store";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Featured />
      <Store />
      <Pack1 />
      <Pack2 />
      <Reviews />
      <Footer />
    </>
  );
}

export default Home;
