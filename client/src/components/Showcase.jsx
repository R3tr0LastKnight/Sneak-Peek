import React, { useState } from "react";
import s1 from "../assets/carousel/s1.jpg";
import s2 from "../assets/carousel/s2.jpg";
import s3 from "../assets/carousel/s3.jpg";

const Showcase = () => {
  const [show1, setShow1] = useState(false);
  const [imgg, setImgg] = useState([s1, s2, s3]);

  const handleImageClick = (img) => {
    const newImgg = [img, ...imgg.filter((item) => item !== img)];
    setImgg(newImgg);
  };

  return (
    <div className="mx-8 lg:mx-16 mb-8 lg:my-8 rounded-xl overflow-hidden flex">
      <div className="w-[67.5%] relative text-white transition-all">
        <>
          <div
            onMouseOver={() => setShow1(true)}
            className={`absolute z-20 top-[55%] lg:top-1/2 left-2 lg:left-8 transition-all ${
              show1 ? "" : "opacity-0"
            }`}
          >
            <h1 className=" font-bold opacity-100 text-sm lg:text-2xl">
              Air Strike{" "}
            </h1>
            <p className="w-1/2 hidden lg:flex">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
              earum error ex necessitatibus expedita facere animi magni deserunt
              quisquam corrupti. Libero expedita totam officia ipsam deserunt
              veritatis adipisci deleniti iste!
            </p>
            <button className="border lg:my-6 border-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-1 px-3 rounded hover:bg-white hover:text-black transition-all text-sm lg:text-lg">
              Buy now
            </button>
          </div>
        </>

        <img
          onMouseOver={() => setShow1(true)}
          onMouseOut={() => setShow1(false)}
          src={imgg[0]}
          className="h-full"
          alt=""
        />
      </div>
      <div className="w-[34%]">
        {imgg.slice(1).map((img, index) => (
          <div
            className="cursor-pointer"
            key={index}
            onClick={() => handleImageClick(img)}
          >
            <img src={img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showcase;
