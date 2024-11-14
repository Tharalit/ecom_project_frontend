import { useEffect, useState } from "react";
import { listProductBy } from "../../APIs/product";
import ProductCard from "../cards/ProductCard";
import SwiperShowProduct from "../../utils/SwiperShowProduct";
import { SwiperSlide } from "swiper/react";

function NewProduct() {
  const [data, setData] = useState([]);

  useEffect(() => {
    listNewProduct();
  }, []);

  const listNewProduct = async () => {
    try {
      const res = await listProductBy("updatedAt", "desc", 8);
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

export default NewProduct;
