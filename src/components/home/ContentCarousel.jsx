import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Virtual, Navigation } from "swiper/modules";
import axios from "axios";

function ContentCarousel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetImage();
  }, []);

  const handleGetImage = async () => {
    try {
      const res = await axios.get(`https://picsum.photos/v2/list?page=1&limit=15`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-4">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-80 object-cover rounded-md"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.download_url} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper object-cover"
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.download_url} className="rounded-md" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ContentCarousel;
