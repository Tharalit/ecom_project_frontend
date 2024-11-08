import React, { useEffect, useState } from "react";
import { listProductBy } from "../../APIs/product";
import ProductCard from "../cards/ProductCard";
import SwiperShowProduct from "../../utils/swiperShowProduct";
import { SwiperSlide } from "swiper/react";

function BestSellingProducts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getListProduct();
  }, []);

  const getListProduct = async () => {
    try {
      const res = await listProductBy("sold", "desc", 12);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SwiperShowProduct>
      {data?.map((item, index) => (
        <SwiperSlide>
          <ProductCard item={item} key={index} />
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
}

export default BestSellingProducts;
