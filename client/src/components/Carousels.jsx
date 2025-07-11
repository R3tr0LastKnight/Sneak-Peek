import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import shoe1 from "../assets/carousel/crystal-jo-F45w1xY42BY-unsplash.jpg";
import shoe2 from "../assets/carousel/nelson-ndongala-kKObh7tUPNc-unsplash.jpg";
import shoe3 from "../assets/carousel/taylor-smith-aDZ5YIuedQg-unsplash (1).jpg";
import shoe4 from "../assets/carousel/joel-muniz-oCOykXMRteM-unsplash.jpg";
import shoe5 from "../assets/carousel/paul-volkmer-updW-QUccFE-unsplash.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Carousel } from "react-responsive-carousel";
import ProductModal from "./ProductModal";

const Carousels = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/product/showCaseProduct`
        );
        const data = await response.json();

        setImages(data);
      } catch (err) {
        console.error("Error fetching random products:", err);
      }
    };

    fetchRandomProducts();
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      if (showModal) {
        swiperRef.current.autoplay?.stop();
      } else {
        swiperRef.current.autoplay?.start();
      }
    }
  }, [showModal]);

  return (
    <>
      <div className="flex items-center  lg:h-[100vh] overflow-hidden  ">
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Autoplay, Pagination]}
          parallax={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {images
            .filter((img) => img.photos && img.photos.length > 0)
            .map((img, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-[200px] md:h-screen overflow-hidden">
                  <img
                    src={img.photos[0]}
                    alt={`${img.brand} ${img.companymodel}`}
                    className="w-full h-full object-cover object-top lg:object-center cursor-pointer"
                    onClick={() => {
                      setSelectedProductId(img._id);
                      setShowModal(true);
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        {showModal && (
          <ProductModal
            showModal={showModal}
            setShowModal={setShowModal}
            productId={selectedProductId}
          />
        )}
      </div>
    </>
  );
};

export default Carousels;
