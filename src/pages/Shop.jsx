import React, { useEffect } from "react";
import ProductCard from "../components/cards/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/cards/SearchCard";
import CartCard from "../components/cards/CartCard";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct(10);
  }, []);

  return (
    <div className="flex">
      {/* SearchBar */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen">
        <SearchCard />
      </div>

      {/* Product */}
      <div className="w-1/2 p-4 h-screen overflow-y-auto">
        <p className="text-2xl font-bold mb-4 ">All Product</p>
        <div className="flex flex-wrap gap-4">
          {/* ProductCard */}
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}

          {/* ProductCard */}
        </div>
      </div>

      {/* Cart */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto">
        <CartCard />
      </div>
    </div>
  );
};

export default Shop;
