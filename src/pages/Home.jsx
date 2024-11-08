import React from "react";
import ContentCarousel from "../components/home/ContentCarousel";
import BestSellingProducts from "../components/home/BestSellingProducts";
import NewProduct from "../components/home/NewProduct";

const Home = () => {
  return (
    <div>
      <ContentCarousel />
      <p className="text-2xl text-center my-4">Best selling products</p>
      <BestSellingProducts />
      <p className="text-2xl text-center my-4">New products</p>
      <NewProduct/>
    </div>
  );
};

export default Home;
