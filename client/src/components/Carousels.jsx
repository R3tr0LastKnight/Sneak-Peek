import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import shoe1 from "../assets/carousel/crystal-jo-F45w1xY42BY-unsplash.jpg";
import shoe2 from "../assets/carousel/nelson-ndongala-kKObh7tUPNc-unsplash.jpg";
import shoe3 from "../assets/carousel/taylor-smith-aDZ5YIuedQg-unsplash (1).jpg";
import shoe4 from "../assets/carousel/joel-muniz-oCOykXMRteM-unsplash.jpg";
import shoe5 from "../assets/carousel/paul-volkmer-updW-QUccFE-unsplash.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const Carousels = () => {
  return (
    <div className="flex items-center  lg:h-[80vh] overflow-hidden ">
      <Swiper
        // spaceBetween={50}
        slidesPerView={1}
        // navigation={true}
        modules={[Navigation, Autoplay, Pagination]}
        parallax={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>
          <img src={shoe3} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={shoe1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={shoe4} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={shoe2} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={shoe5} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousels;
